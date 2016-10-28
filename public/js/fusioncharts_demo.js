/* global Handlebars */

var chartData;
var upperLim;
var lowerLim;
$(function(){
  $.ajax({

    url: 'http://localhost:3300/scores',
    type: 'GET',
    success : function(data) {
      chartData = data;
	console.log(data);
      var template = Handlebars.compile($("#tabular-template").html());
      $("#table-location").html(template(data));
      
      var chartProperties = {
        "caption": "Top 10 run scorers in ODI Cricket in 2015",
        "numberprefix": "No. of runs",
        "xAxisName": "Player",
        "yAxisName": "Runs Scored"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-location',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();
    }
         
  });
  
});

$(function(){
    
    Handlebars.compile($("#range-selection").html());
    
$('#submit').click(function() {
   
          alert("Success");
  $.ajax({

    url: 'http://localhost:3300/',
    type: 'POST',
   dataType: "json",
    data: {    
       upper : $("#upper").val(),
        lower : $("#lower").val()
        }  
             
  });
  });
});
