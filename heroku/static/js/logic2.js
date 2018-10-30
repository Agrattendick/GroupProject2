// Creating map object

// d3.json(`/states`).then(function(data) {
//     // console.log(data.store_count);
// }
// )
var geojson;
var info_link = "/states";
var State_murder = {};
geojson = d3.json(info_link, function(data){
    // console.log(data);
    data.map(d=>{
        
        State_murder[d["state_name"]]= d["murders"];
     })
    });
console.log(State_murder);
var State_store = {};
geojson = d3.json(info_link, function(data){
    // console.log(data);
    data.map(d=>{
        
        State_store[d["state_name"]]= d["ben_jerry_locations"];
     })
    });

var State_ufo = {};
geojson = d3.json(info_link, function(data){
    // console.log(data);
    data.map(d=>{
        
        State_ufo[d["state_name"]]= d["ufo_sightings"];
        })
    });




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
  
  
 


    
  var low = ["Utah","Vermont","Nebraska","Minnesota","Rhode Island","Idaho","Maine","North Dakota","New Hampshire"];
  var med_low = ["Colorado","Montana","New Jersey","Washington","Wisconsin","Iowa", "South Dakota","Connecticut","New York","Hawaii","Wyoming","Massachusetts","Oregon"];
  var med = ["Arizona","Deleware","Florida","Indiana","Kansas","Kentucky","Michigan","North Carolina","Pennsylvania","Virginia","California","Texas","West Virginia"];
  var med_high = ["Illinois", "New Mexico","Tennessee","Georgia","Ohio","Oklahoma", "South Carolina"];
  var high = ["Louisiana", "Nevada","Missouri","Maryland","Alaska","Alabama","Arkansas","Misssisssppi",];

  
  
  // Function that will determine the color of a neighborhood based on the borough it belongs to
  function chooseColor(d) {
      
    switch (d){
     case high[high.indexOf(d)] :
        return "darkred";
        case med_high[med_high.indexOf(d)]:
        return "red";
        case med[med.indexOf(d)]:
        return "orange";
        case med_low[med_low.indexOf(d)]:
        return "yellow";
        default:
        return "green";
}};
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// d3.json(`/states`).then(function(data) {

    info.update = function (props) {
        
        this._div.innerHTML =  (props ?
            '<b>' + props.NAME + '</b><br /> '+ State_murder[props.NAME] +' Murder_count <br> ' + State_store[props.NAME] + ' Store Count <br>' + State_ufo[props.NAME] + ' Ufo Sightings'
            : 'Hover over a state');
    };
// });
info.addTo(map);


function style(feature) {
    // console.log(feature);
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