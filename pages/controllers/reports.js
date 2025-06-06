app.controller("reports", function ($scope) {
  console.log("Reports Controller Initialized");

  $scope.stocks_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Stock", type: "text", field: "stock" },
    { label: "Type", type: "text", field: "type" },
    { label: "Size", type: "text", field: "size" },
    { label: "Price", type: "currency", field: "price" },
    { label: "Quantity", type: "text", field: "quantity" },
  ];
  $scope.stocks_data = [
    { stock: "Paracetamol", type: 'Syrup', size: '500 ml', price: 14.7, quantity: 43 },
    { stock: "Bioflu", type: 'Syrup', size: '500 ml', price: 55.3, quantity: 13 },
    { stock: "Tuseran", type: 'Syrup', size: '500 ml', price: 125.2, quantity: 22 },
    { stock: "Advil", type: 'Syrup', size: '500 ml', price: 230.64, quantity: 22 },
  ];
});
