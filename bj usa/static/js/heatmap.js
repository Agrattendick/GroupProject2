var myMap = L.map("map", {
  center: [40.7, -94.5],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var link = "\static\\data\\ufomap2.geojson";

d3.json(link, function(response) {

  // console.log(response.features[0].properties);
  var dataset = response.features;

  var heatArray = [];

  for (var i = 0; i < dataset.length; i++) {
    var location = dataset[i].properties;

    if (location) {
      heatArray.push([location.latitude, location.longitude]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 40,
    blur: 5
  }).addTo(myMap);

});

var link2 = "\static\\data\\icecream.geojson";

d3.json(link2, function(response) {

  var dataset2 = response.features;
  console.log(dataset2[0].geometry.coordinates);

  for (var i = 0; i < dataset2.length; i++) {
    var location = dataset2[i].geometry;
    // console.log(location);
    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }

});
