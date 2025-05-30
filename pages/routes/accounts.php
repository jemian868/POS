<div class="route-container">
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
      <small>ACCOUNT DETAILS</small>
      <span>FIRST NAME</span>
      <input type="text">
      <span>LAST NAME</span>
      <input type="text">
      
      <span>DESIGNATION</span>
      <select>
        <option>Pharmacist</option>
        <option>Registrar</option>
      </select>

      <span>USERNAME</span>
      <input type="text" disabled>
      <span>PASSWORD</span>
      <input type="text" disabled>
      
      <button class="btn btn-success"><i class="fa fa-plus"></i> Create Account</button>
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
  .add-account-container > input,
  .add-account-container > select {
    padding: 5px;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc; 
    border-radius: 5px;
  }
  .add-account-container button {
    width: 100%;
    padding: 5px;
    font-size: 13px;
  }

  .accounts-container {
    width: 59.5%;
    height: 100%;
    float: right;
    overflow: auto;
  }
</style>