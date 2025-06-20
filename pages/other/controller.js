var myalert = new Myalert();
$(document).ready(function () { myalert.initialize() });

angular.module('recordApp', []).controller('recordController', function ($scope, $http, $location) {
  $scope.init = () => {
    const params = new URLSearchParams(window.location.search);
    $scope.record_id = params.get('id');
    $scope.userRole = params.get('userRole');

    console.log($scope.userRole);

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
      $scope.recordList = JSON.parse(record.records);

    })
  }

  $scope.recordList = [];
  $scope.addRecord = () => {
    if ($scope.addRecordTitleModel) {
      const pushTo = {
        title: $scope.addRecordTitleModel,
        list: []
      }
      const cleanRecord = angular.copy(pushTo);
      $scope.recordList.push(cleanRecord);

      const cleanedList = JSON.parse(angular.toJson($scope.recordList));
      $scope.updateRecords(cleanedList);
    }
  }
  $scope.passValueUpdateRecord = (record, index) => {
    $scope.recordIndex = index;
    $scope.updateRecordTitleModel = record.title;
  }
  $scope.updateRecord = () => {
    $scope.recordList[$scope.recordIndex].title = $scope.updateRecordTitleModel;
    $scope.updateRecords($scope.recordList);
  }
  $scope.removeRecord = (index) => {
    myalert.confirm('Info!', 'Continue to remove this record?', 'Yes', 'No')
      .then(async function (response) {
        if (response) {
          $scope.recordList.splice(index, 1);
          $scope.updateRecords($scope.recordList);
        }
      })
  }

  $scope.passValueAddRecordList = (record, index) => {
    $scope.recordListIndex = index;
  }
  $scope.addRecordList = () => {
    if ($scope.addRecordLabelModel && $scope.addRecordValueModel) {
      const pushTo = {
        label: $scope.addRecordLabelModel,
        data: $scope.addRecordValueModel,
      }
      const cleanRecordList = angular.copy(pushTo);
      $scope.recordList[$scope.recordListIndex].list.push(cleanRecordList);

      const cleanedRecordList = JSON.parse(angular.toJson($scope.recordList));
      $scope.updateRecords(cleanedRecordList);
    }
  }
  $scope.passValueUpdateRecordList = (record, recordIndex, list, listIndex) => {
    $scope.recordIndex = recordIndex;
    $scope.recordListIndex = listIndex;
    $scope.updateRecordLabelModel = list.label;
    $scope.updateRecordValueModel = list.data;
  }
  $scope.updateRecordList = () => {
    $scope.recordList[$scope.recordIndex].list[$scope.recordListIndex].label = $scope.updateRecordLabelModel;
    $scope.recordList[$scope.recordIndex].list[$scope.recordListIndex].data = $scope.updateRecordValueModel;
    $scope.updateRecords($scope.recordList);
  }
  $scope.removeRecordList = (recordIndex, listIndex) => {
    myalert.confirm('Info!', 'Continue to remove this list from record?', 'Yes', 'No')
      .then(async function (response) {
        if (response) {
          $scope.recordList[recordIndex].list.splice(listIndex, 1);
          $scope.updateRecords($scope.recordList);
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
        $('#updateRecordModal').modal('hide');
        $('#addRecordListModal').modal('hide');
        $('#updateRecordListModal').modal('hide');
        $scope.getPatientRecords();
        myalert.success("SUCCESS!", "Record updated.")
      }
    })
  }
});