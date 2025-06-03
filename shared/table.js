app
  .directive("customTable", function () {
    return {
      restrict: "E",
      scope: {
        search: "=",
        column: "=",
        data: "=",
        actions: "=",
      },
      link: function (scope, element, attrs) {
        if (!attrs.column || !attrs.data) {
          throw new Error(
            "column and data props are required for <custom-table> directive."
          );
        }
      },
      template: `
        <div class="table-body">
          <table>
            <thead>
              <tr>
                <th ng-repeat="i in column">{{i.label}}</th>
                <th ng-if="actions && actions.length">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="(index, item) in (filtered = (data | filter:search))">
                <td ng-repeat="col in column">
                  <span ng-if="col.type === 'counter'">{{ index+1 }}</span>
                  <span ng-if="col.type === 'text'">{{ item[col.field] }}</span>
                  <span ng-if="col.type === 'currency'">{{ item[col.field] | currency:'₱ ':2 }}</span>
                  <img ng-if="col.type === 'image'" ng-src="{{ item[col.field] }}" alt="image">
                </td>
                <td ng-if="actions && actions.length">
                  <button ng-repeat="action in actions" ng-if="!action.hide" ng-click="action.action(item)">
                    <i ng-if="action.icon" class="{{ action.icon }}" style="font-size:{{ action.iconSize }}"></i>
                    <span ng-if="action.label">{{ action.label }}</span>
                  </button>
                </td>
              </tr>
              <tr ng-if="filtered.length === 0">
                <td colspan="{{column.length + 1}}"><center>No record found.</center></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    };
  })
  .controller("tableController", function ($scope) {
    $scope.addBTN = (user) => {
      console.log("ADD Button:", user);
    };
    $scope.editBTN = (user) => {
      console.log("EDIT Button:", user);
    };
    $scope.deleteBTN = (user) => {
      console.log("DELETE Button:", user);
    };

    $scope.columns = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Name", type: "text", field: "name" },
      { label: "Age", type: "text", field: "age" },
      { label: "Image", type: "image", field: "path" },
    ];
    $scope.data = [
      { name: "Alice", age: 24, path: "../images/family.jpg" },
      { name: "Bob", age: 30, path: "../images/family.jpg" },
      { name: "Charlie", age: 27, path: "../images/family.jpg" },
    ];
    $scope.actions = [
      { label: "Add", icon: "fa fa-user", action: $scope.addBTN },
      { label: "Edit", icon: "fa fa-edit", action: $scope.editBTN },
      { label: "Delete", icon: "fa fa-trash", action: $scope.deleteBTN },
    ];
  });
