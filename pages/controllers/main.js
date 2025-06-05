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
    if ($scope.account_designated === 'Pharmacist') {
      $scope.routes = $scope.routes.filter(route => route.label !== 'Profiles');
    }
    // For Registrar account
    if ($scope.account_designated === 'Registrar') {
      $scope.routes = $scope.routes.filter(route =>
        route.label === 'Dashboard' || route.label === 'Profiles'
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
});
