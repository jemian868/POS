app.controller("dashboard", function ($scope, $filter) {
  $scope.init = () => {
    const date = new Date();
    $scope.currentYear = $filter('date')(new Date(), 'yyyy');
    $scope.currentMonthYear = date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear();
    $scope.getLowStockProduct();
    $scope.getChartData();
    $scope.getLengthOfProfiles();
    $scope.getLengthOfAddmitted();
    $scope.getLengthOfDischarged();
  }

  $scope.getLengthOfProfiles = async () => {
    const payload = {
      path: '../services/profile/get_length.php',
    }

    $scope.registeredProfiles = await $scope.get(payload);
    $scope.$applyAsync();
  }

  $scope.getLengthOfAddmitted = async () => {
    const payload = {
      path: '../services/profile_record/get_admitted_length.php',
    }

    $scope.numberOfAddmitted = await $scope.get(payload);
    $scope.$applyAsync();
  }

  $scope.getLengthOfDischarged = async () => {
    const payload = {
      path: '../services/profile_record/get_discharged_length.php',
    }

    $scope.numberOfDischarged = await $scope.get(payload);
    $scope.$applyAsync();
  }

  $scope.test = (data) => {
    console.log(data);
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

  $scope.getChartData = async () => {
    const payload = {
      path: '../services/sales/get_sales_chart.php',
      data: {
        year: $scope.currentYear,
      }
    }

    let jan = 0; let feb = 0; let mar = 0; let apr = 0; let may = 0; let jun = 0;
    let jul = 0; let aug = 0; let sep = 0; let oct = 0; let nov = 0; let dec = 0;
    const payments = await $scope.get(payload);
    payments.map((item) => {
      const dateObj = new Date(item.date_created);
      const month = dateObj.getMonth() + 1; // getMonth() returns 0-11

      switch (month) {
        case 1: jan += parseFloat(item.amount); break;
        case 2: feb += parseFloat(item.amount); break;
        case 3: mar += parseFloat(item.amount); break;
        case 4: apr += parseFloat(item.amount); break;
        case 5: may += parseFloat(item.amount); break;
        case 6: jun += parseFloat(item.amount); break;
        case 7: jul += parseFloat(item.amount); break;
        case 8: aug += parseFloat(item.amount); break;
        case 9: sep += parseFloat(item.amount); break;
        case 10: oct += parseFloat(item.amount); break;
        case 11: nov += parseFloat(item.amount); break;
        case 12: dec += parseFloat(item.amount); break;
      }
    });

    // Chart part
    const data = {
      type: 'bar',
      backgroundColor: 'rgb(73, 163, 241)',

      fontColor: "#fff",
      legend: { visible: false },
      scaleX: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",],
        tick: { lineColor: "transparent" },
        lineColor: "transparent",
        guide: { visible: true },
        item: { fontColor: "#fff" },
      },
      scaleY: {
        tick: { lineColor: "transparent" },
        lineColor: "transparent",
        guide: { visible: true },
        item: { fontColor: "#fff" },
      },
      plot: {
        animation: {
          effect: "ANIMATION_EXPAND_BOTTOM",
          method: "ANIMATION_STRONG_EASE_OUT",
          sequence: "ANIMATION_BY_NODE",
          speed: 275,
        },
        tooltip: {
          text: "%v", // Shows the value of the bar
          fontColor: "#ff0", // Change this to any color you want
          backgroundColor: "#333", // Optional: style tooltip background
          borderRadius: 5,
          fontSize: 14
        }
      },
      series: [
        {
          values: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec,], // from other (controller)
          backgroundColor: "#fff",
          lineColor: "#000",
          marker: {
            backgroundColor: "#000",
          },
        },
      ],
    };
    zingchart.render({
      id: 'salesChart',
      data: data,
      height: "100%",
      width: "100%",
    });
  }
});
