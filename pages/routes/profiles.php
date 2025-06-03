<div class="route-container">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-user-injured"></i> / Profiles</span>
      <b>Profiles</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <!-- Add profile -->
    <div class="add-profile-container">
      <small>PERSONAL DETAILS</small>
      <input type="text" placeholder="Full Name">
      <input type="date" placeholder="Birth Date">
      <input type="text" placeholder="Gender">
      <select>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
      </select>
      <input type="text" placeholder="Nationality">
      <input type="text" placeholder="Contact">
      <input type="text" placeholder="Address">
      
      <div class="buttons-container">
        <button class="btn btn-success"><i class="fa fa-plus"></i> Create Profile</button>
        <!-- <button class="btn btn-primary"><i class="fa fa-edit"></i> Update </button>
        <button class="btn btn-danger"><i class="fa fa-times"></i> Cancel</button> -->
      </div>
    </div>

    <!-- List of profiles -->
    <div class="profiles-container">
      <custom-table 
        search="search"
        column="profiles_columns" 
        data="profiles_data" 
        actions="profiles_actions">
      </custom-table>
    </div>
  </div>
</div>

<style>
  .add-profile-container {
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
  .add-profile-container small {
    padding: 13px 5px;
    font-weight: bold;
  }
  .add-profile-container > input,
  .add-profile-container > select {
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

  .profiles-container {
    width: 59.5%;
    height: 100%;
    float: right;
    overflow: auto;
  }
</style>