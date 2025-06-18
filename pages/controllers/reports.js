app.controller("reports", function ($scope, $filter) {
  $scope.fillEmpty = true;
  $scope.report_type = 'sales';
  $scope.getReport = () => {
    if (!$scope.from || !$scope.to) {
      myalert.warning('WARNING!', 'Please select from date to date.');
    } else if ($scope.from > $scope.to) {
      myalert.info('INFO!', 'Please ensure the start date is equal or earlier than the end date.');
    } else {
      $scope.table_footer = undefined;
      switch ($scope.report_type) {
        case 'sales':
          $scope.getSalesReports();
          break;
        case 'stocks':
          $scope.getStockReports();
          break;
        case 'profiles':
          $scope.getProfileReports();
          break;
        default:
        // handle unknown
      }
    }
  }

  // Sales report
  $scope.getSalesReports = async () => {
    $scope.table_columns = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Image", type: "image", field: "image" },
      { label: "Product", type: "text", field: "product_name" },
      { label: "Quantity", type: "text", field: "quantity" },
      { label: "Price", type: "currency", field: "product_price" },
      { label: "Total", type: "currency", field: "total_price" },
      { label: "Seller", type: "text", field: "account_name" },
      { label: "Date Sold", type: "text", field: "date_created" },
    ];

    const from = $filter('date')($scope.from, 'yyyy-MM-dd');
    const to = $filter('date')($scope.to, 'yyyy-MM-dd');

    const payload = {
      path: '../services/report/get_sales.php',
      data: {
        from: from,
        to: to,
      }
    }
    const data = await $scope.get(payload);
    console.log(data);
    $scope.table_data = data.map(item => {
      const image = item.image && `../../uploads/${item.image}`;
      const total_price = item.quantity * item.product_price;
      return {
        ...item,
        image,
        total_price
      };
    });

    const footerPayload = {
      path: '../services/report/get_payments.php',
      data: {
        from: from,
        to: to,
      }
    }
    const footerData = await $scope.get(footerPayload);
    $scope.totalAmount = 0;
    $scope.totalDiscount = 0;
    footerData.map((item) => {
      $scope.totalAmount += parseFloat(item.amount);
      $scope.totalDiscount += parseFloat(item.discount);
    });
    $scope.overAllTotal = $scope.totalAmount + $scope.totalDiscount;
    $scope.table_footer = [
      { label: 'TOTAL AMOUNT', value: $scope.totalAmount },
      { label: 'TOTAL DISCOUNT', value: $scope.totalDiscount },
      { label: 'OVERALL TOTAL', value: $scope.overAllTotal },
    ];
    $scope.$applyAsync();
  }

  $scope.reComputeTotalSales = (filteredItems) => {
    return filteredItems.reduce(function (sum, item) {
      return sum + parseFloat(item.price || 0);
    }, 0);
  }

  // Stock report
  $scope.getStockReports = async () => {
    $scope.table_columns = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Product", type: "text", field: "product_name" },
      { label: "Quantity", type: "text", field: "quantity" },
      { label: "Date Expiry", type: "text", field: "date_expired" },
      { label: "Date Added", type: "text", field: "date_created" },
      { label: "Encoder", type: "text", field: "account_name" },
    ];

    const from = $filter('date')($scope.from, 'yyyy-MM-dd');
    const to = $filter('date')($scope.to, 'yyyy-MM-dd');

    const payload = {
      path: '../services/report/get_stocks.php',
      data: {
        from: from,
        to: to,
      }
    }

    $scope.table_data = await $scope.get(payload);
    $scope.$applyAsync();
  }

  // Profile report
  $scope.getProfileReports = async () => {
    $scope.table_columns = [
      { label: "#", type: "counter", field: "counter" },
      { label: "PATIENT", type: "text", field: "fullname" },
      { label: "DATE ADMITTED", type: "text", field: "date_admitted" },
      { label: "DATE DISCHARGED", type: "text", field: "date_discharged" },
      { label: "STATUS", type: "text", field: "status" },
    ];

    const from = $filter('date')($scope.from, 'yyyy-MM-dd');
    const to = $filter('date')($scope.to, 'yyyy-MM-dd');

    const payload = {
      path: '../services/report/get_profiles.php',
      data: {
        from: from,
        to: to,
      }
    }

    const data = await $scope.get(payload);
    $scope.table_data = data.map(item => {
      const status = item.date_discharged ? 'Discharged' : 'Admitted';
      return {
        ...item,
        status
      };
    });
    console.log($scope.table_data);
    $scope.$applyAsync();
  }

  /**
   * Exportation process
   */
  $scope.exportReport = () => {
    switch ($scope.report_type) {
      case 'sales':
        const salesHeader = ['PRODUCT', 'QUANITY', 'PRICE', 'TOTAL PRICE', 'SELLER', 'DATE SOLD'];
        const salesData = [];
        $scope.table_data.map((item) => {
          const toPush = [item.product_name, item.quantity, $filter('currency')(item.product_price, '₱ ', 2), $filter('currency')(item.total_price, '₱ ', 2), item.account_name, item.date_created];
          salesData.push(toPush);
        });
        const salesFooter = ['TOTAL AMOUNT: ' + $filter('currency')($scope.totalAmount, '₱ ', 2), 'TOTAL DISCOUNT: ' + $filter('currency')($scope.totalDiscount, '₱ ', 2), 'OVERALL TOTAL: ' + $filter('currency')($scope.overAllTotal, '₱ ', 2), '', '', ''];
        $scope.exportToExcel(salesHeader, salesData, salesFooter, 'Sales report');
        break;
      case 'stocks':
        const stocksHeader = ['PRODUCT', 'QUANITY', 'DATE EXPIRY', 'DATE ADDED', 'ENCODER'];
        const stocksData = [];
        $scope.table_data.map((item) => {
          const toPush = [item.product_name, item.quantity, item.date_expired ?? 'N/A', item.date_created, item.account_name];
          stocksData.push(toPush);
        });
        $scope.exportToExcel(stocksHeader, stocksData, undefined, 'Stocks report');
        break;
      case 'profiles':
        const profilesHeader = ['PATIENT', 'DATE ADMITTED', 'DATE DISCHARGED', 'STATUS'];
        const profilesData = [];
        $scope.table_data.map((item) => {
          const toPush = [item.fullname, item.date_admitted, item.date_discharged ?? 'N/A', item.status];
          profilesData.push(toPush);
        });
        $scope.exportToExcel(profilesHeader, profilesData, undefined, 'Profiles report');
        break;
      default:
      // handle unknown
    }
  };
});