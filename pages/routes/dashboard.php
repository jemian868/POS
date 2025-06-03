<div class="route-container" ng-init="init()">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-chart-simple"></i> / Dashboard</span>
      <b>Dashboard</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i ng-click="logOut()" class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <div class="cards-container">
      <custom-card 
        icon="fa fa-user-injured"
        icolor="linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))"
        sub="TOTAL PATIENTS"
        value="867"
        label="Patients"
      />
      
      <custom-card 
        icon="fa fa-bed-pulse"
        icolor="linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))"
        sub="TOTAL ADMITTED"
        value="320"
        label="Admitted"
      />
      
      <custom-card 
        icon="fa fa-people-group"
        icolor="linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))"
        sub="TOTAL DISCHARGED"
        value="12"
        label="Discharged"
      />
    </div>

    <div class="restock-indicator-container">
      <div ng-controller="ChartController" class="chart-wrapper">
        <div id="salesChart" class="chart" />
        <div class="chart-title-container">
          <label>Monthly Sales</label>
          <span>2025</span>
        </div>
      </div>

      <div class="restock-indicator-wrapper">
        <div class="restock-header">
          <label>
            <small>RESTOCK INDICATOR</small>
            <i class="fa-solid fa-ellipsis-vertical" />
          </label>
          <span><i class="fa fa-calendar-days"></i> {{currentDate}}</span>
        </div>
        <div class="restock-content">
          <custom-table 
            search="search"
            column="stocks_columns" 
            data="stocks_data" >
          </custom-table>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  custom-card {
    display: block;
    width: 33%;
  }

  .cards-container {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }

  .restock-indicator-container {
    width: 100%;
    height: calc(100vh - 300px);
    overflow: auto;
    display: flex;
    gap: 10px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .chart-wrapper {
    width: 45%;
    margin-top: 30px;
    padding: 0 20px;
    border: 1px solid #f3f3f3;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px; 
  }
  .chart-title-container {
    height: 50px;
    display: flex;
    color: #344767;
    flex-direction: column;
    justify-content: center;
  }
  .chart-title-container label {
    margin: 0;
    font-weight: 900;
    font-size: 15px;
  }
  .chart-title-container span {
    margin: 0;
    font-size: 14px;
  }
  .chart {
    margin-top: -30px;
    height: 230px;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }

  .restock-indicator-wrapper {
    padding: 10px;
    width: 55%;
    height: 100%;
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
    border: 1px solid #f3f3f3;
  }
  .restock-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #f3f3f3
  }
  .restock-header label {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .restock-header label small {
    font-weight: 900
  }
  .restock-header span {
    font-size: 12px;
  }
  .restock-content {
    width: 100%;
    height: 1500px;
    overflow: auto;
    position: relative;
    max-height: calc(100% - 60px);
  }
  .restock-content table {
    margin: 0;
    width: 100%;
    font-size: 13px;
  }
  .restock-content table thead {
    top: 0;
    left: 0;
    position: sticky;
    background: #fff;
  }
  .restock-content table thead tr th {
    padding: 8px 5px;
    white-space: nowrap;
  }
  .restock-content table tbody tr td {
    padding: 10px 5px;
    white-space: nowrap;
    border-bottom: 1px solid #f3f3f3;
  }
</style>