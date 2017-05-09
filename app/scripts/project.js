//Code for plotting map
var w2 = 600;
var h = 500;
var scale = ((w2-1) / 2 / Math.PI)
var rScale;
var color2 = ['pink', 'Brown', 'Red', 'Orange','Yellow', 'Green', 'Blue', 'Violet', 'Grey','black' ];


//Define map projection
var projection = d3.geo.mercator()
    .center([-73.9, 40.730610,])
    .scale(44900)
    .translate([w2 / 2, h / 2]);

var path = d3.geo.path()
            .projection(projection);

//Create SVG element
var svg1 = d3.select("#vis1")
.append("svg")
.attr("width", w2)
.attr("height", h)
.append("g");

//Create SVG element
var svg2 = d3.select("#vis2")
.append("svg")
.attr("width", w2)
.attr("height", h)
.append("g");

//Create SVG element
var svg4 = d3.select("#vis4")
.append("svg")
.attr("width", 800)
.attr("height", h)
.append("g");

//Create SVG element
var svg5 = d3.select("#vis5")
.append("svg")
.attr("width", w2)
.attr("height", h)
    .attr("class", "map")
.append("g");

// Functions
function bind() {

    d3.json("res/data/nyc.geojson", function(json) {

        //Bind data and create one path per GeoJSON feature
        svg1.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", 'steelblue')
            .style( "opacity", 0.5)
            .attr("stroke", "black")

            //Bind data and create one path per GeoJSON feature
          svg2.selectAll("path")
              .data(json.features)
              .enter()
              .append("path")
              .attr("d", path)
              .style("fill", 'steelblue')
              .style( "opacity", 0.5)
              .attr("stroke", "black")

            //Bind data and create one path per GeoJSON feature
        svg4.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", 'steelblue')
                .style( "opacity", 0.5)
                .attr("stroke", "black")

        //Bind data and create one path per GeoJSON feature
        svg5.selectAll("path")
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
    setTimeout(myFunction, 500); // So dots overlay map
}

function myFunction(){

  d3.csv("res/data/graphKm.csv", function(data) {

				testData1 = data;
				//console.log(testData1)

        // Create points
        svg1.selectAll("circle")
            .data(testData1)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            })
            .attr("r", function(d) {
                return 4;
            })
            .attr("stroke", function(d) {
                return "black";

            })
            .style("fill", function(d) {
                return color2[parseInt(d["k10"])];
            })
						.on("mouseover", function(d) {
						 //Update the tooltip position and value
							 d3.select("#tooltip5")
							 .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>CLUSTER: </strong>" + d.k10)})

							.on("mouseout", function() {
									 //Hide the tooltip
									 d3.select("#tooltip5")
									 .html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>CLUSTER: </strong>")
								 });
    });

    d3.csv("res/data/graphInc.csv", function(data) {
          testData2 = data;

          // Create points
          svg2.selectAll("circle")
              .data(testData2)
              .enter()
              .append("circle")
              .attr("cx", function(d) {
                  return projection([d.LON, d.LAT])[0];
              })
              .attr("cy", function(d) {
                  return projection([d.LON, d.LAT])[1];
              })
              .attr("r", function(d) {
                  return 4;
              })
              .attr("stroke", function(d) {
                  return "black";

              })
              .style("fill", function(d) {
                  return color2[parseInt(d["k10"])];
              })
							.on("mouseover", function(d) {
						   //Update the tooltip position and value
						     d3.select("#tooltip5")
						     .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>CLUSTER: </strong>" + d.k10)})

						    .on("mouseout", function() {
						         //Hide the tooltip
						         d3.select("#tooltip5")
						         .html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>CLUSTER: </strong>")
						       });
      });


			d3.csv("res/data/graphMove.csv", function(data) {
	          testData4 = data;

						// Set scales for each of the Specific complaints
						rScale1 = d3.scale.linear()
		            .domain([0, d3.max(data, function(d) {
		                return d.Noise;
		            })])
		            .range([5, 20]);

						rScale2 = d3.scale.linear()
				          .domain([0, d3.max(data, function(d) {
				            return d.Neighbourhood;
				         })])
				         .range([5, 20]);
 						rScale3 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
								 		return d.Food;
								 })])
								 	.range([5, 20]);

						rScale4 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
								 			return d.Homeless;
								 	})])
								 		.range([5, 20]);

						rScale5 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
									 			return d.Sanitation;
									 	})])
								 		.range([5, 20]);

	          // Create points
	          svg4.selectAll("circle")
	              .data(testData4)
	              .enter()
	              .append("circle")
	              .attr("cx", function(d) {
	                  return projection([d.LON, d.LAT])[0];
										})
	              .attr("cy", function(d) {
	                  return projection([d.LON, d.LAT])[1];
	              })
	              .attr("r", function(d) {
	                  return Math.sqrt(rScale1(d.Noise));
	              })
	              .attr("stroke", function(d) {
	                  return "black";

	              })
	              .style("fill", function(d) {
	                  return color2[4];
									 //return 'blue';
	              })
								.on("mouseover", function(d) {
							   //Update the tooltip position and value
							     d3.select("#tooltip3")
							     .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>COMPLAINTS: </strong>" + d.Noise)})

							 .on("mouseout", function() {
							         //Hide the tooltip
							    d3.select("#tooltip3").html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>COMPLAINTS: </strong>" );
							       });

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
            svg5.selectAll("path").attr("transform","translate("+
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            console.log("Zooming")
      });

svg5.call(zoom);
