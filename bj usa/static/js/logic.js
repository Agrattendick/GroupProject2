
//create two VAR with different tile layers, and add them to basemaps
var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var grayscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var baseMaps = {
  "Grayscale": grayscale,
  "Streets": streets
};

//create two new layergroups
var techtonics = new L.LayerGroup();
var quakesites = new L.LayerGroup();

//define techtonics lines and L.geoJson(data).addTo('layergroup').  have to have the addTo
//strung together with the L.geoJson, and that can be save in VAR.  do same for quakes
var techLink = "/data/states.json";

var faultLines = d3.json(techLink, function(data) {
  L.geoJson(data, {
  }).addTo(techtonics);
});

// var earthquakes = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
//         plotData(data);        
// });

//create map VAR with three layers
var map = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3,
  layers: [streets, techtonics]
});

//set overlays and the text that appears on screeen
var overlayMaps = {
  "Fault Lines": techtonics,
  "Earthquakes" : quakesites
};

//plotdata is called be d3.json func, and it is here that we use L.geoJson to addTo(layergroup)
function plotData(data){

  L.geoJson(data,
      {
        //create circle
        pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng);
      }, 
      //define circle style
      style: plotStyles,
      //on each circle, bind popup with unique info
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " 
        + feature.properties.place);
      }
      //add to layergroup
    }).addTo(quakesites);

//returns values for L.circlemaker including color and radius
function plotStyles(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    radius: (getMagnitude(feature.properties.mag)*4),
    stroke: true,
    weight: 0.5,
  };
}

//get magnitude for radius calculation.  if radius was set to 0, circle became large, so set radius very small
function getMagnitude(mag) {
  if (mag === 0) {return .001;}
  else {return (mag);}
}

//define color scale
function getColor(mag) {
  if (mag <= 1) {color = "LawnGreen";}
  else if (mag<=2) {color = "yellow";}
  else if (mag<=3) {color = "gold";}
  else if (mag<=4) {color = "orange";}
  else if (mag<=5) {color = "orangered"}
  else {color = "red";}
  return color;
  
}

//define placement of legend
var info = L.control({
  position: "bottomright"
 });

//
info.onAdd = function(map){
  var div = L.DomUtil.create("div", "info legend"),
  grades = [0, 1, 2, 3, 4, 5],
  labels = [];

  //create <i style ="background: colorchoice"> with text of current grade[]
  // then in there is another grade to follow (grade[i+1] is true) add dash and grade[i+1] and break
  //otherwise add +
  for (var i =0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
  }

  return div;
};

// info.addTo(map);
};

//make control box for layers and add to map
L.control.layers(baseMaps, overlayMaps).addTo(map);