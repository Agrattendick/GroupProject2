// Creating map object
var map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 4,
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
    default:
      return "blue";
    }
  }





var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML =  (props ?
        '<b>' + props.NAME + '</b><br /> Ben & Jerry Count <br> ufo_count <br> Murder_count '
        : 'Hover over a state');
};

info.addTo(map);


function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: chooseColor(feature.properties.NAME)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: 'yellow',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: "white",
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = d3.json(link, function(data) {
    L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
})
// map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');