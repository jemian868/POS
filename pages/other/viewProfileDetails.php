<!DOCTYPE html>
<html lang="en" ng-app="recordApp">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profile Details</title>
    <link rel="icon" href="../../images/logo.png" />
    <!-- JQuery -->
    <script type="text/javascript" src="../../assets/JQuery/jquery.min.js"></script>
    <script type="text/javascript" src="../../assets/popper/popper.js"></script>
    <!-- Angular JS -->
    <script
      type="text/javascript"
      src="../../assets/angularJS/angular.min.js"></script>
    <!-- Bootstrap -->
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/bootstrap/bootstrap.min.css" />
    <script
      type="text/javascript"
      src="../../assets/bootstrap/bootstrap.min.js"></script>
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/fontawesome/css/all.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/fontawesome/css/all.min.css" />
    <!-- My Alert -->
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/myAlert/myAlert.css" />
    <script type="text/javascript" src="../../assets/myAlert/myAlert.js"></script>
    <script type="text/javascript" src="controller.js"></script>
  </head>
  <body ng-controller="recordController">
    <div class="mainContainer" ng-init="init()">
      <div class="headerBackground"></div>
      <div class="contentContainer">
        <div class="header">
          <img ng-src="../../uploads/{{patientImage}}">
          <div class="fullNameContainer">
            <span>{{patientFullname}}</span>
            <small>{{patientAdmitted}} <small ng-if="patientDischarged">/ {{patientDischarged}}</small></small>
          </div>
        </div>

        <div class="contentBody">
          <!-- Info Container -->
           <div class="contentWrapper">
            <small>INFORMATION</small>

            <div class="informationContainer">
              <ul>
                <li><b>Birth Date:</b> August 21, 1996</li>
                <li><b>GENDER:</b> {{patientGender}}</li>
                <li><b>CIVIL STATUS:</b> {{patientCivilStatus}}</li>
                <li><b>NATIONALITY:</b> {{patientNationality}}</li>
                <li><b>CONTACT:</b> {{patientContact}}</li>
                <li><b>ADDRESS:</b> {{patientAddress}}</li>
              </ul>
            </div>
           </div>
           
          <!-- Record Container -->
          <div class="contentWrapper">
            <small>RECORD</small>

            <div class="recordContainer">
              <div ng-repeat="record in recordList track by $index" class="recordWrapper">
                <small>
                  <i ng-click="passValueAddRecordList(record, $index)" data-toggle="modal" data-target="#addRecordListModal" class="fa fa-plus"></i>
                  <i ng-click="passValueUpdateRecord(record, $index)" data-toggle="modal" data-target="#updateRecordModal" class="fa fa-edit"></i>
                  <i ng-if="userRole == 'Admin'" ng-click="removeRecord($index)" class="fa fa-trash"></i>
                </small>
                <span>{{record.title}}</span>

                <ul>
                  <li ng-repeat="item in record.list track by $index">
                    <i ng-if="userRole == 'Admin'" ng-click="removeRecordList($parent.$index, $index)"  class="fa fa-trash-can"></i>
                    <i ng-click="passValueUpdateRecordList(record, $parent.$index, item, $index)" data-toggle="modal" data-target="#updateRecordListModal" class="fa fa-edit"></i> 
                    <b>{{item.label}}:</b> {{item.data}}
                  </li>
                </ul>
              </div>
            </div>

            <button data-toggle="modal" data-target="#addRecordModal" class="btn btn-light btn-sm createButton"><i class="fa fa-plus"></i> Create Record</button>
          </div>
           
          <!-- Images Container -->
          <div class="contentWrapper">
            <small>IMAGES</small>

            <div class="imagesContainer">
              <table>
                <tbody>
                  <tr>
                    <td style="width: 15%"> <img ng-src="../../uploads/{{patientImage}}"> </td>
                    <td> Sample Image </td>
                    <td style="width: 20%">
                      <i class="fa fa-eye"></i>
                      <i class="fa fa-edit"></i>
                      <i class="fa fa-trash"></i>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="width: 15%"> <img ng-src="../../uploads/{{patientImage}}"> </td>
                    <td> Sample Image </td>
                    <td style="width: 20%">
                      <i class="fa fa-eye"></i>
                      <i class="fa fa-edit"></i>
                      <i class="fa fa-trash"></i>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="width: 15%"> <img ng-src="../../uploads/{{patientImage}}"> </td>
                    <td> Sample Image </td>
                    <td style="width: 20%">
                      <i class="fa fa-eye"></i>
                      <i class="fa fa-edit"></i>
                      <i class="fa fa-trash"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button data-toggle="modal" data-target="#uploadImageModal" class="btn btn-light btn-sm createButton"><i class="fa fa-plus"></i> Upload Image</button>
          </div>
        </div>
      </div>
    </div>

    
    <!-- Modal -->
     <!-- ADD Record Modal -->
    <div class="modal fade" id="addRecordModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>ADD RECORD</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="addRecordModalFormContainer">
              <input ng-model="addRecordTitleModel" type="text" placeholder="Record Title">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="addRecord()" type="button" class="btn btn-success btn-sm saveRecordButton">Create record</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- UPDATE Record Modal -->
    <div class="modal fade" id="updateRecordModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>UPDATE RECORD</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="addRecordModalFormContainer">
              <input ng-model="updateRecordTitleModel" type="text" placeholder="Record Title">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="updateRecord()" type="button" class="btn btn-success btn-sm saveRecordButton">Save</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ADD Record List Modal -->
    <div class="modal fade" id="addRecordListModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>ADD RECORD LIST</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="addRecordModalFormContainer">
              <input ng-model="addRecordLabelModel" type="text" placeholder="Record Label">
              <input ng-model="addRecordValueModel" type="text" placeholder="Record Value">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="addRecordList()" type="button" class="btn btn-success btn-sm saveRecordButton">Save</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- UPDATE Record List Modal -->
    <div class="modal fade" id="updateRecordListModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>UPDATE RECORD LIST</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="addRecordModalFormContainer">
              <input ng-model="updateRecordLabelModel" type="text" placeholder="Record Label">
              <input ng-model="updateRecordValueModel" type="text" placeholder="Record Value">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="updateRecordList()" type="button" class="btn btn-success btn-sm saveRecordButton">Save</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- UPLOAD Image Modal -->
    <div class="modal fade" id="uploadImageModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>UPLOAD IMAGE</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="uploadImageContainerModal">
              <img ng-src="../../uploads/{{patientImage}}">
              <input ng-model="updateRecordValueModel" type="file">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="uploadImage()" type="button" class="btn btn-success btn-sm saveRecordButton">Add Image</button>
          </div>
        </div>
      </div>
    </div>

  </body>
</html>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
    user-select: none;
    font-family: 'Poppins', 'Source Code Pro', 'Sen', sans-serif, monospace;
  }

  .mainContainer {
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f3f3f3;
  }
  .headerBackground {
    margin-bottom: -100px;
    width: 100%;
    height: 300px;
    background: linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)) 50% center / cover, url(../../images/bg-profile.jpeg) transparent;
    background-position: 50% center;
    border-radius: 10px;
  }
  .contentContainer {
    margin: 0 auto;
    padding: 20px;
    width: calc(100% - 50px);
    border-radius: 10px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
  .contentContainer > .header {
    padding: 10px 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
  }
  .contentContainer > .header img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .fullNameContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .fullNameContainer span {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: #344767;
  }
  .fullNameContainer small {
    font-size: 14px;
    color: grey;
  }

  .contentBody {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  .contentWrapper {
    flex: 1;
    padding: 0 10px;
    margin-top: 50px;
    font-size: 15px;
  }
  .contentWrapper small {
    font-weight: 900;
  }

  .informationContainer {
    margin-top: 20px;
    width: 100%;
    font-size: 12px;
    color: #344767;
  }
  .informationContainer ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .informationContainer ul li {
    padding: 8px 0;
  }

  .recordContainer {
    margin-top: 20px;
    width: 100%;
    font-size: 12px;
    color: #344767;
  }
  .recordWrapper {
    margin-bottom: 10px;
    padding: 10px;
    position: relative;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
  }
  .recordWrapper small {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
  .recordWrapper small i {
    font-size: 14px;
    cursor: pointer;
  }
  .recordWrapper small i:active {
    transform: scale(.9)
  }
  .recordWrapper span {
    display: block;
    padding-top: 10px;
    margin-bottom: 10px;
    font-weight: 700;
    border-bottom: 1px solid #f3f3f3
  }
  .recordWrapper ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .recordWrapper ul li {
    padding: 4px 0;
  }
  .recordWrapper ul li i {
    margin-right: 5px;
    cursor: pointer;
  }
  .recordWrapper ul li i:active {
    transform: scale(.9)
  }

  .imagesContainer {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    font-size: 12px;
    color: #344767;
  }
  .imagesContainer table {
    width: 100%;
  }
  .imagesContainer table tbody tr td {
    padding: 5px 0;
  }
  .imagesContainer table tbody tr td img {
    height: 50px;
    border-radius: 5px;
  }
  .imagesContainer table tbody tr td i {
    margin: 0 5px;
    cursor: pointer;
  }
  .imagesContainer table tbody tr td i:active {
    transform: scale(.9)
  }

  .createButton {
    margin-top: 10px;
    width: 100%;
  }

  .saveRecordButton {
    font-size: 14px;
  } 

  .addRecordModalFormContainer {
    width: 100%;
  }
  .addRecordModalFormContainer input {
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .uploadImageContainerModal {
    width: 100%;
  }
  .uploadImageContainerModal img {
    width: 100%;
    margin-bottom: 10px;
  }
  .uploadImageContainerModal input {
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
</style>
