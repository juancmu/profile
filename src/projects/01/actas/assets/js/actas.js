var map, featureList, actasSearch = [], allActasRecords = [], currentTableMatches = [];

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
  if (actas && actas.getLayers().length > 0) {
    map.fitBounds(actas.getBounds());
  }
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
  if (Date.now() - lastActaClickTime < 500) {
    return;
  }
  highlight.clearLayers();
}

var lastActaClickTime = 0;

function showActaHighlight(newFolder, lat, lng) {
  lastActaClickTime = Date.now();
  highlight.clearLayers();

  if (!isNaN(lat) && !isNaN(lng)) {
    highlight.addLayer(L.circleMarker([lat, lng], highlightStyle));

    var labelMarker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "acta-map-label",
        html: '<div class="acta-map-label-content">' + (newFolder || "Acta") + '</div>',
        iconSize: [0, 0],
        iconAnchor: [-16, 12]
      }),
      zIndexOffset: 10000,
      interactive: false
    });
    highlight.addLayer(labelMarker);
  }
}

function sidebarClick(id) {
  if (!map.hasLayer(actasLayer)) {
    map.addLayer(actasLayer);
  }
  var layer = markerClusters.getLayer(id) || map._layers[id] || (actas ? actas.getLayer(id) : null);
  if (layer && layer.getLatLng) {
    lastActaClickTime = Date.now();
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 20);
    var p = (layer.feature && layer.feature.properties) || {};
    var folderName = p.NEW_FOLDER || p.CODIGO_ACT || "Acta";
    showActaHighlight(folderName, layer.getLatLng().lat, layer.getLatLng().lng);
    layer.fire("click", null, false);
  }
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}


function getProperty(props, keyName) {
  if (!props) return "";
  if (props[keyName] !== undefined && props[keyName] !== null) return props[keyName];
  var prefix = keyName.substring(0, 4).toUpperCase();
  for (var k of Object.keys(props)) {
    if (k.toUpperCase().startsWith(prefix)) return props[k];
  }
  return "";
}

function normalizeMunicipio(mun) {
  if (!mun) return "";
  var m = String(mun).trim().toUpperCase();
  if (
    m === "BOGOTA" ||
    m === "BOGOTÁ" ||
    m === "TEUSAQUILLO" ||
    m === "MARTIRES" ||
    m === "MÁRTIRES" ||
    m === "FONTIBON" ||
    m === "FONTIBÓN" ||
    m === "PUENTE ARANDA" ||
    m === "PUENTE_ARANDA"
  ) {
    return "BOGOTA";
  }
  return m;
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through actas layer and add only features which are in the map bounds */

  actas.eachLayer(function (layer) {
    if (map.hasLayer(actasLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        var p = layer.feature.properties;
        var nameVal = p.NEW_FOLDER || p.CODIGO_ACT || "Acta";
        var tipoVal = p.TIPO ? " " + p.TIPO : "";
        var tipoDireccion = p.Direccion  ? " " + p.Direccion : "";
        var normMun = p.MUNICIPIO ? normalizeMunicipio(p.MUNICIPIO) : "";
        var tipoMun = normMun ? " " + normMun : "";

        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '">' +
          '<td style="vertical-align: middle;"><img width="16" height="18" src="../assets/img/acta.svg"></td>' +
          '<td class="feature-name">' + nameVal + " " + tipoDireccion + " " + tipoMun + '</td>' +
          '<td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td>' +
          '</tr>'
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
var cartoLight = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 22,
    subdomains:['mt0','mt1','mt2','mt3']
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



// Actas point layer is defined below


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


/* Empty layer placeholder to add to layer control for listening when to add/remove actas to markerClusters layer */
var actasLayer = L.geoJson(null);

var actas = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "../assets/img/acta.svg",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NEW_FOLDER || feature.properties.CODIGO_ACT || "Acta",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var p = feature.properties;
      var newFolder = p.NEW_FOLDER || p.CODIGO_ACT || "";
      var actividad = p.ACTIVIDAD || "";
      var tipo = p.TIPO || "";
      var direccion = getProperty(p, "DIRECCIÓN");
      var nombrePro = p.NOMBRE_PRO || "";
      var telefono = getProperty(p, "TELÉFONO");
      var email = p.CORREO_ELE || "";
      var rawMunicipio = p.MUNICIPIO || "";
      var municipio = normalizeMunicipio(p.MUNICIPIO || "");
      var pkAprox = p.PK_APROX || "";
      var status = p.Status || "";
      var cargadoEn = p.CARGADO_EN || "";
      var observacio = p.OBSERVACIO || "";
      var fechaStr = "";
      if (p.FECHA) {
        try {
          var d = new Date(p.FECHA);
          if (!isNaN(d.getTime())) {
            fechaStr = d.toLocaleDateString();
          }
        } catch(err) {}
      }

      var content = "<table class='table table-striped table-bordered table-condensed'>";
      content += "<tr><th>Acta</th><td>" + newFolder + "</td></tr>";
      if (actividad) content += "<tr><th>Actividad</th><td>" + actividad + "</td></tr>";
      if (tipo) content += "<tr><th>Tipo</th><td>" + tipo + "</td></tr>";
      if (nombrePro) content += "<tr><th>Propietario</th><td>" + nombrePro + "</td></tr>";
      if (direccion) content += "<tr><th>Dirección</th><td>" + direccion + "</td></tr>";
      if (municipio) {
        var munDisplay = (rawMunicipio && rawMunicipio.toUpperCase() !== municipio)
          ? municipio + " (" + rawMunicipio + ")"
          : municipio;
        content += "<tr><th>Municipio</th><td>" + munDisplay + "</td></tr>";
      }
      if (pkAprox) content += "<tr><th>PK Aprox</th><td>" + pkAprox + "</td></tr>";
      if (telefono) content += "<tr><th>Teléfono</th><td>" + telefono + "</td></tr>";
      if (email) content += "<tr><th>Email</th><td>" + email + "</td></tr>";
      if (status) content += "<tr><th>Estado</th><td>" + status + "</td></tr>";
      if (fechaStr) content += "<tr><th>Fecha</th><td>" + fechaStr + "</td></tr>";
      if (observacio && observacio.trim()) content += "<tr><th>Observaciones</th><td>" + observacio + "</td></tr>";
      if (cargadoEn) {
        content += "<tr><th>Documentación</th><td><a href='" + cargadoEn + "' target='_blank' style='color: blue;'>Abrir en BIM 360</a></td></tr>";
      }
      content += `<tr><th>Street View</th><td><a href='https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}' target='_blank'>Ir a Street View</a></td></tr>`;
      content += "</table>";

      layer.on({
        click: function (e) {
          lastActaClickTime = Date.now();
          if (e && e.originalEvent) {
            L.DomEvent.stopPropagation(e.originalEvent);
          }

          showActaHighlight(newFolder, feature.geometry.coordinates[1], feature.geometry.coordinates[0]);

          $("#feature-title").html(newFolder);
          $("#feature-info").html(content);
          if (document.body.clientWidth <= 767) {
            $("#featureModal").modal("show");
          }

          const imagesDiv = document.getElementById('images');
          if (imagesDiv) {
            const folderTrim = (newFolder || '').trim();
            const primaryPhotoUrl = `../assets/photos/${encodeURIComponent(folderTrim)}.jpg`;
            let fallbackPhotoUrl = '';
            if (/^ANI_BOG_0(?!0)/i.test(folderTrim)) {
              fallbackPhotoUrl = `../assets/photos/${encodeURIComponent(folderTrim.replace(/^ANI_BOG_0/i, 'ANI_BOG_00'))}.jpg`;
            } else if (folderTrim === 'ANI_BOG_ZUR-1-2408') {
              fallbackPhotoUrl = `../assets/photos/${encodeURIComponent('ANI_BOG_ZUR-1-2408 Fachada')}.jpg`;
            }

            imagesDiv.innerHTML = `
              <h3 style="margin-bottom: 5px;">${newFolder}</h3>
              <h4 style="margin-bottom: 5px; color: #555;">${actividad}${actividad && tipo ? ' - ' : ''}${tipo}</h4>
              ${nombrePro ? `<p style="margin: 2px 0;"><strong>Propietario:</strong> ${nombrePro}</p>` : ''}
              ${direccion ? `<p style="margin: 2px 0;"><strong>Dirección:</strong> ${direccion}</p>` : ''}
              ${municipio ? `<p style="margin: 2px 0;"><strong>Municipio:</strong> ${rawMunicipio && rawMunicipio.toUpperCase() !== municipio ? `${municipio} (${rawMunicipio})` : municipio}</p>` : ''}
              ${pkAprox ? `<p style="margin: 2px 0;"><strong>PK aprox:</strong> ${pkAprox}</p>` : ''}
              ${telefono ? `<p style="margin: 2px 0;"><strong>Teléfono:</strong> ${telefono}</p>` : ''}
              ${email ? `<p style="margin: 2px 0;"><strong>Email:</strong> ${email}</p>` : ''}
              ${status ? `<p style="margin: 2px 0;"><strong>Estado:</strong> ${status}</p>` : ''}
              ${fechaStr ? `<p style="margin: 2px 0;"><strong>Fecha:</strong> ${fechaStr}</p>` : ''}
              ${observacio && observacio.trim() ? `<p style="margin: 2px 0;"><strong>Observaciones:</strong> ${observacio}</p>` : ''}
              ${cargadoEn ? `<h4 style="margin-top: 10px;"><a href="${cargadoEn}" target="_blank" style="text-decoration: none; color: blue;"><i class="fa fa-folder-open"></i> Documentación (BIM 360)</a></h4>` : ''}
              ${folderTrim ? `
                <div id="acta-photo-wrapper" style="margin-top: 14px;">
                  <a id="acta-photo-link" href="${primaryPhotoUrl}" target="_blank" title="Ver fotografía en tamaño completo">
                    <img id="acta-photo-img" src="${primaryPhotoUrl}" alt="${folderTrim}"
                      data-fallback="${fallbackPhotoUrl}"
                      style="display: block; width: 100%; max-height: 420px; object-fit: contain; border-radius: 6px; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
                      onerror="if (this.dataset.fallback && this.src.indexOf(this.dataset.fallback.replace('../', '')) === -1) { this.src = this.dataset.fallback; if (this.parentElement) this.parentElement.href = this.dataset.fallback; this.dataset.fallback = ''; } else { if (this.parentElement && this.parentElement.parentElement) this.parentElement.parentElement.style.display = 'none'; }"
                    />
                  </a>
                </div>
              ` : ''}
            `;
          }

          highlightTableRow(newFolder);
        }
      });

      var record = {
        layer: layer,
        id: L.stamp(layer),
        newFolder: newFolder,
        actividad: actividad,
        tipo: tipo,
        direccion: direccion,
        nombrePro: nombrePro,
        telefono: telefono,
        email: email,
        municipio: municipio,
        rawMunicipio: rawMunicipio,
        pkAprox: pkAprox,
        codigoAct: p.CODIGO_ACT || "",
        status: status,
        cargadoEn: cargadoEn,
        fechaStr: fechaStr,
        observacio: observacio,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        properties: p
      };
      allActasRecords.push(record);

      actasSearch.push({
        name: newFolder,
        address: direccion || municipio || "",
        source: "actas",
        id: L.stamp(layer),
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("../data/actas.geojson", function (data) {
  actas.addData(data);
  map.addLayer(actasLayer);
  if (!applyUrlSearchParams()) {
    var currentVal = $("#searchbox").val();
    if (currentVal && currentVal.trim().length > 0) {
      renderSearchTable(currentVal);
    }
  }
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


// PMT sector layers removed for Actas


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
  if (e.layer === actasLayer) {
    markerClusters.addLayer(actas);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === actasLayer) {
    markerClusters.removeLayer(actas);
    syncSidebar();
  }
});

map.on("zoomend", function () {
 console.log(map.getZoom())
  if (map.hasLayer(actasLayer)) {
    if (!map.hasLayer(markerClusters)) {
      map.addLayer(markerClusters);
    }
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  if (Date.now() - lastActaClickTime < 400) {
    return;
  }
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
    maxZoom: 24,
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
    "<img src='../assets/img/acta.svg' width='25' height='25'> Actas": actasLayer,
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

function applyUrlSearchParams() {
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var targetActa = urlParams.get("acta");
    var targetLat = parseFloat(urlParams.get("lat"));
    var targetLng = parseFloat(urlParams.get("lng"));
    var filterMun = urlParams.get("mun");
    var filterTipo = urlParams.get("tipo");
    var filterStatus = urlParams.get("status");

    if (targetActa) {
      $("#searchbox").val(targetActa);
      renderSearchTable(targetActa);

      var matchedRec = null;
      var targetUpper = targetActa.trim().toUpperCase();
      for (var i = 0; i < allActasRecords.length; i++) {
        var folderUpper = (allActasRecords[i].newFolder || "").trim().toUpperCase();
        var codigoUpper = (allActasRecords[i].codigoAct || "").trim().toUpperCase();
        if (folderUpper === targetUpper || codigoUpper === targetUpper) {
          matchedRec = allActasRecords[i];
          break;
        }
      }
      if (!matchedRec && currentTableMatches && currentTableMatches.length > 0) {
        matchedRec = currentTableMatches[0];
      }

      if (matchedRec) {
        if (!map.hasLayer(actasLayer)) {
          map.addLayer(actasLayer);
        }
        lastActaClickTime = Date.now();
        map.setView([matchedRec.lat, matchedRec.lng], 20);
        showActaHighlight(matchedRec.newFolder, matchedRec.lat, matchedRec.lng);
        highlightTableRow(matchedRec.newFolder);
        if (matchedRec.layer) {
          matchedRec.layer.fire("click", null, false);
        }
        return true;
      } else if (!isNaN(targetLat) && !isNaN(targetLng)) {
        lastActaClickTime = Date.now();
        map.setView([targetLat, targetLng], 20);
        showActaHighlight(targetActa, targetLat, targetLng);
        return true;
      }
    } else if (filterMun || filterTipo || filterStatus) {
      var parts = [];
      if (filterMun) parts.push(filterMun);
      if (filterTipo) parts.push(filterTipo);
      if (filterStatus) parts.push(filterStatus);
      var queryStr = parts.join(" ");
      $("#searchbox").val(queryStr);
      renderSearchTable(queryStr);
      if (currentTableMatches && currentTableMatches.length > 0) {
        var bounds = L.latLngBounds(currentTableMatches.map(function (m) {
          return [m.lat, m.lng];
        }));
        map.fitBounds(bounds, { maxZoom: 19, padding: [40, 40] });
        return true;
      }
    }
  } catch (e) {}
  return false;
}

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to actas bounds only if no URL search target was applied */
  if (!applyUrlSearchParams()) {
    if (actas && actas.getLayers().length > 0) {
      map.fitBounds(actas.getBounds());
    }
  }
  syncSidebar();

  var actasBH = new Bloodhound({
    name: "Actas",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace((d.name || "").replace(/[_\-\/]/g, " ") + " " + (d.name || "") + " " + (d.address || ""));
    },
    queryTokenizer: function (q) {
      return Bloodhound.tokenizers.whitespace(q.replace(/[_\-\/]/g, " "));
    },
    local: actasSearch,
    limit: 15
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

  actasBH.initialize();
  // museumsBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 2,
    highlight: true,
    hint: false
  }, {
    name: "actas",
    displayKey: "name",
    source: actasBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='../assets/img/acta.svg' width='24' height='28'>&nbsp;Actas</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }).on("typeahead:selected", function (obj, datum) {
   
    if (datum.source === "actas") {
      if (!map.hasLayer(actasLayer)) {
        map.addLayer(actasLayer);
      }
      lastActaClickTime = Date.now();
      map.setView([datum.lat, datum.lng], 20);
      showActaHighlight(datum.name, datum.lat, datum.lng);
      var layer = markerClusters.getLayer(datum.id) || map._layers[datum.id] || (actas ? actas.getLayer(datum.id) : null);
      if (layer) {
        layer.fire("click", null, false);
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

/* ==========================================================================
   Search Results Table Functionality (Blue rectangle at bottom of map)
   ========================================================================== */

function searchActasMatches(query) {
  if (!query || !query.trim()) return [];
  var terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return allActasRecords.filter(function(item) {
    var haystack = (
      (item.newFolder || "") + " " +
      (item.codigoAct || "") + " " +
      (item.direccion || "") + " " +
      (item.municipio || "") + " " +
      (item.rawMunicipio || "") + " " +
      (item.nombrePro || "") + " " +
      (item.tipo || "") + " " +
      (item.actividad || "") + " " +
      (item.pkAprox || "") + " " +
      (item.status || "") + " " +
      (item.telefono || "") + " " +
      (item.observacio || "")
    ).toLowerCase();

    return terms.every(function(term) {
      return haystack.indexOf(term) !== -1;
    });
  });
}

var searchTableSortCol = null;
var searchTableSortDir = "asc";

function getRecordSortValue(item, col) {
  if (!item) return "";
  switch (col) {
    case "newFolder":
      return (item.newFolder || item.codigoAct || "").toString().trim();
    case "municipio":
      return (item.municipio || "").toString().trim();
    case "direccion":
      return (item.direccion || "").toString().replace(/\r?\n/g, " ").trim();
    case "nombrePro":
      return (item.nombrePro || "").toString().replace(/\r?\n/g, " ").trim();
    case "tipo":
      return (item.tipo || "").toString().trim();
    case "actividad":
      return (item.actividad || "").toString().trim();
    case "pkAprox":
      return (item.pkAprox || "").toString().trim();
    case "status":
      return (item.status || "").toString().trim();
    case "fecha":
      return Number(item.properties && item.properties.FECHA) || 0;
    default:
      return "";
  }
}

function renderSearchTable(query) {
  var tableEl = $("#search-table-container");
  var mapEl = $("#map");

  if (!query || !query.trim()) {
    currentTableMatches = [];
    tableEl.hide();
    mapEl.removeClass("has-search-table minimized-table");
    $("#actas-search-table tbody").empty();
    return;
  }

  currentTableMatches = searchActasMatches(query);

  if (searchTableSortCol) {
    var factor = searchTableSortDir === "asc" ? 1 : -1;
    currentTableMatches.sort(function(a, b) {
      var valA = getRecordSortValue(a, searchTableSortCol);
      var valB = getRecordSortValue(b, searchTableSortCol);
      if (searchTableSortCol === "fecha") {
        return (valA - valB) * factor;
      }
      return valA.localeCompare(valB, "es", { numeric: true, sensitivity: "base" }) * factor;
    });
  }

  tableEl.show().removeClass("minimized");
  mapEl.addClass("has-search-table").removeClass("minimized-table");
  $("#table-toggle-btn i").removeClass("fa-chevron-up").addClass("fa-chevron-down");

  $("#table-results-badge").text(currentTableMatches.length);
  $("#table-search-query").text('"' + query.trim() + '"');

  var $tbody = $("#actas-search-table tbody");
  $tbody.empty();

  if (currentTableMatches.length === 0) {
    $tbody.html(
      '<tr><td colspan="12" class="text-center text-muted" style="padding: 24px; font-size: 13px;">' +
      '<i class="fa fa-info-circle fa-lg" style="margin-right: 6px;"></i> No se encontraron actas que coincidan con <strong>"' +
      $('<div>').text(query.trim()).html() + '"</strong></td></tr>'
    );
    return;
  }

  var maxRender = 200;
  var items = currentTableMatches.slice(0, maxRender);
  var rows = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var bimLink = item.cargadoEn && item.cargadoEn.indexOf("http") !== -1
      ? '<a href="' + item.cargadoEn + '" target="_blank" class="btn btn-xs btn-info" onclick="event.stopPropagation();" title="Abrir en Autodesk BIM 360"><i class="fa fa-external-link"></i> BIM 360</a>'
      : '<span class="text-muted">-</span>';

    var statusBadgeClass = "label-default";
    if (item.status) {
      var st = item.status.toLowerCase();
      if (st.indexOf("abiert") !== -1) statusBadgeClass = "label-warning";
      else if (st.indexOf("cerrad") !== -1) statusBadgeClass = "label-success";
      else statusBadgeClass = "label-primary";
    }

    rows.push(
      '<tr data-id="' + item.id + '" data-folder="' + (item.newFolder || '') + '" data-lat="' + item.lat + '" data-lng="' + item.lng + '">' +
        '<td style="text-align: center; color: #777;">' + (i + 1) + '</td>' +
        '<td><strong>' + (item.newFolder || '-') + '</strong></td>' +
        '<td style="text-align: center;">' + bimLink + '</td>' +
        '<td>' + (item.municipio || '-') + '</td>' +
        '<td>' + (item.direccion || '-') + '</td>' +
        '<td>' + (item.nombrePro || '-') + '</td>' +
        '<td>' + (item.tipo || '-') + '</td>' +
        '<td>' + (item.actividad || '-') + '</td>' +
        '<td>' + (item.pkAprox || '-') + '</td>' +
        '<td><span class="label ' + statusBadgeClass + '">' + (item.status || '-') + '</span></td>' +
        '<td>' + (item.fechaStr || '-') + '</td>' +
        '<td style="text-align: center;"><button type="button" class="btn btn-xs btn-primary locate-btn"><i class="fa fa-map-marker"></i> Ubicar</button></td>' +
      '</tr>'
    );
  }

  if (currentTableMatches.length > maxRender) {
    rows.push(
      '<tr><td colspan="12" class="text-center text-muted" style="padding: 10px; font-style: italic; background: #fafafa;">' +
      'Mostrando los primeros ' + maxRender + ' de ' + currentTableMatches.length + ' resultados. Refine su búsqueda para ver menos actas.</td></tr>'
    );
  }

  $tbody.html(rows.join(''));
}

function highlightTableRow(newFolder) {
  if (!newFolder) return;
  $("#actas-search-table tbody tr").removeClass("active-row");
  var $row = $("#actas-search-table tbody tr[data-folder='" + newFolder + "']");
  if ($row.length) {
    $row.addClass("active-row");
    var container = document.getElementById("search-table-content");
    if (container && $row[0]) {
      var rowTop = $row[0].offsetTop;
      var rowHeight = $row[0].offsetHeight;
      var contHeight = container.clientHeight;
      var scrollTop = container.scrollTop;
      if (rowTop < scrollTop || (rowTop + rowHeight) > (scrollTop + contHeight)) {
        container.scrollTop = rowTop - (contHeight / 2) + (rowHeight / 2);
      }
    }
  }
}

function initSearchTableEvents() {
  var tableContainer = document.getElementById("search-table-container");
  if (tableContainer) {
    L.DomEvent.disableScrollPropagation(tableContainer);
    L.DomEvent.on(tableContainer, "mousedown dblclick contextmenu", L.DomEvent.stopPropagation);
  }

  // Column header sorting (ASC / DESC)
  $("#actas-search-table").on("click", "thead th.sortable-th", function(e) {
    e.stopPropagation();
    var col = $(this).attr("data-sort");
    if (!col) return;

    if ($(e.target).hasClass("sort-asc")) {
      searchTableSortCol = col;
      searchTableSortDir = "asc";
    } else if ($(e.target).hasClass("sort-desc")) {
      searchTableSortCol = col;
      searchTableSortDir = "desc";
    } else {
      if (searchTableSortCol === col) {
        searchTableSortDir = searchTableSortDir === "asc" ? "desc" : "asc";
      } else {
        searchTableSortCol = col;
        searchTableSortDir = "asc";
      }
    }

    $("#actas-search-table thead th.sortable-th").removeClass("sorted-asc sorted-desc");
    $(this).addClass(searchTableSortDir === "asc" ? "sorted-asc" : "sorted-desc");

    renderSearchTable($("#searchbox").val());
  });

  // Row click to zoom and show details
  $("#actas-search-table").on("click", "tbody tr", function(e) {
    if ($(e.target).closest("a").length) return;

    var idStr = $(this).attr("data-id");
    var id = parseInt(idStr, 10);
    var folder = $(this).attr("data-folder");
    var lat = parseFloat($(this).attr("data-lat"));
    var lng = parseFloat($(this).attr("data-lng"));

    $("#actas-search-table tbody tr").removeClass("active-row");
    $(this).addClass("active-row");

    if (!map.hasLayer(actasLayer)) {
      map.addLayer(actasLayer);
    }

    lastActaClickTime = Date.now();

    var targetLayer = (!isNaN(id) && markerClusters.getLayer(id)) || map._layers[id] || (actas ? actas.getLayer(id) : null);
    if (!targetLayer && folder) {
      for (var i = 0; i < allActasRecords.length; i++) {
        if (allActasRecords[i].newFolder === folder) {
          targetLayer = allActasRecords[i].layer;
          break;
        }
      }
    }

    if (targetLayer && targetLayer.getLatLng) {
      map.setView(targetLayer.getLatLng(), 20);
      showActaHighlight(folder, targetLayer.getLatLng().lat, targetLayer.getLatLng().lng);
      targetLayer.fire("click", null, false);
    } else if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], 20);
      showActaHighlight(folder, lat, lng);
    }
  });

  // Fit bounds to all matching records
  $("#table-zoom-all-btn").on("click", function(e) {
    e.stopPropagation();
    if (currentTableMatches && currentTableMatches.length > 0) {
      var bounds = L.latLngBounds(currentTableMatches.map(function(m) {
        return [m.lat, m.lng];
      }));
      map.fitBounds(bounds, { maxZoom: 19, padding: [40, 40] });
    }
  });

  // Minimize / Expand button
  $("#table-toggle-btn").on("click", function(e) {
    e.stopPropagation();
    var $container = $("#search-table-container");
    var $map = $("#map");
    if ($container.hasClass("minimized")) {
      $container.removeClass("minimized");
      $map.removeClass("minimized-table");
      $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
      $container.addClass("minimized");
      $map.addClass("minimized-table");
      $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }
  });

  // Close table button
  $("#table-close-btn").on("click", function(e) {
    e.stopPropagation();
    $("#search-table-container").hide();
    $("#map").removeClass("has-search-table minimized-table");
  });

  // Dynamic typing in the search box (red rectangle)
  $("#searchbox").on("input keyup paste change", function() {
    renderSearchTable($(this).val());
  });

  // Typeahead selection
  $("#searchbox").on("typeahead:selected typeahead:autocompleted", function(obj, datum) {
    if (datum && datum.name) {
      renderSearchTable(datum.name);
      highlightTableRow(datum.name);
    }
  });
}

$(document).ready(function() {
  initSearchTableEvents();
});
