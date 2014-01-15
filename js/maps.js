
processGymData();

var width = 960,
    height = 500,
    svg = {},
    projection = {};

$('body').on('click', '.symbol.NY', function(){
  console.log("clicked");
  window.projection = drawNYCMap();
  graphPoints(projection);
});


var projection = drawUSMap();
graphPoints(projection);

function processGymData() {
  $.each(gymJson, function(){
    console.log(this);
    var coordinates = this["Lat/Long"].split(',');
    this.coordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
  });
  console.log(gymJson);
}

function createSvg(){
  d3.select("svg").remove();
  svg = d3.select("body").append("svg");
}

/*
 * Draws a US contintental map
 */
function drawUSMap(){
  createSvg();
  projection = d3.geo.albersUsa();

  var path = d3.geo.path()
    .projection(projection);

  svg.append("path")
    .attr("class", "states")
    .datum(topojson.feature(usJson, usJson.objects.states))
    .attr("d", path);

  return projection;
}

function drawNYCMap(){
  createSvg();
  var projection = d3.geo.mercator()
            .center([-73.94, 40.70])
            .scale(50000)
            .translate([(width) / 2, (height)/2]);

  var path = d3.geo.path()
      .projection(projection);

  var g = svg.append("g");

  g.append("g")
    .attr("id", "boroughs")
    .selectAll(".state")
    .data(nycJson.features)
    .enter().append("path")
    .attr("class", function(d){ return d.properties.name; })
    .attr("d", path);

  return projection;
}


/*
 * graphs points current just gym data
 */ 
function graphPoints(projection) {
  svg.selectAll("circles.symbol")
    .data(gymJson)
    .enter()
    .append("circle")
    .attr('class', "symbol")
    .attr('class', function(d){
      return "symbol " + d.State.replace(/\s/g, '');
    })
    .attr("r" , 5)
    .attr('title', function(d){ return d.Name})
    .attr('data-company', function(d){ return d.Name})
    .attr('data-address', function(d){ return d.City + ", " + d.State}) 
    .attr('data-coordinates', function(d){ return d.coordinates})
    .attr("transform", function(d) {
      return "translate(" + projection([d["coordinates"][1],d["coordinates"][0]]) + ")";});
}