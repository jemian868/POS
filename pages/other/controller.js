var myalert = new Myalert();
$(document).ready(function () { myalert.initialize() });

angular.module('recordApp', []).controller('recordController', function ($scope, $http, $location) {
  $scope.init = () => {
    const params = new URLSearchParams(window.location.search);
    $scope.record_id = params.get('id');
    $scope.getPatientRecords();
  }

  $scope.getPatientRecords = () => {
    $http.post("getPatientRecords.php", {
      id: $scope.record_id
    }).then(function (data) {
      const [record] = data.data;
      console.log(record);
      $scope.patientImage = record.image ?? 'default.png';
      console.log($scope.patientImage);

      $scope.patientFullname = record.fullname;
      $scope.patientGender = record.gender;
      $scope.patientCivilStatus = record.civil_status;
      $scope.patientBirthDate = record.birth_date;
      $scope.patientNationality = record.nationality;
      $scope.patientContact = record.contact;
      $scope.patientAddress = record.address;
      $scope.patientAdmitted = record.date_admitted;
      $scope.patientDischarged = record.date_discharged;
      $scope.recordsList = JSON.parse(record.records);

      console.log($scope.recordsList);

    })
  }

  $scope.addRecord = () => {
    if ($scope.recordLabel && $scope.recordValue) {
      const pushTo = {
        label: $scope.recordLabel.charAt(0).toUpperCase() + $scope.recordLabel.substr(1).toLowerCase(),
        value: $scope.recordValue.charAt(0).toUpperCase() + $scope.recordValue.substr(1).toLowerCase()
      }

      $scope.recordsList.push(pushTo);
      $scope.updateRecords($scope.recordsList);
    }
  }

  $scope.removeRecord = (index) => {
    myalert.confirm('Info!', 'Continue to remove this record?', 'Yes', 'No')
      .then(async function (response) {
        if (response) {
          $scope.recordsList.splice(index, 1);
          $scope.updateRecords($scope.recordsList);
        }
      })
  }

  $scope.updateRecords = (data) => {
    $http.put("updateRecords.php", {
      id: $scope.record_id,
      record: JSON.stringify(data)
    }).then(function (response) {
      if (response.data === 'success') {
        $('#addRecordModal').modal('hide');
        $scope.getPatientRecords();
        myalert.success("SUCCESS!", "Record updated.")
      }
    })
  }
});