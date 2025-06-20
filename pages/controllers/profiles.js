app.controller("profiles", function ($scope, $http, $filter) {
  $scope.init = () => {
    $scope.getProfiles();
  }

  $scope.openNewTab = (data) => {
    console.log(data);
    console.log();

    window.open('../other/viewProfileDetails.php?id=' + data.id + '&userRole=' + $scope.account_designated, '_blank');
  }

  // DISCHARGED PATIENT
  $scope.dischargePatient = (data) => {
    if (data.date_discharged) {
      myalert.info("INFO!", "Patient already discharged.");
    } else {
      myalert.confirm('Info!', 'Continue to discharge this patient?', 'Yes', 'No')
        .then(async function (response) {
          if (response) {
            const payload = {
              path: '../services/profile_record/discharged_patient.php',
              data: {
                id: data.id,
                date_discharged: $filter('date')(new Date(), 'yyyy-MM-dd'),
              }
            }

            const response = await $scope.update(payload);
            if (response === 'success') {
              $scope.getRecords(data.profile_id);
              myalert.success("SUCCESS!", "Patient has been discharged.");
            }
          }
        })
    }
  }

  // RECORD
  $scope.createRecord = async (data) => {
    const notDischargedRecords = $scope.record_data.filter(function (record) {
      return record.date_discharged == null;
    });

    if (notDischargedRecords.length) {
      myalert.info("INFO!", "This patient is not yet discharged.");
      return;
    }

    if (data) {
      const date_admitted = $filter('date')(data, 'yyyy-MM-dd');

      const payload = {
        path: '../services/profile_record/create.php',
        data: {
          profile_id: $scope.profile_id,
          date_admitted: date_admitted,
          record: '[]',
        }
      }

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.getRecords($scope.profile_id);
        myalert.success("SUCCESS!", "Profile created.");
      }
    }
  }
  $scope.openModal = async (data) => {
    $scope.profile_id = data.id; // used to create record
    $scope.modal_header = "Add Record";
    $scope.input_action = { placeholder: 'Select Date', type: 'date', action: $scope.createRecord };
    $scope.getRecords(data.id);
    $('#modal_id').modal('show');
  }
  $scope.getRecords = async (prodile_id) => {
    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Date Admitted", type: "text", field: "date_admitted" },
      { label: "Date Discharge", type: "text", field: "date_discharged" },
    ]
    const action = [
      { icon: "fa fa-eye", iconSize: '15px', action: $scope.openNewTab },
      { icon: "fa fa-hospital-user", iconSize: '15px', action: $scope.dischargePatient },
    ];
    const payload = {
      path: '../services/profile_record/get.php',
      data: {
        id: prodile_id,
      }
    }

    $scope.record_data = await $scope.get(payload);
    $scope.table_data = { // modal table data
      column: column,
      data: $scope.record_data,
      action: action
    }
    $scope.$applyAsync();
  }

  // PROFILE
  $scope.addProfileGender = 'Male'
  $scope.addProfileCivilStatus = 'Single'
  $scope.createProfile = async () => {
    try {
      const createProfileForm = [
        { model: $scope.addProfileFullname, label: 'Full Name', rule: 'required' },
        { model: $scope.addProfileBirtDate, label: 'Birth Date', rule: 'required' },
        { model: $scope.addProfileGender, label: 'Gender', rule: 'required' },
        { model: $scope.addProfileCivilStatus, label: 'Civil Status', rule: 'required' },
        { model: $scope.addProfileNationality, label: 'Nationality', rule: 'required' },
        { model: $scope.addProfileContact, label: 'Contact' },
        { model: $scope.addProfileAddress, label: 'Address' },
      ];
      const error = $scope.validateForm(createProfileForm);
      if (error) { myalert.warning('WARNING!', error); return; }

      const payload = {
        path: '../services/profile/create.php',
        data: {
          fullname: $scope.addProfileFullname,
          birthDate: $scope.addProfileBirtDate,
          gender: $scope.addProfileGender,
          civil_status: $scope.addProfileCivilStatus,
          nationality: $scope.addProfileNationality,
          contact: $scope.addProfileContact,
          address: $scope.addProfileAddress,
        }
      }

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.clearProfileForm();
        $scope.getProfiles();
        myalert.success("SUCCESS!", "Profile created.");
      }
    } catch (error) {
      throw error;
    }
  }

  $scope.clearProfileForm = () => {
    $scope.updateProfileId = undefined;
    $scope.addProfileFullname = undefined;
    $scope.addProfileBirtDate = undefined;
    $scope.addProfileNationality = undefined;
    $scope.addProfileContact = undefined;
    $scope.addProfileAddress = undefined;
  }

  $scope.viewToUpdateProfile = (data) => {
    $scope.updateProfileId = data.id;
    $scope.addProfileFullname = data.fullname;
    $scope.addProfileBirtDate = new Date(data.birth_date);
    $scope.addProfileGender = data.gender;
    $scope.addProfileCivilStatus = data.civil_status;
    $scope.addProfileNationality = data.nationality;
    $scope.addProfileContact = data.contact;
    $scope.addProfileAddress = data.address;
  }

  $scope.updateProfile = async () => {
    const updateProfileForm = [
      { model: $scope.addProfileFullname, label: 'Full Name', rule: 'required' },
      { model: $scope.addProfileBirtDate, label: 'Birth Date', rule: 'required' },
      { model: $scope.addProfileGender, label: 'Gender', rule: 'required' },
      { model: $scope.addProfileCivilStatus, label: 'Civil Status', rule: 'required' },
      { model: $scope.addProfileNationality, label: 'Nationality', rule: 'required' },
      { model: $scope.addProfileContact, label: 'Contact' },
      { model: $scope.addProfileAddress, label: 'Address' },
    ];
    const error = $scope.validateForm(updateProfileForm);
    if (error) { myalert.warning('WARNING!', error); return; }

    const payload = {
      path: '../services/profile/update.php',
      data: {
        id: $scope.updateProfileId,
        fullname: $scope.addProfileFullname,
        birthDate: $scope.addProfileBirtDate,
        gender: $scope.addProfileGender,
        civil_status: $scope.addProfileCivilStatus,
        nationality: $scope.addProfileNationality,
        contact: $scope.addProfileContact,
        address: $scope.addProfileAddress,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.clearProfileForm();
      $scope.getProfiles();
      myalert.success("SUCCESS!", "Profile updated.");
    }
  }

  $scope.addPatientPhoto = (data) => {
    $scope.addPhoto_profileId = data.id;
    if (data.image) {
      $scope.previewImage = data.image;
    } else {
      $scope.previewImage = "../../uploads/default.png";
    }
    $('#addImageModal').modal('show');
  }

  $scope.profiles_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Image", type: "image", field: "image" },
    { label: "Name", type: "text", field: "fullname" },
    { label: "Birth Date", type: "text", field: "birth_date" },
    { label: "Gender", type: "text", field: "gender" },
    { label: "Contact", type: "text", field: "contact" },
    { label: "Address", type: "text", field: "address" },
  ];
  $scope.profiles_actions = [
    { label: 'Image', icon: "fa fa-image", action: $scope.addPatientPhoto },
    { label: 'Update', icon: "fa fa-edit", action: $scope.viewToUpdateProfile },
    { label: 'View', icon: "fa fa-eye", action: $scope.openModal },
  ];
  $scope.getProfiles = async () => {
    try {
      const payload = {
        path: '../services/profile/get.php',
      }

      $scope.profiles_data = await $scope.get(payload);
      $scope.profiles_data.map((item) => {
        item.image = item.image && `../../uploads/${item.image}`;
      })
      $scope.$applyAsync();
    } catch (error) {
      throw error
    }
  }

  $scope.previewFile = function (input) {
    const file = input.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.previewImage = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  $scope.uploadImage = function () {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file || !$scope.addPhoto_profileId) {
      alert("Please select an image and make sure profile ID is set.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("data", JSON.stringify({ id: $scope.addPhoto_profileId }));

    $http.post("../services/upload.php", formData, {
      id: $scope.addPhoto_profileId,
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined },
    }).then(function (response) {
      if (response.data.success) {
        $scope.getProfiles();
        $('#addImageModal').modal('hide');
        myalert.success('SUCCESS!', 'Image uploaded.');
      }
    }).catch(function (error) {
      myalert.warning('WARNING!', error);
    });
  };
});