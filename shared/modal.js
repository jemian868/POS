app.directive("customModal", function ($parse) {
  return {
    restrict: "E",
    scope: {
      modalId: "@",
      modalTitle: "=",
      modalSize: "@",
      inputFields: "=?",
      inputAction: "=?",
      tableData: "=?",
    },
    template: `
      <div class="modal fade" id="{{modalId}}" tabindex="-1" role="dialog">
        <div class="modal-dialog" ng-class="modalSize" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{modalTitle}}</h5>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <!-- INPUTS and ACTION -->
              <div ng-if="inputFields">
                <div class="form-group" ng-repeat="field in inputFields.fields">
                  <input type="{{field.type}}" placeholder="{{field.placeholder}}" class="form-control"
                         ng-model="field._value" />
                </div>
              </div>

              <!-- INPUT with ACTION -->
              <div ng-if="inputAction" class="input-action-container">
                <input type="text"  ng-model="inputAction.model" placeholder="{{inputAction.placeholder}}">
                <button ng-click="inputAction.action(inputAction.model); inputAction.model=''" class="btn btn-success btn-sm"><i class="{{inputAction.icon || 'fa fa-plus'}}"></i></button>
              </div>

              <!-- TABLE -->
              <div ng-if="tableData" class="table-container">
                <input type="text" ng-model="modalTableSearch" placeholder="Search...">
                <custom-table
                  search="modalTableSearch"
                  column="tableData.column"
                  data="tableData.data"
                  actions="tableData.action">
                </custom-table>
              </div>
            </div>
            <div ng-if="inputFields" class="modal-footer">
              <button ng-click="submitInputFields()" class="btn btn-success btn-sm">Submit</button>
            </div>
          </div>
        </div>
      </div>
    `,
    link: function (scope, element, attrs) {
      // Dynamically bind _value to actual model on parent scope
      if (scope.inputFields?.fields?.length) {
        scope.inputFields.fields.forEach(field => {
          const getter = $parse(field.model);
          const setter = getter.assign;
          // Initialize _value from parent
          field._value = getter(scope.$parent);
          // Watch for changes and push them to the actual parent model
          scope.$watch(() => field._value, (newVal) => {
            setter(scope.$parent, newVal);
          });
        });
      }

      scope.submitInputFields = function () {
        if (scope.inputFields?.action) {
          const result = scope.inputFields.fields.map(field => ({
            model: field.model,
            value: field._value !== "" ? field._value : undefined
          }));
          scope.inputFields.action(result);
        }
      };
    }
  };
});
