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
    <div class="main-container">
      <!-- Navigation -->
      <div class="navigation-container">
        <h6>
          <i class="fa fa-store"></i> <br/>
          POS
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
  </body>
</html>