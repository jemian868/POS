app.controller("main", function ($scope, $location) {
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
});
