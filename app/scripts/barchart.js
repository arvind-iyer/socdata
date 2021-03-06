/**
 * Created by aiyer on 9/5/17.
 */
var csvData;
function plotChart(data) {
    var w = 400;
    var h = 250, H = 300;
    var keys = ["Food", "Sanitation", "Neighbourhood", "Noise", "Homeless"];
    var values = [];
    for(var key in keys) {
        values.push(parseInt(data[keys[key]]));
    }
    console.log("keys", keys, values);

    var xScale = d3.scale.ordinal()
        .domain(d3.range(values.length))
        .rangeRoundBands([0, w], 0.1);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(values)])
        .range([0, h]);

    var svg = d3.select("#bar").append("svg")
        .attr("width", w).attr("height", H).attr("class", "bar");

    svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);         // <-- Set x values
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "#ff8000")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);;

    svg.selectAll("text")
        .data(values)
        .enter()
        .append("text")
        .attr("x", function(d, i){
            return xScale(i) + (13 - keys[i].length)* 2;
        })
        .attr("y", function(d) {
            return h + 20;
        })
        .text(function(d,i) {
            return keys[i];
        })
        .attr("font-size", 12)
        .attr("font-family", "Open Sans");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([20, 0])
        .html(function(d) {
            return "<div id='tooltip'>Number of Complaints: " + d + "</div>";
        });
    svg.call(tip);

    function mouseover(d, i) {
        tip.show(d,i);
        d3.select(this)
            .transition().duration(400)
            .attr("fill", "#df9f9f");
    }
    function mouseout(d, i) {
        tip.hide(d, i);
        d3.select(this).transition().attr("fill", "#ff3300");
    }

}

d3.csv("../res/data/graphMove.csv", function (csv) {
    // plotChart(getDataOfZip(csv, zip));
    csvData = csv;

});

function plotForZip(zip) {
    data = csvData;
    for(var i = 0; i < data.length; i++) {
        if(data[i].ZipCode == zip) {
            console.log(zip);
            plotChart(data[i]);
        }
    }
    //not found
    return -1;
}