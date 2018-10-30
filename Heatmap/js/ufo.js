var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxpaHVtZXMiLCJhIjoiY2pudHUxd3kyMDM0bDNzb2lwaWtqc2lvYyJ9.rFFO9unfOUpBZ6Z5sfSq3g", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
 
d3.json("ufomap2.geojson", function(data) {
  function plotData(data){

    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);

      },
      coords = [], //define an array to store coordinates
      onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
               layer.bindPopup(feature.properties.datetime);
               coords.push(feature.geometry.coordinates);
      },
      coordsToLatLng: function (coords) {
      return new L.heatLayer(coords);
      }

    }).addTo(map);
  }});
