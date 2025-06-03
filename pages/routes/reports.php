<div class="route-container">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-folder"></i> / Reports</span>
      <b>Reports</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i ng-click="logOut()" class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <div class="reports-container">
      <div class="header">
        <div class="date-filter-container">
          <input type="date">
          <input type="date">
          <button class="btn btn-success"><i class="fa fa-search"></i></button>
        </div>

        <select>
          <option>Sales Reports</option>
          <option>Stocks Reports</option>
          <option>Profiles Reports</option>
        </select>
        <button class="btn btn-warning"><i class="fa fa-file-csv"></i></button>
      </div>

      <div class="body">
        <custom-table 
          search="search"
          column="stocks_columns" 
          data="stocks_data" >
        </custom-table>
      </div>
    </div>
  </div>
</div>

<style>
  .reports-container {
    width: 100%;
    height: 100%;
  }
  .header {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
  .header select {
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    font-size: 13px;
    color: #344d67;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .date-filter-container {
    margin-right: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .date-filter-container input {
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    font-size: 13px;
    color: #344d67;
    text-transform: uppercase;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .date-filter-container button {
    padding: 0 15px;
    height: 100%;
    outline: none;
  }

  .body {
    width: 100%;
    height: calc(100% - 70px);
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
</style>