var chart;

// create chart
AmCharts.ready(function() {

  // load the data
  var chartData = AmCharts.loadJSON('php/getData.php');

  // SERIAL CHART
  chart = new AmCharts.AmSerialChart();
  chart.pathToImages = "http://www.amcharts.com/lib/images/";
  chart.dataProvider = chartData;
  chart.categoryField = "timeStamp";
  chart.dataDateFormat = "YYYY-MM-DD JJ:NN:SS";

  // GRAPHS
  var graph1 = new AmCharts.AmGraph();
  graph1.valueField = "temperature";
  graph1.bullet = "round";
  graph1.bulletBorderColor = "#FFFFFF";
  graph1.bulletBorderThickness = 2;
  graph1.lineThickness = 2;
  graph1.lineAlpha = 0.5;
  chart.addGraph(graph1);

  // CATEGORY AXIS
  chart.categoryAxis.parseDates = true;
  chart.categoryAxis.minPeriod = "mm";

  // WRITE
  chart.write("chartdiv");

});

var gaugeChart = AmCharts.makeChart( "chartdiv1", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "axisThickness": 1,
    "axisAlpha": 0.2,
    "tickAlpha": 0.2,
    "valueInterval": 0.5,
    "bands": [ {
      "color": "#0099ff",
      "endValue": 26,
      "startValue": 23
    }, {
      "color": "#66ff33",
      "endValue": 27,
      "startValue": 26
    }, {
      "color": " #99ff33",
      "endValue": 28,
      "startValue": 27
    }, {
      "color": "#ccff33",
      "endValue": 29,
      "startValue": 28
    }, {
      "color": "#ff6600",
      "endValue": 32,
      "innerRadius": "95%",
      "startValue": 29
    } ],
    "bottomText": "0 km/h",
    "bottomTextYOffset": -20,
    "endValue": 32,
    "startValue": 23
  } ],
  "arrows": [ {} ],
  "export": {
    "enabled": true
  }
} );


setInterval( randomValue, 1000 );

  //REAL TIME UPDATE
  function randomValue() {

	  chartData = AmCharts.loadJSON('php/getData.php');
      chart.dataProvider = chartData;
      chart.validateData();
      var value = chartData[chartData.length - 1].temperature

      gaugeChart.arrows[ 0 ].setValue( value );
      gaugeChart.axes[ 0 ].setBottomText( value + " grados" );

      /*
      //Show Last Value
	  document.getElementById('lastMeasure').innerHTML= chartData[chartData.length - 1].value1;
	  */

  }
