// Creating map object
var map = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3,
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "\static\\data\\states.json";




var Republican = ["Alaska", "Idaho", "Utah", "Arizona", "Montana", "Wyoming", "North Dakota", "South Dakota",
 "Nebraska", "Kansas", "Oklahoma", "Texas", "Iowa","Missouri", "Arkansas","Louisiana","Wisconsin","Michigan"
 ,"Indiana","Kentucky","Tennessee","Mississippi", "Alabama", "Ohio","Georgia","Florida","South Carolina","North Dakota",
 "West Virginia","Pennsylvania"];


// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(state) {
  switch (state) {
  case Republican[Republican.indexOf(state)]:
    return "red";
  case "Covenant Blu-Grand Center":
    return "red";
  case "The Ville":
    return "green";
  case "Oarondelet Park":
    return "purple";
  default:
    return "blue";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.NAME),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.NAME + "</h1> <hr> <h2>" + "</h2>");

    }
  }).addTo(map);
});

