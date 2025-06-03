app.controller("dashboard", function ($scope) {
  $scope.init = () => {
    const date = new Date();
    $scope.currentDate = date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear();
    $scope.getLowStockProduct();
  }

  $scope.stocks_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Product", type: "text", field: "name" },
    { label: "Quantity", type: "text", field: "quantity_stock" },
    { label: "Reorder Limit", type: "text", field: "quantity_limit" },
  ];
  $scope.getLowStockProduct = async () => {
    const payload = {
      path: '../services/product/get_low_stock.php',
    }

    $scope.stocks_data = await $scope.get(payload);
    $scope.$applyAsync();
  }

  $scope.chart_data = [
    {
      id: "salesChart",
      type: "bar",
      label: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",],
      data: [150, 34, 65, 150, 34, 65, 150, 34, 65, 150, 34, 65,],
      background: "rgb(73, 163, 241)",
    }
  ];


  $scope.handleInputChange = function (value) {
    console.log('Debounced input:', value);
  };

});
