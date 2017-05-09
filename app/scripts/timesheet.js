var data;
var j = 0;
var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
function makeChart(dailyData) {
  console.log(dailyData);
  var cellSize = 10;
  var padding = 2;
  var w = Math.ceil(dailyData.length/7)*(cellSize+padding) + 5;
  var h = 7 * (cellSize + padding) + 30;
  var div = d3.select("body").append("div").attr("id", "#calendar");
  var svg = d3.select("div")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

  svg.selectAll("rect")
  .data(dailyData)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    this.month = j+1;
    return (Math.floor(i/7))*(cellSize+padding);
  })
  .attr("y", function(d, i) {
    return (i % 7) * (cellSize+padding);
  })
  .attr("width", (cellSize))
  .attr("height", (cellSize))
  .attr("fill", function(d) {
    colourScale = d3.scale.sqrt()
    .domain([0, d3.max(dailyData)])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#12036b"), d3.rgb('#d4f9e8')]);
    return colourScale(d);

  }).on('mouseover', function(d, i) {
    tip.show(d, i, this.month);
  }).on('mouseout', function(d, i) {
    tip.hide(d);
  });


  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d, i, month) {
    console.log(d, i, month);
    return "<div id='tooltip' style='width: 140px;'>Number of complaints on <strong>" +monthNames[month-1] + " " + (i+1) + "</strong>: <span style='color:red'>" + d + "</span></div>";
  });


    svg.call(tip);

  svg
  .append("text")
  .attr("x", 0)
  .attr("y", h - 15)
  .text(monthNames[j++].substr(0,3));

}

d3.json("../res/data/daily-complaints.json", function(json) {
  console.log(json);
  data = json;
  for (var month in json) {
    if (json.hasOwnProperty(month)) {
      makeChart(json[month]);
    }
  }
})
