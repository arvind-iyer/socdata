//Code for plotting map
var w2 = 600;
var h = 500;
var scale = ((w2-1) / 2 / Math.PI)

//Define map projection
var projection = d3.geo.mercator()
    .center([-73.9, 40.730610,])
    .scale(44900)
    .translate([w2 / 2, h / 2]);

var path = d3.geo.path()
            .projection(projection);

//Create SVG element
var svg2 = d3.select("#vis2")
.append("svg")
.attr("width", w2)
.attr("height", h)
    .attr("class", "map")
.append("g");

// Functions
function bind() {

    d3.json("res/data/nyc.geojson", function(json) {

        //Bind data and create one path per GeoJSON feature
        svg2.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", findColor)
            .style("opacity", heatMap)
            .attr("stroke", "black")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", click);
    });
}

function click(d) {
    console.log(this);
    console.log(d.properties.borough);
    d3.select("#bar").html("");
    plotForZip(d.properties.postalCode);
}

// https://bl.ocks.org/john-guerra/43c7656821069d00dcbc
function findColor(d) {
    //console.log(d);
    if (d.properties.borough == "Queens") {
        return "#800000";
    }
    else if (d.properties.borough == "Bronx") {
        return "#ff3300";
    }
    else if (d.properties.borough == "Staten Island") {
        return "#cc0000";
    }
    else if (d.properties.borough == "Brooklyn") {
        return "#ff8000";
    }
    else if (d.properties.borough == "Manhattan") {
        return "#df9f9f";
    }
}

bind();

function mouseover(d){
    // Highlight hovered province
    d3.select(this).style('fill', '#ffffff');
    d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 30) + "px")
                    .style("top", (d3.event.pageY + 10) + "px")
                    .style("opacity", 1)
                    .html("<center><b><u>"+ d.properties.borough + "</b></u><br>" + d.properties.PO_NAME
                          + "<br> Zip code: " + d.properties.postalCode);

    d3.select("#tooltip")
                    .classed("hidden", false);

    console.log("Zip code: " + d.properties.postalCode)
}

function mouseout(d) {
    d3.select(this).style('fill', findColor)
    d3.select("#tooltip")
                    .classed("hidden", true);
}

// Read file for three types of complaint categories
var graphMove;

d3.csv("../res/data/graphMove.csv", function(data) {
    graphMove = data;
})

// Scaling
var xScale = d3.scale.pow().exponent(0.65)
                .domain([0, 17224.0])
                .range([0, 1]);

// Opacity
function heatMap(d) {

    var totalSum = 1132525;
    var sanitationSum = 303740;
    var foodSum = 17061;
    var homelessSum = 56265;
    var neighborhoodSum = 241805;
    var noiseSum = 513654;
    var opacity;
        
    for (i = 0; i < graphMove.length; i++) { 
        if (d.properties.postalCode == graphMove[i].ZipCode) {
            totalForThisInstance = parseFloat(graphMove[i].Sanitation)+parseFloat(graphMove[i].Food)+parseFloat(graphMove[i].Homeless)+parseFloat(graphMove[i].Noise)+parseFloat(graphMove[i].Neighbourhood);
            opacity = xScale(totalForThisInstance);
            console.log(opacity)
        } 
    }
    if(opacity > 1)
        opacity = 1;
    return opacity;
}

// Zooming functionality, http://mtaptich.github.io/d3-lessons/d3-maps/
var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            // Using d3 mouse events, dynamically update translation and scale.
            svg2.selectAll("path").attr("transform","translate("+
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            console.log("Zooming")
      });

svg2.call(zoom);
