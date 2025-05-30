app.controller("dashboard", function ($scope) {
  $scope.chart_data = [
    {
      id: "salesChart",
      type: "bar",
      label: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      data: [
        150,
        34,
        65,
        150,
        34,
        65,
        150,
        34,
        65,
        150,
        34,
        65,
      ],
      background: "rgb(73, 163, 241)",
    }
  ];

  $scope.stocks_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Stock", type: "text", field: "stock" },
    { label: "Quantity", type: "text", field: "quantity" },
  ];
  $scope.stocks_data = [
    { stock: "Paracetamol", quantity: 43 },
    { stock: "Bioflu", quantity: 13 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
    { stock: "tuseran", quantity: 22 },
    { stock: "amoxicelin", quantity: 35 },
    { stock: "luperamide", quantity: 38 },
  ];

  $scope.handleInputChange = function (value) {
    console.log('Debounced input:', value);
  };

});
