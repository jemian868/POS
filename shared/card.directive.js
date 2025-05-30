app.directive("customCard", function () {
  return {
    restrict: "E",
    scope: {
      icon: "@",
      icolor: "@",
      sub: "@",
      value: "@",
      label: "@",
    },
    template: `
            <div class="card-container">
              <div class="icon-container" style="background: {{icolor}}">
                <i class="{{icon}}"></i>
              </div>
              <div class="content-container">
                <span>{{sub}}</span>
                <h3>{{value}}</h3>
              </div>
              <div class="label-container">
                {{label}}
              </div>
            </div>
        `,
  };
});
