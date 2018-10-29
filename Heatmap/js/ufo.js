var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 13
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxpaHVtZXMiLCJhIjoiY2pudHUxd3kyMDM0bDNzb2lwaWtqc2lvYyJ9.rFFO9unfOUpBZ6Z5sfSq3g", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var geojsonLayer = new L.GeoJSON.AJAX("ufomap.geojson");       
geojsonLayer.addTo(map);



//var newtry = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=Ben%20and%20Jerry%27s+in+AL&key=AIzaSyAav9-7IXlau7ObnUrVHerk39REwQzNvHI";

d3.json(geojsonLayer, function(response) {

  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var geometry = response[i].geometry;

    if (geometry) {
      L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(myMap);
    }
  }

});
