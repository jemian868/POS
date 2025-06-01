app.directive("customModal", function () {
  return {
    restrict: "E",
    scope: {
      modalId: "@",
      modalTitle: "=",
      modalSize: "@",
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
              <!-- Render Form Fields -->
              <div ng-if="fields && fields.length">
                <div ng-repeat="field in fields" class="form-group">
                  <label>{{field.label}}</label>
                  <input
                    ng-if="field.type === 'text'"
                    type="text"
                    class="form-control"
                    ng-model="model[field.model]"
                    ng-disabled="field.disabled"
                  />
                  <select
                    ng-if="field.type === 'select'"
                    class="form-control"
                    ng-model="model[field.model]"
                    ng-disabled="field.disabled">
                    <option ng-repeat="opt in field.options" value="{{opt}}">{{opt}}</option>
                  </select>
                </div>
              </div>

              <!-- INPUT with ACTION -->
              <div ng-if="inputAction" class="input-action-container">
                <input type="text" ng-model="modalInputAction" placeholder="{{inputAction.placeholder}}">
                <button ng-click="inputAction.action(modalInputAction); modalInputAction=''" class="btn btn-success btn-sm"><i class="fa fa-plus"></i></button>
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
          
          </div>
        </div>
      </div>
    `,
    link: function (scope) {
      if (scope.tableVisible === undefined) scope.tableVisible = false;
      scope.submit = function () {
        if (scope.onSubmit) {
          scope.onSubmit({ data: scope.model });
        }
        $("#" + scope.modalId).modal("hide");
      };
    }
  };
});
