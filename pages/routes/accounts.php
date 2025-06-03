<div class="route-container" ng-init="init()">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-user-secret"></i> / Accounts</span>
      <b>Accounts</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <div class="add-account-container">
      <small>ACCOUNT DETAILS <i class="fa fa-users-slash" ng-click="openModal()" data-toggle="modal" data-target="#modal_id"></i></small>
      <span>FIRST NAME</span>
      <input ng-model="addAccountFname" type="text" ng-change="generateCredentials()">
      <span>LAST NAME</span>
      <input ng-model="addAccountLname" type="text" ng-change="generateCredentials()">
      
      <span>DESIGNATION</span>
      <select ng-model="addAccountDesignation" ng-change="generateCredentials()">
        <option value='Pharmacist'>Pharmacist</option>
        <option value='Registrar'>Registrar</option>
      </select>

      <span>USERNAME</span>
      <input ng-model="username" type="text" disabled>
      <span>PASSWORD</span>
      <div class="select-container">
        <input ng-model="password" type="{{passwordFieldType}}" disabled>
        <i class="fa fa-eye" ng-click="showPassword()"></i>
      </div>
            
      <div class="buttons-container">
        <button ng-if="!updateAccountId" ng-click="createAccount()" class="btn btn-success"><i class="fa fa-plus"></i> Create Account</button>
        <button ng-if="updateAccountId" ng-click="updateAccount()" class="btn btn-primary"><i class="fa fa-edit"></i> Update </button>
        <button ng-if="updateAccountId" ng-click="clearAddAccountForm()" class="btn btn-danger"><i class="fa fa-times"></i> Cancel</button>
      </div>
    </div>

    <div class="accounts-container">
      <custom-table 
        search="search"
        column="accounts_columns" 
        data="accounts_data" 
        actions="accounts_actions">
      </custom-table>
    </div>
  </div>
</div>

<!-- Modal -->
<custom-modal
  modal-id="modal_id"
  modal-title="modal_header"
  modal-size="modal-lg"
  table-data="table_data">
</custom-modal>

<style>
  .add-account-container {
    padding: 10px;
    width: 39.5%;
    height: 100%;
    float: left;
    font-size: 12px;
    overflow: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
  .add-account-container small {
    padding: 13px 5px;
    font-weight: bold;
  }
  .add-account-container small > i {
    font-size: 15px;
    float: right;
    color: #344767;
    cursor: pointer;
  }
  .add-account-container small > i:active {
    transform: scale(.9);
  }
  .add-account-container > input,
  .add-account-container > select {
    padding: 7px;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc; 
    border-radius: 5px;
  }
  .buttons-container {
    display: flex;           /* Enable flex layout */
    flex-direction: row;     /* Align children in a row (horizontal) */
    justify-content: flex-start;  /* Align items to the start (left) */
    align-items: center;     /* Optional: vertically center the items */
    gap: 16px;  
  }
  .buttons-container > button {
    min-width: 25%;
    padding: 10px 15px;
    font-size: 13px;
  }

  .accounts-container {
    width: 59.5%;
    height: 100%;
    float: right;
    overflow: auto;
  }

  
  .select-container {
    padding: 0 45px 0 0;
    margin-bottom: 10px;
    position: relative;
    border: 1px solid #ccc; 
    border-radius: 5px;
    background: #f0f0f0;
  }
  .select-container input {
    width: 100%;
    height: 100%;
    padding: 7px 5px;
    outline: none;
    border: none;
    background: #fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    appearance: none;
  }
  .select-container i {
    padding: 7px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #344767;
    cursor: pointer;
    font-weight: 900;
  }
</style>