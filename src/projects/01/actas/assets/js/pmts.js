var map, featureList, PMTPoiSearch = [], PMTPolSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(PMTPoi.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});


$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {

  $("#map").css("grid-area") == "1 / 2 / 2 / 3" ?
   $("#map").css("grid-area", "1 / 1 / 2 / 3") :
   $("#map").css("grid-area", "1 / 2 / 2 / 3");



  $("#sidebar").animate({
    width: "toggle",
   

  }, 350, function() {
       
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  // $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}


function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through PMTPoi layer and add only features which are in the map bounds */

  PMTPoi.eachLayer(function (layer) {
    if (map.hasLayer(PMTPoiLayer)) {

      if (map.getBounds()) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="../assets/img/pmtPoint.png"></td><td class="feature-name">' + layer.feature.properties.PMT + " " +  layer.feature.properties.TYPE +  '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  }

);

PMTPol.eachLayer(function (layer) {
  if (map.hasLayer(PMTPolLayer)) {
    if (map.getBounds()) {

      // Si la capa es un polígono, obtenemos el centroide
      var center = layer.getBounds().getCenter();
      console.log(center);
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          center.lat +
          '" lng="' +
          center.lng +
          '">' +
          '<td style="vertical-align: middle;">' +
          '<img width="16" height="18" src="../assets/img/pmtPoint.png">' +
          "</td>" +
          '<td class="feature-name">' +
          layer.feature.properties.PMT + " " +
          layer.feature.properties.TYPE +
          "</td>" +
          '<td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td>' +
          "</tr>"
      );
    }
  }
});


  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });


}


function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 8, // Adjust these styles as needed
    color: "rgb(7, 224, 249)", // Change the color to your highlight color
  });
}


//! 
function highlightFunction(layer, geoJson, layerName) {

  layer.on({
    mouseover: (e) => {
      highlightFeature(e);

      info.update(layer.feature.properties, layerName, true);
    },
    mouseout: (e) => {
   
      geoJson.resetStyle(e.target);
      info.update(layer.feature.properties, layerName, false);
    },
  });



}

var info = L.control({
  position: "bottomleft",
});

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (properties, layer, mousePos) {
  console.log(layer);
  this._div.innerHTML = "<h4>Properties</h4>";



  if (!mousePos) {
    this._div.innerHTML += ` 'Hover over a feature'`;
  } else {

    if (properties) {

      
      htmlInfo = { 
                   "privateLands" : `TYPE: Private Land<br> 
                                     ID:  ${properties.Name}<br>
                                     CHIP: ${properties.CHIP}<br>
                                     AREA: ${properties.AREA} M2<br>
                                     OBS: ${properties.OBS}<br>
                                     `,
                   "publicLands" :  `TYPE: Public Land<br> 
                                     ID:  ${properties.Name}<br>
                                     CHIP: ${properties.CHIP}<br>
                                     AREA: ${properties.AREA} M2<br>
                                     `,
                   "BICS"         :    `
                                     FIC_NUMBER:  ${properties.NUMERO_FIC}<br>
                                     NAME: ${properties.NOMBRE}<br>
                                     ADRESS: ${properties.DIRECCION}<br>
                                     
                                     `,                
              
                  }

                          


                this._div.innerHTML += htmlInfo[layer]
    } else {
      this._div.innerHTML += ` 'Hover over a feature`;
    }

  

  }
};



/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

  var cartoColor = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    {
      maxZoom: 23,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    }
  );

var usgsImagery = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 24,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});



/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};



var lineColor = { central: "blue", bor: "red", 3: "#90857A", 4: "#969696", 5: "#0055aa",6: "#ffff00", 7: "#ce06cb",};

  var munCFROColors = { 1: "#976900", 2: "#ce06cb", 3: "#90857A", 4: "#969696", 5: "#0055aa",6: "#ffff00", 7: "#ce06cb",};

  var munCFRO = L.geoJson(null, {
    style: function (feature) {
      return {
        color: munCFROColors[feature.properties.OBJECTID_1],
        weight: 3,
        opacity: 1,
        dashArray: "2, 2",
        fillOpacity: 0.01,
        clickable: false,
      };
    },
    onEachFeature: function (feature, layer) {
      var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: "my-label-class",
          html: feature.properties.MpNombre,
        }),
      }).addTo(map);
    },
  });
 $.getJSON("../data/munCFRO.geojson", function (data) { munCFRO.addData(data);});


var projectLine = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "red",
        weight: 2,
        fillColor: 'none',
        opacity: 1,
        dashArray: "5, 5",
      };
  },
  onEachFeature: function (feature, layer) {
  }
});
$.getJSON("../data/projectLine.geojson", function (data) {
  projectLine.addData(data);
});


var desings = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'black',
        weight: 2,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
  }
});
$.getJSON("../data/desings.geojson", function (data) {
  desings.addData(data);
});



var PMTPolLayer = L.geoJson(null);
var PMTPol = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'gray',
        weight: 3,
        opacity: 1
      };
  },
    onEachFeature: function (feature, layer) {
    if (feature.properties) {
  
      layer.on({
        click: function (e) {
          // $("#feature-title").html(feature.properties.NAME);
          // $("#feature-info").html(content);
          // $("#featureModal").modal("show");
          
          // display propreties


  const imagesDiv = document.getElementById('images');
imagesDiv.innerHTML = `
  <h3 style="margin-bottom: 10px;">${feature.properties.PMT}</h3>
  <h4 style="margin-bottom: 10px;">${feature.properties.TYPE}</h4>
<h4 style="margin-bottom: 10px;">${feature.properties.name}</h4>
<h4 style="margin-bottom: 10px;">Descripcion:</h4>
<h4 style="margin-bottom: 10px;">${feature.properties.descriptio}</h4>
<h4 style="margin-bottom: 10px;">
  <a href="${feature.properties.BIMUrl}" target="_blank" style="text-decoration: none; color: blue;">
    Documentacion
  </a>
</h4>


`;
    

          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });

      // search feature
    
    }
  }
}
);



$.getJSON("../data/PMTPol.geojson", function (data) {
  PMTPol.addData(data);
  PMTPolLayer.addLayer(PMTPol);
});


var publicLands = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'rgba(25, 189, 229, 1)',
        weight: 3,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, publicLands, "publicLands")
  },
}
);
$.getJSON("../data/publicLands.geojson", function (data) {
  publicLands.addData(data);
});

// var privateLands = L.geoJson(null, {
//   style: function (feature) {
//       return {
//         color: 'rgba(255, 165, 0, 1)',
//         weight: 3,
//         opacity: 1
//       };
//   },  
//   onEachFeature: function (feature, layer) {
//     highlightFunction(layer, privateLands, "privateLands")
//   },
// }
// );
// $.getJSON("../data/privateLands.geojson", function (data) {
//   privateLands.addData(data);
// });


var BICS = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'red',
        weight: 3,
        opacity: 1
      };
  },  
  onEachFeature: function (feature, layer) {
   
    highlightFunction(layer, BICS, 'BICS')
   

  },
}
);
$.getJSON("../data/BICS.geojson", function (data) {
  BICS.addData(data);
});



/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});


// https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=4.658578,-74.061022


/* Empty layer placeholder to add to layer control for listening when to add/remove PMTPoi to markerClusters layer */
var PMTPoiLayer = L.geoJson(null);

var PMTPoi = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "../assets/img/pmtPoint.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      // console.log(feature.geometry.coordinates[1] + "-" + feature.geometry.coordinates[0]);
      totalLands = feature.properties.PUBLIC*1+feature.properties.PRIVATE*1 
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
      content += "<tr><th>Name</th><td>" + feature.properties.PMT + "</td></tr>" 
      content += "<tr><th>PKS</th><td>" + feature.properties.PKS + "</td></tr>" 
      content += "<tr><th>PKS</th><td><img src='../../assets/img/1/1.jpg' alt='Descripción' width='100'></td></tr>" 

      // content += "<tr><th>Private Lands</th><td>" + feature.properties.PRIVATE + "</td></tr>" 
      // content += "<tr><th>Total Lands</th><td>" + totalLands + "</td></tr>";
      // content += "<tr><th>Sector Area</th><td>" + feature.properties.Area.toFixed(2) + " M2</td></tr>";
      content += `<tr><th>Street View</th><td><a href='https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}' target='_blank'>Go to</a><td></tr>`;
      content += "<table>";

      layer.on({
        click: function (e) {
          // $("#feature-title").html(feature.properties.NAME);
          // $("#feature-info").html(content);
          // $("#featureModal").modal("show");
          
          // display propreties


  const imagesDiv = document.getElementById('images');
imagesDiv.innerHTML = `
  <h3 style="margin-bottom: 10px;">${feature.properties.PMT}</h3>
  <h4 style="margin-bottom: 10px;">${feature.properties.TYPE}</h4>
<h4 style="margin-bottom: 10px;">${feature.properties.name}</h4>
<h4 style="margin-bottom: 10px;">Descripcion:</h4>
<h4 style="margin-bottom: 10px;">${feature.properties.descriptio}</h4>
<h4 style="margin-bottom: 10px;">
  <a href="${feature.properties.BIMUrl}" target="_blank" style="text-decoration: none; color: blue;">
    Documentacion
  </a>
</h4>



`;
    

          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });

      // search feature
          $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="../assets/img/pmtPoint.png"></td><td class="feature-name">' + layer.feature.properties.name +" aqui"+layer.feature.properties.TYPE + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      PMTPoiSearch.push({
        name: layer.feature.properties.PMT,
        address: layer.feature.properties.ADDRESS1,
        source: "PMTPoi",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("../data/PMTPoi.geojson", function (data) {
  PMTPoi.addData(data);
  map.addLayer(PMTPoiLayer);
});



var pks = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({ html: "<div style='font-size: 1px' class='my-icon'>pks</div>", className: "custom-icon-pk", })
    });
  },
});


$.getJSON("../data/pks.geojson", function (data) {
  pks.addData(data);
  
});






//!---------------------------------MAP ON -------------------------------

map = L.map("map", {
  minZoom: 1,
    maxZoom: 22,
  zoom: 13,
  center: [4.7099, -74.2536],
  layers: [cartoLight, markerClusters, highlight, projectLine, pks, munCFRO],
  zoomControl: false,
  attributionControl: false
});

//!---------------------------------MAP ON -------------------------------


//! INFO PROPERTIES FUNCTION


// info.addTo(map);


function labelSet (getData,labelData) {$.getJSON(getData, function (data) {
  data.features.forEach(function (feature) {
    var polygon = L.geoJson(feature.geometry);
    var centroid = polygon.getBounds().getCenter();
    var marker = L.marker([centroid.lat, centroid.lng], {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.PMT,
      }),
    });
    labelData.addLayer(marker);
  });
});
}


var sectorsPol = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'rgba(70, 0, 234, 1)',
        weight: 3,
        fillColor: 'none',
        opacity: 1,
        dashArray: "10, 10",
      };
  },
}
);
$.getJSON("../data/PMTPoi.geojson", function (data) {
  sectorsPol.addData(data);
});

var labelSectorsPol = L.layerGroup();
labelSet("../data/PMTPoi.geojson",labelSectorsPol)


var WorkArea = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'rgba(229, 161, 25, 1)',
        weight: 3,
        fillColor: 'none',
        opacity: 1,
        dashArray: "10, 10",
      };
  },
}
);
$.getJSON("../data/WorkArea.geojson", function (data) {
  WorkArea.addData(data);
});


var zmpa = L.geoJson(null, {
  style: function (feature) {
      return {
        color: 'rgba(255, 165, 222, 1)',
        weight: 3,
        fillColor: 'none',
        opacity: 1,
        dashArray: "10, 10",
      };
  },
}
);
$.getJSON("../data/zmpa.geojson", function (data) {
  zmpa.addData(data);
});








// desings.addTo(map);
// privateLands.addTo(map);
// publicLands.addTo(map);
/* Layer control listeners that allow for a single markerClusters layer */

map.on("zoomend", function () {
  pks.eachLayer(function (layer) {
    var zoom = map.getZoom();
    iconClass = "custom-icon-pk";
    let zoomArray = (zooma) => {
      // console.log(zoom)
      zoomArrayO = {
        22: 20,
        21: 18,
        20: 15,
        19: 13,
        18: 10,
        17: 10,
        16: 9,
        15: 8,
        14: 8,
        13: 2,
        12: 2,
        11: 2,
        10: 2,
      };
      return (zoom >= 10) ?  zoomArrayO[zooma] : 1        
    }

    angle = layer.feature.properties.Angle
  
    layer.setIcon(
      
      L.divIcon({
        html: `<div style='font-size: ${zoomArray(
          zoom
        )}px;  transform: rotate(${
          angle 
        }deg)'>${layer.feature.properties.Text}</div>`,
        className: iconClass,
      })
    );
  });
});


map.on("overlayadd", function(e) {
  if (e.layer === PMTPoiLayer) {
    // console.log(e.layer);
    markerClusters.addLayer(PMTPoi);
    map.addLayer(labelSectorsPol);
    map.addLayer(PMTPol);
    
    syncSidebar();
  }
  // if (e.layer === museumLayer) {
  //   markerClusters.addLayer(museums);
  //   syncSidebar();
  // }
});

map.on("overlayremove", function(e) {

console.log(e.layer);

  if (e.layer === PMTPoiLayer) {

   
    markerClusters.removeLayer(PMTPoi);
    // map.removeLayer(sectorsPol);
    map.removeLayer(PMTPol);
    
    // sectorsPol.addTo(map)
    map.removeLayer(labelSectorsPol);
    syncSidebar();
  }
  
  // if (e.layer === museumLayer) {
  //   markerClusters.removeLayer(museums);
  //   syncSidebar();
  // }
});



map.on("zoomend", function () {
  var zoomMap = map.getZoom();
  console.log(zoomMap);
  if (map.hasLayer(PMTPoiLayer)) {
    if (zoomMap >= 15) {
      // map.addLayer(sectorsPol);
      map.addLayer(labelSectorsPol);
      // map.removeLayer(PMTPoiLayer);
    } else {
      map.addLayer(markerClusters);
      // map.removeLayer(sectorsPol);
      map.removeLayer(labelSectorsPol);
    }
  } else {
    
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='https://www.linkedin.com/in/juan-carlos-mu%C3%B1oz-casta%C3%B1eda-b147b36b/' target='_blank'>Juan Munoz</a> | </span>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,
  "Color Map": cartoColor,
  "Google Imagery": usgsImagery
};

var groupedOverlays = {
  "Layers": {
    "<img src='../assets/img/pmtPoint.png' width='25' height='25'> PMTs": PMTPoiLayer,
    // "<img src='../assets/img/pmtPoint.png' width='25' height='25'> PMTs Sectoriales": PMTPolLayer,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 3px dashed  rgb(255, 165, 25) ;"></span> &nbsp;Work Areas Enlarged': WorkArea,
    // "<img src='../assets/img/museum.png' width='24' height='28'>&nbsp;Private Lands": museumLayer,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 10px solid rgb(25, 189, 229) ;"></span> &nbsp;Public Lands': publicLands,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 10px solid rgb(255, 165, 0) ;"></span> &nbsp;Private Lands': privateLands,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 10px solid red ;"></span> &nbsp;BICS': BICS,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 10px solid rgb(255, 165, 222) ;"></span> &nbsp;ZMPA': zmpa,
    
  },
  "Reference": {
    
    '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 3px dashed red ;"></span> &nbsp;Project Line': projectLine,
    // '<span class="rectangle" style="display: inline-block; width: 20px; height: 10px; border-bottom: 3px solid black ;"></span> &nbsp;Preliminar Desings': desings,
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  map.fitBounds(PMTPoi.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});


  var PMTPoiBH = new Bloodhound({
    name: "Work Space",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: PMTPoiSearch,
    limit: 10
  });

  // var museumsBH = new Bloodhound({
  //   name: "Museums",
  //   datumTokenizer: function (d) {
  //     return Bloodhound.tokenizers.whitespace(d.name);
  //   },
  //   queryTokenizer: Bloodhound.tokenizers.whitespace,
  //   local: museumSearch,
  //   limit: 10
  // });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });

  PMTPoiBH.initialize();
  // museumsBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "PMTPoi",
    displayKey: "name",
    source: PMTPoiBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='../assets/img/pmtPoint.png' width='24' height='28'>&nbsp;PMT</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }).on("typeahead:selected", function (obj, datum) {
   
    if (datum.source === "PMTPoi") {
      if (!map.hasLayer(PMTPoiLayer)) {
        map.addLayer(PMTPoiLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    // if (datum.source === "Museums") {
    //   if (!map.hasLayer(museumLayer)) {
    //     map.addLayer(museumLayer);
    //   }
    //   map.setView([datum.lat, datum.lng], 17);
    //   if (map._layers[datum.id]) {
    //     map._layers[datum.id].fire("click");
    //   }
    // }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
