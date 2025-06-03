app.controller("profiles", function ($scope) {
  $scope.openNewTab = (data) => {
    console.log(data);
    window.open('../other/viewProfileDetails.php?id=' + data.id, '_blank');
  }

  $scope.profiles_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Name", type: "text", field: "name" },
    { label: "Birth Date", type: "text", field: "birthDate" },
    { label: "Gender", type: "text", field: "gender" },
    { label: "Address", type: "text", field: "address" },
  ];
  $scope.profiles_data = [
    { id: 21, name: 'Bryan Villarubia', birthDate: 'August 21, 1996', gender: 'Male', address: 'Molave Zambo Sur.' }
  ];
  $scope.profiles_actions = [
    { label: 'View More', icon: "fa fa-eye", action: $scope.openNewTab },
  ];
});
