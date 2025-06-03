var myalert = new Myalert();
$(document).ready(function () { myalert.initialize() });

angular.module('loginApp', []).controller('loginController', function ($scope, $http, $location, $timeout) {
  $scope.init = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      $scope.remember = true;
      $scope.username = username;
      $scope.password = password;
    }
  }

  $scope.rememberToggle = () => {
    if ($scope.remember) {
      localStorage.clear();
      myalert.success('SUCCESS!', 'Saved Credentials removed.');
    }
    $scope.remember = $scope.remember ? false : true;
  }

  $scope.checkEnter = function (event) {
    if (event.which === 13) { // 13 is the Enter key
      $scope.login();
    }
  };
  $scope.login = () => {
    if ($scope.username && $scope.password) {
      $http.post('login.php', {
        username: $scope.username,
        password: $scope.password,
      }).then(function (response) {
        const [result] = response.data;
        if (result.status === 'success') {
          sessionStorage.setItem('accountId', result.id);
          sessionStorage.setItem('accountName', result.firstname + ' ' + result.lastname);
          sessionStorage.setItem('accountDesignation', result.designation);
          if ($scope.remember) {
            localStorage.setItem('username', result.username);
            localStorage.setItem('password', result.password);
          }
          $timeout(function () {
            location.href = 'pages/routes';
          }, 500);
        } else if (result.status === 'deactivated') {
          myalert.warning('WARNING!', 'Your account has been deactivated by the administrator');
        } else {
          myalert.error('ERROR!', 'Invalid Username or Password');
        }
      })
    }
  }
});
