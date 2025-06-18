<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <title>POS</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../../images/logo.png"/>
    <?php include 'imports.html'; ?>
  </head>
  <body ng-controller="main">
    <div class="main-container" ng-init="checkAccount()">
      <!-- Navigation -->
      <div class="navigation-container">
        <h6>
          <i class="fa fa-store"></i> <br/>
          <span>{{account_designated}}</span> <br/>
          <small><i data-toggle="modal" data-target="#credentialModal" class="fa fa-user-pen"></i> {{account_name}}</small> <br/>
        </h6>
        <ul>
          <li ng-repeat="route in routes">
            <a href="{{route.path}}" class="navigation-active">
              <i class="{{route.icon}}"></i> &emsp; {{route.label}}
            </a>
          </li>
        </ul>
      </div>
      <!-- Routes -->
      <ng-view></ng-view>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="credentialModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><small>UPDATE CREDENTIALS</small></h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="credentials-container">
              <input ng-model="cusername" type="text" placeholder="Current username">
              <input ng-model="cpassword" type="password" placeholder="Current password">
              <hr/>
              <input ng-model="nusername" type="text" placeholder="New username">
              <input ng-model="npassword" type="password" placeholder="New password">
            </div>
          </div>
          <div class="modal-footer">
            <button ng-click="updateCredentials()" type="button" class="btn btn-success saveCredentialButton">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </body>

  <style>
    .credentials-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px
    }
    .credentials-container input {
      padding: 10px;
      outline: none;
      font-size: 12px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .saveCredentialButton {
      font-size: 12px;
    }
  </style>
</html>