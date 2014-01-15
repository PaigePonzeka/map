// TODO https://github.com/Leaflet/Leaflet.markercluster


var apiKey = '0365226f2baa4b7394aff4ac294b4652',
cloudmadeUrl = 'http://{s}.tile.cloudmade.com/'+ apiKey +'/{styleId}/256/{z}/{x}/{y}.png',
minimal   = L.tileLayer(cloudmadeUrl, {styleId: 22677});

var map = L.map('map', {
  center: new L.LatLng(39, -96),
  zoom: 4,
  layers: [minimal]
});
// creating the map
/*L.tileLayer('http://{s}.tile.cloudmade.com/' + apiKey +'/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);*/
// drawing the state lines 
L.geoJson(statesData, {
   // onEachFeature: onEachFeature
}).addTo(map);

plotGymData();


function plotGymData() {
  //var markers = new L.MarkerClusterGroup();
  $.each(gymJson, function(){
    var coordinates = this["Lat/Long"].split(',');
    this.coordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
    console.log(this);
    console.log('there');
    console.log(this.coordinates);
    console.log("here 1");
    if(this.coordinates){
      console.log("here 2");
      console.log(this.coordinates[0])
      var m = L.Marker(new L.LatLng(this.coordinates[1], this.coordinates[0]));
      console.log("here 3");
      //markers.addLayer(m);
      var circle = L.circle([this.coordinates[0], this.coordinates[1]], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
    }
    
    
    /*var circle = L.circle([coordinates[0], coordinates[1]], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);*/
  });
  //map.addLayer(markers);
}

/*
var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);
*/
/*function onEachFeature(feature, layer) {
    layer.on({
        //mouseover: highlightFeature,
        click: zoomToFeature
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}*/