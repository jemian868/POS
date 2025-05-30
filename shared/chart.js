app.controller("ChartController", function ($scope) {
  /**
   * Note:
   * The "$scope.chart_data" variable is a global variable for chart.
   * Below is the required format for "$scope.chart_data"
   * [{ id: "chartId", type: "area", data: [150, 34, 65] }]
   */
  $scope.chart_data.map((item) => {
    if (item.label.length !== item.data.length) {
      alert('The lengths of "label" and "data" must be equal.');
      return;
    }

    const data = {
      type: item.type, // from other (controller)
      backgroundColor: item.background,

      fontColor: "#fff",
      legend: { visible: false },
      scaleX: {
        labels: item.label,
        tick: { lineColor: "transparent" },
        lineColor: "transparent",
        guide: { visible: true },
        item: { fontColor: "#fff" },
      },
      scaleY: {
        tick: { lineColor: "transparent" },
        lineColor: "transparent",
        guide: { visible: true },
        item: { fontColor: "#fff" },
      },
      plot: {
        animation: {
          effect: "ANIMATION_EXPAND_BOTTOM",
          method: "ANIMATION_STRONG_EASE_OUT",
          sequence: "ANIMATION_BY_NODE",
          speed: 275,
        },
        tooltip: {
          text: "%v", // Shows the value of the bar
          fontColor: "#ff0", // Change this to any color you want
          backgroundColor: "#333", // Optional: style tooltip background
          borderRadius: 5,
          fontSize: 14
        }
      },
      series: [
        {
          values: item.data, // from other (controller)
          backgroundColor: "#fff",
          lineColor: "#000",
          marker: {
            backgroundColor: "#000",
          },
        },
      ],
    };
    zingchart.render({
      id: item.id,
      data: data,
      height: "100%",
      width: "100%",
    });
  });
});
