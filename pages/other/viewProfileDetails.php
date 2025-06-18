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
    <div class="main-container" ng-init="init()">
      <div class="personal-details-container">
        <img ng-src="../../uploads/{{patientImage}}">
        <span><b>FULLNAME</b>: {{patientFullname}}</span>
        <span><b>GENDER:</b> {{patientGender}}</span>
        <span><b>CIVIL STATUS:</b> {{patientCivilStatus}}</span>
        <span><b>BIRTH DATE:</b> {{patientBirthDate}}</span>
        <span><b>NATIONALITY:</b> {{patientNationality}}</span>
        <span><b>CONTACT:</b> {{patientContact}}</span>
        <span><b>ADDRESS:</b> {{patientAddress}}</span>
        <span><b>DATE ADMITTED:</b> {{patientAdmitted}} - {{patientDischarged}}</span>
      </div>
      <div class="records-container">
        <button data-toggle="modal" data-target="#addRecordModal" class="btn btn-secondary btn-sm"><i class="fa fa-plus"></i> ADD RECORD</button>
        <div class="records-list-container">
          <ul>
            <li ng-repeat="record in recordsList track by $index" ng-dblclick="removeRecord($index)"><b>{{record.label}}:</b> {{record.value}}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="addRecordModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>ADD RECORD</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="records-modal-container">
              <input ng-model="recordLabel" type="text" placeholder="Label">
              <input ng-model="recordValue" type="text" placeholder="Record">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="addRecord()" type="button" class="btn btn-success saveRecordButton">Save record</button>
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
    font-family: "Segoe UI", Tahoma, sans-serif;
  }

  .main-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .personal-details-container {
    padding: 70px 100px;
    width: 50%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
  }
  .personal-details-container img {
    margin-bottom: 20px;
    height: 170px;
    border-radius: 7px;
  }
  .personal-details-container span {
    padding: 10px 0;
    font-size: 15px;
    letter-spacing: 1px;
  }

  .records-container {
    padding: 50px 50px 0 50px;
    width: 50%;
    background: #fff;
    box-sizing: border-box;
    position: relative;
  }
  .records-container button {
    position: absolute;
    top: 15px;
    left: 50px;
  }
  .records-container button:active {
    transform: scale(.99)
  }

  .records-list-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .records-list-container ul {
    list-style: none;
    padding: 0;
    user-select: none;
    color: rgb(70,70,70);
  }
  .records-list-container ul li {
    padding: 5px 0;
    cursor: pointer;
  }

  .records-modal-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px
    }
  .records-modal-container input {
    padding: 10px;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .saveRecordButton {
    font-size: 14px;
  }
</style>
