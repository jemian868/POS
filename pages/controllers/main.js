app.controller("main", function ($scope, $http, $location) {
  $scope.routes = [
    { label: "Dashboard", icon: "fa fa-chart-simple", path: "#dashboard" },
    { label: "Sales", icon: "fa fa-cart-plus", path: "#sales" },
    { label: "Products", icon: "fa fa-pills", path: "#products" },
    { label: "Reports", icon: "fa fa-folder", path: "#reports" },
    { label: "Accounts", icon: "fa fa-user-secret", path: "#accounts" },
    { label: "Profiles", icon: "fa fa-user-injured", path: "#profiles" },
  ];

  $scope.$on("$routeChangeSuccess", () => {
    let list = document.querySelectorAll(".navigation-container ul li a");
    list.forEach((item) => {
      item.classList.remove("navigation-active");
    });

    switch ($location.path()) {
      case "/dashboard":
        list[0].classList.add("navigation-active");
        break;
      case "/sales":
        list[1].classList.add("navigation-active");
        break;
      case "/products":
        list[2].classList.add("navigation-active");
        break;
      case "/reports":
        list[3].classList.add("navigation-active");
        break;
      case "/accounts":
        list[4].classList.add("navigation-active");
        break;
      case "/profiles":
        list[5].classList.add("navigation-active");
        break;
    }
  });

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
      console.log('fetch data');
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
});
