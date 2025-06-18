<div class="route-container" ng-init="init()">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-user-injured"></i> / Profiles</span>
      <b>Profiles</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i ng-click="logOut()" class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <!-- Add profile -->
    <div class="add-profile-container">
      <small>PERSONAL DETAILS</small>
      <input ng-model="addProfileFullname" type="text" placeholder="Full Name">
      <input ng-model="addProfileBirtDate" type="date" placeholder="Birth Date">
      <select ng-model="addProfileGender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select ng-model="addProfileCivilStatus">
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
      </select>
      <input ng-model="addProfileNationality" type="text" placeholder="Nationality">
      <input ng-model="addProfileContact" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="Contact">
      <input ng-model="addProfileAddress" type="text" placeholder="Address">
      
      <div class="buttons-container">
        <button ng-if="!updateProfileId" ng-click="createProfile()" class="btn btn-success"><i class="fa fa-plus"></i> Create Profile</button>
        <button ng-if="updateProfileId" ng-click="updateProfile()" class="btn btn-primary"><i class="fa fa-edit"></i> Update </button>
        <button ng-if="updateProfileId" ng-click="clearProfileForm()" class="btn btn-danger"><i class="fa fa-times"></i> Cancel</button>
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

<!-- Modal -->
<custom-modal
  modal-id="modal_id"
  modal-title="modal_header"
  modal-size="modal-lg"
  input-action="input_action"
  table-data="table_data">
</custom-modal>

<div class="modal fade" id="addImageModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><small>ADD PHOTO</small></h5>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="add-image-container">
          <div class="imageViewer">
            <img ng-src="{{previewImage}}" alt="Selected Image" />
          </div>
          <input type="file" accept="image/*" onchange="angular.element(this).scope().previewFile(this)" />
        </div>
      </div>
      <div class="modal-footer">
        <button ng-click="uploadImage()" type="button" class="btn btn-success saveImageButton">Save image</button>
      </div>
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
  
  .add-image-container {
    width: 100%;
  }
  .add-image-container input {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    outline: none;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 7px;
  }
  .imageViewer {
    width: 100%;
    height: 150px;
    text-align: center;
  }
  .imageViewer img {
    height: 100%;
  }
  .saveImageButton {
    font-size: 14px;
  }
</style>