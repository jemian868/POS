app.controller("accounts", function ($scope) {
  $scope.init = () => {
    $scope.getAccounts();
  }

  // UPDATE accounts
  $scope.viewToUpdateAccount = (data) => {
    $scope.updateAccountId = data.id;
    $scope.addAccountFname = data.firstname;
    $scope.addAccountLname = data.lastname;
    $scope.addAccountDesignation = data.designation;
    $scope.username = data.username;
    $scope.password = data.password;
  }

  $scope.updateAccount = async () => {
    const updateAccountForm = [
      { model: $scope.addAccountFname, label: 'First Name', rule: 'required' },
      { model: $scope.addAccountLname, label: 'Last Name', rule: 'required' },
      { model: $scope.addAccountDesignation, label: 'Designation', rule: 'required' },
      { model: $scope.username, label: 'UserName', rule: 'required' },
      { model: $scope.password, label: 'Password', rule: 'required' },
    ];

    const error = $scope.validateForm(updateAccountForm);
    if (error) { myalert.warning('WARNING!', error); return; }

    const payload = {
      path: '../services/account/update.php',
      data: {
        id: $scope.updateAccountId,
        firstname: $scope.addAccountFname.charAt(0).toUpperCase() + $scope.addAccountFname.slice(1),
        lastname: $scope.addAccountLname.charAt(0).toUpperCase() + $scope.addAccountLname.slice(1),
        designation: $scope.addAccountDesignation,
        username: $scope.username,
        password: $scope.password,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getAccounts();
      $scope.clearAddAccountForm();
      myalert.success("SUCCESS!", "Account updated.");
    }
  }

  $scope.clearAddAccountForm = () => {
    $scope.updateAccountId = '';
    $scope.addAccountFname = '';
    $scope.addAccountLname = '';
    $scope.addAccountDesignation = 'Pharmacist';
    $scope.username = '';
    $scope.password = '';
  }

  // Deactivate account
  $scope.setAccountInactive = (data) => {
    myalert.confirm('Info!', 'Are you sure you want to deactivate ' + data.fullname + '\'s account ?')
      .then(async function (response) {
        if (response) {
          const payload = {
            path: '../services/account/update_account_status.php',
            data: {
              id: data.id,
              status: 'inactive'
            }
          }

          const response = await $scope.update(payload);
          if (response === 'success') {
            $scope.getAccounts();
            myalert.success("SUCCESS!", "Account deactivated.");
          }
        }
      })
  }

  // Activate account
  $scope.setAccountActive = (data) => {
    myalert.confirm('Info!', 'Are you sure you want to activate ' + data.fullname + '\'s account ?')
      .then(async function (response) {
        if (response) {
          const payload = {
            path: '../services/account/update_account_status.php',
            data: {
              id: data.id,
              status: 'active'
            }
          }

          const response = await $scope.update(payload);
          if (response === 'success') {
            $scope.getAccounts();
            $('#modal_id').modal('hide');
            myalert.success("SUCCESS!", "Account activated.");
          }
        }
      })
  }

  $scope.openModal = async () => {
    $scope.modal_header = "Inactive Accounts";
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.setAccountActive },
    ];

    const payload = {
      path: '../services/account/get_inactive_account.php',
    }

    $scope.deactivated_accounts_data = await $scope.get(payload);
    $scope.$applyAsync();

    $scope.table_data = { // modal table data
      column: $scope.accounts_columns,
      data: $scope.deactivated_accounts_data,
      action: action
    }
  }

  // GET accounts
  $scope.accounts_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Full Name", type: "text", field: "fullname" },
    { label: "Designation", type: "text", field: "designation" },
  ];
  $scope.accounts_actions = [
    { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateAccount },
    { icon: "fa fa-user-slash", iconSize: '15px', action: $scope.setAccountInactive },
  ];
  $scope.getAccounts = async () => {
    const payload = {
      path: '../services/account/get.php',
    }

    $scope.accounts_data = await $scope.get(payload);
    $scope.$applyAsync();
  }

  // CREATE accounts
  $scope.addAccountDesignation = 'Pharmacist';
  $scope.createAccount = async () => {
    try {
      const createAccountForm = [
        { model: $scope.addAccountFname, label: 'First Name', rule: 'required' },
        { model: $scope.addAccountLname, label: 'Last Name', rule: 'required' },
        { model: $scope.addAccountDesignation, label: 'Designation', rule: 'required' },
        { model: $scope.username, label: 'UserName', rule: 'required' },
        { model: $scope.password, label: 'Password', rule: 'required' },
      ];

      const error = $scope.validateForm(createAccountForm);
      if (error) { myalert.warning('WARNING!', error); return; }

      const payload = {
        path: '../services/account/create.php',
        data: {
          firstname: $scope.addAccountFname.charAt(0).toUpperCase() + $scope.addAccountFname.slice(1),
          lastname: $scope.addAccountLname.charAt(0).toUpperCase() + $scope.addAccountLname.slice(1),
          designation: $scope.addAccountDesignation,
          username: $scope.username,
          password: $scope.password,
        }
      }

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.addAccountFname = '';
        $scope.addAccountLname = '';
        $scope.username = '';
        $scope.password = '';
        myalert.success("SUCCESS!", "Account created.");
      }

      $scope.getAccounts();
    } catch (error) {
      throw error;
    }
  }

  // GENERATE username and password
  $scope.generateCredentials = () => {
    if ($scope.addAccountFname && $scope.addAccountLname && $scope.addAccountDesignation) {
      $scope.username = 'user.' + $scope.addAccountLname;
      $scope.password = 'pass.' + $scope.addAccountLname;
    }
  }
  $scope.passwordFieldType = 'password';
  $scope.showPassword = () => {
    $scope.passwordFieldType = $scope.passwordFieldType === 'password' ? 'text' : 'password';
  }
});
