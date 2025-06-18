app.controller("main", function ($scope, $http, $location, $timeout) {
  // Trap auto logout if no account logged in
  $scope.checkAccount = () => {
    $scope.account_id = sessionStorage.getItem('accountId');
    $scope.account_name = sessionStorage.getItem('accountName');
    $scope.account_designated = sessionStorage.getItem('accountDesignation');
    if (!$scope.account_id) {
      location.href = '../../';
    }

    // Set up routes
    $scope.routes = [
      { label: "Dashboard", icon: "fa fa-chart-simple", path: "#dashboard" },
      { label: "Sales", icon: "fa fa-cart-plus", path: "#sales" },
      { label: "Products", icon: "fa fa-pills", path: "#products" },
      { label: "Profiles", icon: "fa fa-user-injured", path: "#profiles" },
      { label: "Accounts", icon: "fa fa-people-group", path: "#accounts" },
      { label: "Reports", icon: "fa fa-folder", path: "#reports" },
    ];

    // For Pharmacist account
    if ($scope.account_designated === 'Nurse') {
      $scope.routes = $scope.routes.filter(route => route.label === 'Dashboard' || route.label === 'Sales' || route.label === 'Reports');
    }

    // For Pharmacist account
    if ($scope.account_designated === 'Pharmacist') {
      $scope.routes = $scope.routes.filter(route => route.label !== 'Profiles' && route.label !== 'Accounts');
    }
    // For Registrar account
    if ($scope.account_designated === 'Registrar') {
      $scope.routes = $scope.routes.filter(route =>
        route.label === 'Dashboard' || route.label === 'Profiles' || route.label === 'Reports'
      );
    }
  }

  $scope.$on("$routeChangeSuccess", () => {
    const links = document.querySelectorAll(".navigation-container ul li a");
    const currentPath = `#${$location.path().replace(/^\//, "")}`; // e.g., "#dashboard"

    links.forEach((link) => {
      // Remove active class from all
      link.classList.remove("navigation-active");

      // Add active class to the one that matches the path
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("navigation-active");
      }
    });
  });


  // Logout
  $scope.logOut = () => {
    myalert.confirm('Info!', 'Are you sure you want to logout?', 'Yes', 'No')
      .then(async function (response) {
        if (response) {
          sessionStorage.clear();
          myalert.success("SUCCESS!", "Account logged out.");
          $timeout(function () {
            location.href = '../../';
          }, 1000);
        }
      })
  }

  // Form Validator
  $scope.validateForm = (fields) => {
    for (let field of fields) {
      const { label = 'Field', model, rule = 'text' } = field;

      if (rule === 'required') {
        if (!model || model.toString().trim() === '') {
          return `${label} is required.`;
        }
      }

      if (rule === 'number') {
        const parsed = parseFloat(model);
        if (isNaN(parsed)) {
          return `${label} must be a valid number.`;
        }
      }
    }

    return null; // null = no error
  }

  // Get
  $scope.get = ({
    path,
    data,
  }) => {
    if (data) { // fetch data base on the condition
      return $http.post(path, data).then(function (data) {
        return data.data;
      })
    } else { // fetch all data
      return $http({
        method: 'get',
        url: path,
      }).then(function (data) {
        return data.data;
      });
    }
  }

  // Create
  $scope.create = ({
    path,
    data,
  }) => {
    return $http.post(path, data).then(function (response) {
      return response.data;
    })
  }

  // Update
  $scope.update = ({
    path,
    data,
  }) => {
    return $http.put(path, data).then(function (response) {
      return response.data;
    })
  }


  // Update
  $scope.delete = ({
    path,
    data,
  }) => {
    return $http({
      method: 'DELETE',
      url: path,
      params: data
    }).then(function (response) {
      return response.data;
    });
  }

  // Update Credentials
  $scope.updateCredentials = async () => {
    if ($scope.cusername && $scope.cpassword && ($scope.nusername || $scope.npassword)) {
      console.log($scope.account_id);
      console.log($scope.cusername);
      console.log($scope.cpassword);
      console.log($scope.nusername);
      console.log($scope.npassword);

      const payload = {
        path: '../services/account/updateCredentials.php',
        data: {
          id: $scope.account_id,
          cusername: $scope.cusername,
          cpassword: $scope.cpassword,
          nusername: $scope.nusername,
          npassword: $scope.npassword,
        }
      }

      const response = await $scope.update(payload);
      if (response !== 'invalid') {
        myalert.success("SUCCESS!", response);
      } else {
        myalert.info("INFO!", "Current Username or Password is Invalid");
      }
    }
  }

  // Export to Excel
  $scope.exportToExcel = function (header, data, footer, filename) {
    // Validate all rows in data
    const invalidRow = data.find(row => row.length !== header.length);
    if (invalidRow) {
      return myalert.info('INFO!', 'One or more data rows do not match the header length.');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Add header row
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell(cell => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle' };
    });

    // Add data rows
    data.forEach(row => {
      const dataRow = worksheet.addRow(row);
      dataRow.eachCell(cell => {
        cell.alignment = { vertical: 'middle' };
      });
    });

    // Add footer row ONLY if it's defined and is an array
    if (Array.isArray(footer)) {
      const footerRow = worksheet.addRow(footer);
      footerRow.eachCell(cell => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle' };
      });
    }

    // Combine header + data + (footer if available) to compute column widths
    const allRows = [header, ...data];
    if (Array.isArray(footer)) {
      allRows.push(footer);
    }

    const columnWidths = header.map((_, colIdx) => {
      let maxLength = 0;
      allRows.forEach(row => {
        const cellValue = row[colIdx] ? row[colIdx].toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      return maxLength * 1.2;
    });

    worksheet.columns.forEach((col, idx) => {
      col.width = columnWidths[idx];
    });

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, filename + '.xlsx');
    }).catch(err => {
      console.error('Error writing excel export:', err);
    });
  };
});
