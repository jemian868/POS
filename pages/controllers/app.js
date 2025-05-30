var app = angular
  .module("app", ["ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(""); // Removes default '!' in URLs

    $routeProvider
      .when("/dashboard", {
        templateUrl: "dashboard.php",
        controller: "dashboard",
      })
      .when("/sales", {
        templateUrl: "sales.php",
        controller: "sales",
      })
      .when("/products", {
        templateUrl: "products.php",
        controller: "products",
      })
      .when("/reports", {
        templateUrl: "reports.php",
        controller: "reports",
      })
      .when("/accounts", {
        templateUrl: "accounts.php",
        controller: "accounts",
      })
      .when("/profiles", {
        templateUrl: "profiles.php",
        controller: "profiles",
      })
      .otherwise({
        redirectTo: "/dashboard",
      });
  });
