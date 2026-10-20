function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}


function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 8,
    color: "rgb(7, 224, 249)",
  });
}


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
  position: "bottomright",
});

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (properties, layer, mousePos) {
  this._div.innerHTML = "<h4>Properties</h4>";

  if (!mousePos) {
    this._div.innerHTML += ` 'Hover over an Entity'`;
  } else {
    if (properties) {
      // console.log(properties.DATE_DEL);


      let newDate = null;

      if (properties.DATE_DEL) {
        newDate = new Date(properties.DATE_DEL).toISOString().split('T')[0];
      }
      let newDateMax = null;

      if (properties.dateMax) {
        newDateMax = new Date(properties.dateMax).toISOString().split('T')[0];
      }

      if (properties.FECHA_PMA) {
        newDateMax = new Date(properties.FECHA_PMA).toISOString().split('T')[0];
      }

      // Helpers
      const tmpl = (lines) => lines.join("<br>") + "<br>";

      const landTemplate = (typeLabel, props, newDate, newDateMax) => {
        const delivered = props.EFR_ENTRG === "DELIVERED";

        return delivered
          ? tmpl([
            `Type: '${typeLabel}'`,
            `Use: ${props.use}`,
            `ID: ${props.PARCEL_ID}`,
            `FMI: ${props.FMI}`,
            `Status: 'Delivered'`,
            `Date Delivered: ${newDate}`
          ])
          : tmpl([
            `Type: '${typeLabel}'`,
            `Use: ${props.use}`,
            `ID: ${props.PARCEL_ID}`,
            `FMI: ${props.FMI}`,
            `Status: 'No Delivered'`,
            `Deliver Estimate: '${newDateMax}'`
          ]);
      };

      const serviceTemplate = (label, props, isPipe = false) =>
        tmpl([


          `Type: '${label}'`,

          `${isPipe ? "Pipe" : "Type"}: ${props.Layer || props.RefName}`
          // `${isPipe ? "Pipe" : "Type"}: ${props.Layer || props.RefName}`

        ]);

      // MAIN OBJECT
      const htmlInfo = {
        // Existing utilities
        acuExis: serviceTemplate("Aqueduct Existing", properties, true),
        alcExis: serviceTemplate("Drainage Existing", properties, true),
        enelExis: serviceTemplate("Enel Existing", properties),
        etbExis: serviceTemplate("Etb Existing", properties),
        tigoExis: serviceTemplate("Tigo Existing", properties),
        gasExis: serviceTemplate("Vanti Existing", properties),
        movExis: serviceTemplate("Movistar Existing", properties, true),

        // Project utilities
        acuProy: serviceTemplate("Aqueduct Movement", properties, true),
        alcProy: serviceTemplate("Drainage Movement", properties, true),
        enelProy: serviceTemplate("Enel Movement", properties),
        etbProy: serviceTemplate("Etb Movement", properties),
        tigoProy: serviceTemplate("Tigo Movement", properties),
        gasProy: serviceTemplate("Vanti Movement", properties),
        movProy: serviceTemplate("Movistar Movement", properties, true),

        // Special Layers
        cenit: serviceTemplate("Cenit Pipeline", properties),
        cenitProy: serviceTemplate("Cenit Project", properties, true),
        bics: `BIC Name: ${properties.NOMBRE}<br>`,
        bicsZI: `Area Influence BIC Name: ${properties.RefName}<br>`,
        bicsAreas: tmpl([
          `Area Influence BIC Name: ${properties.Id}`,
          `Type: ${properties.TIPO}`
        ]),

        // Lands
        landsEFR: landTemplate("PROYECT LAND", properties, newDate, newDateMax),
        landsUtil: landTemplate("UTILITIES LAND", properties, newDate, newDateMax),
        landsComp: landTemplate("SECONDARY LAND", properties, newDate, newDateMax),

        // Others
        subStations: tmpl([
          `Name: ${properties.Layer}`,
          `Pk-Ini: ${properties.pkIni}`,
          `Pk-End: ${properties.pkEnd}`
        ]),

        polSpec: tmpl([
          `Polygon: ${properties.ID_POL_ESP}`,
          `Phase: ${properties.FASE}`,
          `Resolucion: ${properties.CODIGO_PMA} de ${newDateMax}`
        ])
      };


      this._div.innerHTML += htmlInfo[layer]


    } else {
      this._div.innerHTML += ` 'Hover over a Land or Utilitie'`;
    }

  }
};

//! END INFO PROPERTIES FUNCTION

var landsEFRSearch = [], landsUtilSearch = [], landsCompSearch = [];
layersProps = [];
Color = [];
//! REFERENCE AND PERMANENT LAYERS
//! layersProps["atribute"] = ["range", "color", "solid", "type"];

layersProps["pks2"] = [false, "red", false, "line"];
layersProps["projectLine"] = [false, "rgb(158, 4, 4)", true, "line"];
layersProps["railLine"] = [false, "black", true, "line", { center: "#90857A", rail: "black" }];
layersProps["localBog"] = [false, "yellow", false, "polygon"];
layersProps["redLineV2"] = [false, "rgb(243, 137, 8)", true, "line"];
layersProps["blueLine"] = [false, "rgb(8, 8, 243)", true, "line"];
layersProps["fenceRegio"] = [true, "various", true, "line", { "GREEN FENCING": "#0C612B", "HARD FENCING": "#8B928D", "HARD FENCING+GREEN": "#2AAFB4", "RETAINING WALL": "#B46D2A", }];
layersProps["securityLine3m"] = [false, "rgba(134, 132, 130, 0.9)", true, "line",];
layersProps["networksLine"] = [false, "green", true, "line"];
layersProps["sections"] = [false, "linear-gradient(to right, red, orange, yellow, lime, cyan, blue, magenta)", true, "polygon"];

//! AREAS LAYERS

layersProps["landsEFR"] = [true, "#ff00ff", false, "polygon", { "NO DELIVERED": "#ff003c", "DELIVERED": "#00ffcc", "PENDING": "#ffea00" },];
layersProps["landsUtil"] = [true, "#ff00ff", false, "polygon", { "NO DELIVERED": "#ff003c", "DELIVERED": "#39ff14" },];
layersProps["landsComp"] = [true, "#ff00ff", false, "polygon", { "NO DELIVERED": "#ff003c", "DELIVERED": "#00d0ff" },];


//! SOCIAL

layersProps["polGen"] = [false, "rgb(243, 120, 5)", false, "polygon"];
layersProps["polSpec"] = [false, "rgb(16, 253, 8)", false, "polygon"];
layersProps["constructions"] = [false, "red", false, "polygon"];
layersProps["newArchPol"] = [false, "#ce06cb", false, "polygon"];
layersProps["minutesNeiborghood"] = [true, "red", false, "polygon", { "1": "yellow", "2": "blue", "3": "red" },];

//! PERMITS
layersProps["bics"] = [false, "red", false, "polygon"];
layersProps["bicsRegio"] = [false, "black", false, "polygon"];
layersProps["bicsZI"] = [false, "#4ca9f5ff", false, "polygon"];
layersProps["bicsAreas"] = [true, "#4ca9f5ff", true, "polygon", { "ADQUIRIDO PARA REGIOTRAM": "#45f73fff", "CORREDOR FERREO": "#08443fff", "EN PROCESO DE ADQUISICION PREDIO PRIVADO": "#f055b4ff", "ESPACIO PUBLICO": "#f1ef5bff", "PREDIO PUBLICO": "#4c7756ff", "RESERVA VIAL": "#f28a45ff" }];

//! ENVIRONMENTAL 

layersProps["environLine"] = [false, "#ffff00", true, "line"];
layersProps["trees"] = [false, "#339966", false, "point"]
layersProps["riparianZones"] = [false, "#663300", false, "polygon"]

//! UTILITIES EXISTING 

layersProps["acuExis"] = [false, "rgba(2, 155, 244, 1)", true, "line", { "RED-MATRIZ-EXIST": "blue", "RED-MENOR-EXIST": "#07ACF4", RETIRAR: "red", "RED-MATRIZ-PROY": "BLUE", "RED-MENOR-PROY": "#07ACF4", }];
layersProps["enelExis"] = [false, "yellow", true, "line"];
layersProps["alcExis"] = [false, "rgb(208, 2, 244)", true, "line", { "PLU": "rgba(156, 88, 192, 1)", "SAN": "rgba(248, 97, 210, 1)", "COM": "rgb(208, 0, 102)" }];
layersProps["etbExis"] = [false, "rgb(6, 250, 112)", true, "line"];
layersProps["tigoExis"] = [false, "rgb(236, 167, 112)", true, "line"];
layersProps["gasExis"] = [false, "rgb(122, 3, 3)", true, "line"];
layersProps["movExis"] = [false, "rgb(255, 50, 194)", true, "line"];

//! UTILITIES MOVEMENTS

layersProps["acuProy"] = [false, "blue", false, "line", ];
layersProps["enelProy"] = [false, "rgba(243, 200, 57, 1)", false, "line"];
layersProps["alcProy"] = [false, "rgb(208, 2, 244)", false, "line", { "PLU": "rgba(67, 1, 102, 1)", "SAN": "rgba(236, 42, 236, 1)" }];
layersProps["etbProy"] = [false, "rgb(6, 250, 112)", false, "line"];
layersProps["tigoProy"] = [false, "rgb(236, 167, 112)", false, "line"];
layersProps["gasProy"] = [false, "rgb(122, 3, 3)", false, "line"];
layersProps["movProy"] = [false, "rgb(255, 50, 194)", false, "line"];

//! CENIT GROUP

layersProps["cenit"] = [true, "red", true, "line", { JETDUCTO: "rgb(242, 96, 11)", POLIDUCTO: "rgb(75, 153, 2)", PROPANODUCTO: "rgb(241, 36, 224)", OUT_SERVICE: "rgb(134, 161, 162)" },];
layersProps["cenitProy"] = [false, "rgba(29, 190, 70, 1)", false, "line"];
layersProps["aremaLine"] = [false, "#6412D5", true, "line"];
layersProps["cenitServ"] = [false, "#980", true, "polygon"];

//! STRUCTURES
layersProps["roadsProy"] = [false, "black", false, "line"];
layersProps["descoles"] = [false, "#00ffb3ff", true, "line"];
layersProps["Bridges"] = [false, "orange", false, "polygon"];
layersProps["Stations"] = [false, "#c200f3ff", false, "polygon"];
layersProps["subStations"] = [false, "black", false, "line"];

const data = [

];
let domainAtt = [];

groupByAttribute = (data, attribute) => {
  domainAtt = []
  return data.reduce((acc, obj) => {
    const key = obj[attribute];
    if (!acc[key]) {

      domainAtt.push(key);
      acc[key] = [];
    }
    return acc;
  }, {});
}

const grouped = groupByAttribute(data, 'role');


//! TILE LAYERS PERMANENT RASTER
var cartoLight = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  {
    maxZoom: 23,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
  }
);

var cartoDark = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  {
    maxZoom: 23,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
  }
);

var cartoColor = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
  {
    maxZoom: 23,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
  }
);

var googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 24,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

var mapBox = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVhbmNtdSIsImEiOiJja2t4YjJvb3YwZWkwMnJwYmJ2Y2ZveX`d3In0.sDTF6p3nHnz0Pfb221yVZA",
  {
    attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`,
    maxZoom: 23,
  }
);

var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 24,
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

var layerOsm = new L.TileLayer(
  "https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    subdomains: ["server", "services"],
    maxZoom: 19,
    noWrap: false,
    attribution: '<a href="https://www.arcgis.com/">ArcGIS</a>',
  }
);

var munCFROColors = { 1: "#976900", 2: "#ce06cb", 3: "#90857A", 4: "#969696", 5: "#0055aa", 6: "#ffff00", 7: "#ce06cb", };

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


var sectionsColors = {};
var sectionBounds = {};
var labelsSections = L.layerGroup();
function getSectionColor(tramo) {
  if (!sectionsColors[tramo]) {
    sectionsColors[tramo] = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
  }
  return sectionsColors[tramo];
}
var sections = L.geoJson(null, {
  style: function (feature) {
    return {
      color: getSectionColor(feature.properties.Tramo),
      weight: 3,
      opacity: 1,
      dashArray: "2, 2",
      fillOpacity: 0.1,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    var tramo = feature.properties.Tramo;
    var b = layer.getBounds();
    sectionBounds[tramo] = sectionBounds[tramo] ? sectionBounds[tramo].extend(b) : b;
    var label = L.marker(b.getCenter(), {
      icon: L.divIcon({
        className: "my-label-class-section",
        html: '<span style="white-space:nowrap;">Tramo ' + tramo + '</span>',
        iconAnchor: [0, 40],
      }),
    }).addTo(labelsSections);
  },
});


// var localBogColors = { 1: "#976900", 2: "#ce06cb", 3: "#90857A", 4: "#969696", 5: "#0055aa",6: "#ffff00", 7: "#ce06cb",};

var localBog = L.geoJson(null, {
  style: function (feature) {
    return {
      color: 'yellow',
      weight: 2,
      opacity: 1,
      dashArray: "5, 5",
      fillOpacity: 0.01,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    // Bind a permanent tooltip so labels toggle with the layer
    layer.bindTooltip(feature.properties.LocNombre || "", {
      permanent: true,
      direction: "center",
      className: "my-label-class",
    });
  },
});





var pks2 = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({ html: "<div style='font-size: 1px' class='my-icon'>pks</div>", className: "custom-icon-pk", })
    });
  },
});

var projectLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["projectLine"][1],
      weight: 3,
      opacity: 1,
      dashArray: "10, 10",
    };
  },
});

var railLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["railLine"][4][feature.properties.Layer],
      weight: 2,
      opacity: 1,
      dashArray: "6, 6",
      dashOffset: "2, 2",
    };
  },
});

var redLineV2 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["redLineV2"][1],
      weight: 3,
      opacity: 1,
      dashArray: "10, 10",
    };
  },
});

var blueLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["blueLine"][1],
      weight: 3,
      opacity: 1,
      dashArray: "10, 10",
    };
  },
});

var fenceRegio = L.geoJson(null, {
  style: function (feature) {

    return {
      color: layersProps["fenceRegio"][4][feature.properties.Layer],
      weight: 5,
      opacity: 1,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: function (e) {
        fenceRegio.resetStyle(e.target);
      },
    });

    layer.bindPopup(feature.properties.Layer);
  },
});


var securityLine3m = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["securityLine3m"][1],
      weight: 3,
      opacity: 1,
      dashArray: "8, 8",
    };
  },
});

var networksLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["networksLine"][1],
      weight: 3,
      opacity: 1,
      dashArray: "8, 8",
    };
  },
});


//! ENVIRONMENTAL LAYERS

var environLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["environLine"][1],
      weight: 3,
      opacity: 1,
      dashArray: "8, 8",
    };
  },
});

var labelsRiparianZones = L.layerGroup();

var riparianZones = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["riparianZones"][1],
      weight: 3,
      opacity: 1,
      dashArray: "8, 8",
    };
  },
  onEachFeature: function (feature, layer) {
    labelsRiparianZones.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-filter-gis",
        html: "ZMAP " + feature.properties.AREA_AMBIE
      })
    }));

    // let aream2 = feature.properties.Aream2.toFixed(2);
    layer.bindPopup(
      "ZMPA: " + feature.properties.AREA_AMBIE
    );
  },
});

var trees = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: L.icon({ iconUrl: 'data/tree.svg', iconSize: [20, 20], popupAnchor: [0, 0] }) });
  }
})



var constructions = new OSMBuildings()

// console.log(constructions);
constructions.click(function (e) {

  // console.log(e);
  // Get the clicked building ID and display information
  var id = e.feature; // Get the building ID from the event



  if (id) {

    fetch('data/const.geojson')
      .then(response => response.json())  // Parse the JSON
      .then(data => {

        // constSelected = data.filter(element => element.id == id  );

        // console.log("=-->" + constSelected);
        constSelected = data.features[id].properties
        // console.log(data.features[id].properties);  
        var popupContent = "Floor Number: " + constSelected.pisos; // Customize this as needed
        L.popup()
          .setLatLng([e.lat, e.lon])
          .setContent(popupContent)
          .openOn(map);


      })
      .catch(error => console.error('Error fetching the GeoJSON:', error));



  }
});

//! UTILITIES EXISTING LAYERS

var acuExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["acuExis"][1],
      opacity: 1,
      weight: 2,
      dashArray: "3, 3",
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, acuExis, "acuExis")
  },
});

var enelExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["enelExis"][1],
      dashArray: "3, 5",
      opacity: 1,
      weight: 3,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, enelExis, "enelExis")
  }
});

var alcExis = L.geoJson(null, {
  style: function (feature) {
    // console.log(layersProps["alcExis"][4]);
    return {
      color: layersProps["alcExis"][4][feature.properties.Linetype],
      dashArray: "3, 5",
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, alcExis, "alcExis")
  }
});

var etbExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["etbExis"][1],
      dashArray: "3, 5",
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, etbExis, "etbExis")
  }
});


var tigoExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["tigoExis"][1],
      dashArray: "3, 5",
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, tigoExis, "tigoExis")
  }
});

var gasExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["gasExis"][1],
      dashArray: "3, 5",
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, gasExis, "gasExis")
  }
});

var movExis = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["movExis"][1],
      weight: 2,
      opacity: 1,
      dashArray: "6, 6",
      dashOffset: "2, 2",
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, movExis, "movExis")
  }
});


//! UTILITIES MOVEMENTS

var acuProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["acuProy"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {

    highlightFunction(layer, acuProy, "acuProy")
  },
});

var enelProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["enelProy"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {

    highlightFunction(layer, enelProy, "enelProy")
  },
});

var alcProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["alcProy"][4][feature.properties.Linetype],
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, alcProy, "alcProy")
  },
});

var etbProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["etbProy"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, etbProy, "etbProy")
  },
});

var tigoProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["tigoProy"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, tigoProy, "tigoProy")
  },
});

var gasProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["gasProy"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };

  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, gasProy, "gasProy")
  },
});

var movProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["movProy"][1],
      weight: 2,
      opacity: 1,
      //   dashArray: "3, 3",              
      // dashOffset: "0",                
      // fillOpacity: 0.2,   
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, movProy, "movProy")
  },
});

//! CENIT GROUP

var cenit = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["cenit"][4][feature.properties.RefName],
      weight: 3,
      opacity: 1,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, cenit, "cenit")
    layer.bindPopup(feature.properties.RefName);
  },
});

var cenitProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["cenitProy"][1],
      weight: 3,
      opacity: 1,
      dashArray: "3, 3",
      dashOffset: "0",
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, cenitProy, "cenitProy")
    layer.bindPopup(feature.properties.layer);
  },
});

var aremaLine = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["aremaLine"][1],
      weight: 3,
      opacity: 1,
      dashArray: "8, 8",
    };
  },
});

var cenitServ = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["cenitServ"][1],
      weight: 3,
      opacity: 1,
      dashArray: "6, 6",
      dashOffset: "2, 2",
    };
  },
});

//! AREAS LAYERS

var clusterProps = {
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 17,
}

function getStyleFunction(layerName) {

  return function (feature) {
    let status = feature.properties.EFR_ENTRG == "DELIVERED" ? "DELIVERED" : "NO DELIVERED";
    colorLand = layersProps[layerName][4][status];

    return {
      color: colorLand,
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  };
}


function resetStyle(layerString, target) {

  resetLayer = (layerString == "landsUtil") ? landsUtil.resetStyle(target) : landsComp.resetStyle(target)

};

function getOnEachFeature(layerString) {

  return function (feature, layer) {

    layer.on({
      mouseover: (e) => {
        highlightFeature(e);
        info.update(layer.feature.properties, layerString, true);
      },
      mouseout: (e) => {

        // landsAct2.resetStyle(e.target),
        resetStyle(layerString, e.target);
        info.update(layer.feature.properties, layerString, false);
      },
    });

    const originalDate = new Date(layer.feature.properties.DATE_DEL).toISOString().split('T')[0];


    const maxDate = new Date(layer.feature.properties.dateMax).toISOString().split('T')[0];




    bindInfo = {
      "landsUtil": (layer.feature.properties.EFR_ENTRG == "DELIVERED") ? `Type: 'UTILITIES LAND'<br> Id: ${layer.feature.properties.PARCEL_ID}<br> Date Delivered: ${originalDate} <br> <a href='../pdf/${layer.feature.properties.ACT}.pdf' target='_blank'>Document No. ${layer.feature.properties.ACT}</a>
                     `
        : `Type: 'UTILITIES LAND'<br> Id: ${layer.feature.properties.PARCEL_ID}<br> Status: No Delivered <br> Deadline Deliver: ${maxDate}
                     
                     `,

      "landsComp": (layer.feature.properties.EFR_ENTRG == "DELIVERED") ? `Type: 'SECONDARY LAND'<br> Id: ${layer.feature.properties.PARCEL_ID}<br> Date Delivered: ${originalDate} <br> <a href='../pdf/${layer.feature.properties.ACT}.pdf' target='_blank'>Document No. ${layer.feature.properties.ACT}</a>
                     `
        : `Type: 'SECONDARY LAND'<br> Id: ${layer.feature.properties.PARCEL_ID}<br> Status: No Delivered <br> Deadline Deliver: ${maxDate} 
                     
                     `,

    };

    layer.bindPopup(

      bindInfo[layerString]
      // dateDel
    );
  }
}



var labelsLandsUtil = L.layerGroup();
var markerClustersLandsUtil = new L.MarkerClusterGroup(clusterProps);

var landsUtil = L.geoJson(null, {
  style: getStyleFunction("landsUtil"),
  onEachFeature: function (feature, layer) {

    // Run your custom function
    getOnEachFeature("landsUtil")(feature, layer);

    // Push into search array if properties exist
    if (feature.properties) {
      // console.log(layer.getBounds().getCenter());
      landsUtilSearch.push({
        name: feature.properties.PARCEL_ID,

        source: "Lands Utilities",
        id: L.stamp(layer),
        lat: layer.getBounds().getCenter().lat,
        lng: layer.getBounds().getCenter().lng
      });
    }

  }
});


var labelsLandsComp = L.layerGroup();
var markerClustersLandsComp = new L.MarkerClusterGroup(clusterProps);

var landsComp = L.geoJson(null, {
  style: getStyleFunction("landsComp"),
  onEachFeature: function (feature, layer) {

    // Run your custom function
    getOnEachFeature("landsComp")(feature, layer);

    // Push into search array if properties exist
    if (feature.properties) {
      landsCompSearch.push({
        name: feature.properties.PARCEL_ID,

        source: "Lands Secondary",

        id: L.stamp(layer),
        lat: layer.getBounds().getCenter().lat,
        lng: layer.getBounds().getCenter().lng,
      });
    }

  }
});






var labelsLandsEFR = L.layerGroup();

var markerClustersLandsEFR = new L.MarkerClusterGroup(clusterProps);

var landsEFR = L.geoJson(null, {
  style: function (feature) {
    return {
      // color:  "green",
      color: layersProps["landsEFR"][4][feature.properties.EFR_ENTRG],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function sss(feature, layer) {

    if (feature.properties) {

      landsEFRSearch.push({
        name: layer.feature.properties.PARCEL_ID,

        source: "Lands EFR",
        id: L.stamp(layer),
        lat: layer.getBounds().getCenter().lat,
        lng: layer.getBounds().getCenter().lng
      });
    }

    // Labels and zoom management handled by manageMarkerClusters()

    layer.on({
      mouseover: (e) => {
        highlightFeature(e);

        info.update(layer.feature.properties, "landsEFR", true);
      },
      mouseout: (e) => {
        landsEFR.resetStyle(e.target);
        info.update(layer.feature.properties, "landsEFR", false);
      },
    });
    const originalDate = new Date(feature.properties.DATE_DEL);
    const newDate = new Date(originalDate);
    newDate.setDate(newDate.getDate() + 1);

    let titleLabel =
      feature.properties.PROPIETARI == "INVIAS"
        ? "INVIAS LAND " + feature.properties.PARCEL_ID
        : "EFR LAND " + feature.properties.PARCEL_ID;

    let dateDel =
      feature.properties.EFR_ENTRG == "DELIVERED"

        ? newDate.toDateString() + "<br> <a href='../pdf/" + feature.properties.ACT + ".pdf' target='_blank'>Acta No. " + feature.properties.ACT + "</a>"
        : "No Delivered";

    let bidMessage = (feature.properties.PROPIETARI == "INVIAS" && feature.properties.EFR_ENTRG == "DELIVERED") ? "<b>" + titleLabel + "</b><br>" + "<br> <a href='../pdf/Acta Entrega Corredor.pdf' target='_blank'>Acta de Entrega Corredor</a>" : "<b>" + titleLabel + "</b><br>" + "Date Deliver: " + dateDel

    layer.bindPopup(bidMessage

    );
  },
});

var polGen = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["polGen"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: function (e) {
        polGen.resetStyle(e.target);
      },
    });


  },
});





















var polSpec = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["polSpec"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {


    layer.on({
      mouseover: (e) => {
        highlightFeature(e);

        info.update(layer.feature.properties, "polSpec", true);
      },
      mouseout: (e) => {
        polSpec.resetStyle(e.target);
        info.update(layer.feature.properties, "polSpec", false);
      },
    });

    layer.bindTooltip(
      feature.properties.ID_POL_ESP,
      {
        permanent: true,
        direction: 'center',
        className: 'label-polSpec'
      }
    );
  },
});



var newArchPol = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["newArchPol"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: function (e) {
        newArchPol.resetStyle(e.target);
      },
    });
    let aream2 = feature.properties.Aream2.toFixed(2);
    layer.bindPopup(
      "Punto: " + feature.properties.id + "<br>Area:" + aream2 + " m2"
    );
  },
});

var minutesNeiborghood = L.geoJson(null, {
  style: function (feature) {
    return {
      // color:  "green",
      color: layersProps["minutesNeiborghood"][4][feature.properties.FASE],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function sss(feature, layer) {
  },
});

var labelsSubStations = L.layerGroup();

var subStations = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["subStations"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    labelsSubStations.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.Layer,
      }),
    }));
    highlightFunction(layer, subStations, "subStations");
  },
});


var bics = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["bics"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    highlightFunction(layer, bics, "bics")
  },
});

//     var stripes = new L.StripePattern({
//   weight: 4,        // stripe width
//   spaceWeight: 6,   // gap between stripes
//   color: 'black',
//   opacity: 1,
//   angle: 30         // <--- angle in degrees
// });

var labelsBicsRegio = L.layerGroup();

var bicsRegio = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["bicsRegio"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    labelsBicsRegio.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.NOMBRE,
      }),
    }));
    highlightFunction(layer, bicsRegio, "bicsRegio");
  },
});


var bicsZI = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["bicsZI"][1],
      weight: 3,
      opacity: 1,
      dashArray: "10, 10",
      //  fillPattern: hatch,
      fillOpacity: 0.2,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {

    highlightFunction(layer, bicsZI, "bicsZI")
  },
});




var labelsBicsAreas = L.layerGroup();

var bicsAreas = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["bicsAreas"][4][feature.properties.TIPO],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    labelsBicsAreas.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.Id,
      }),
    }));
    highlightFunction(layer, bicsAreas, "bicsAreas");
  },
});


//! STRUCTURES

var roadsProy = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["roadsProy"][1],
      weight: 2

    };
  },
});

var descoles = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["descoles"][1],
      weight: 2,
      opacity: 1,
      dashArray: "10, 10",
    };
  },
});

var labelsBridges = L.layerGroup();

var Bridges = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["Bridges"][1],
      opacity: 1,
      weight: 2,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    labelsBridges.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.Layer,
      }),
    }));
  },
});



var labelsStations = L.layerGroup();

var Stations = L.geoJson(null, {
  style: function (feature) {
    return {
      color: layersProps["Stations"][1],
      weight: 3,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    labelsStations.addLayer(L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: "my-label-class",
        html: feature.properties.Name,
      }),
    }));
  },
});

var a1mSearch = []

var a1m = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      weight: 3,
      opacity: 1,
      dashArray: "10, 10",
    }
  },
  onEachFeature: function sss(feature, layer) {
    // console.log(`paso por a1m`);


    a1mSearch.push({


      id: layer.feature.properties.id,
      lat: layer.feature.properties.POINT_X,
      lng: layer.feature.properties.POINT_Y,
    });

    ;
  }


});


$.getJSON("data/1m.geojson", function (data) { a1m.addData(data); });

// console.log(a1m); 
//  init gis

(() => {

  var featureList;

  $(window).resize(function () {
    sizeLayerControl();
  });

  $(document).on("click", ".feature-row", function (e) {
    $(document).off("mouseout", ".feature-row", clearHighlight);
    sidebarClick($(this).attr("lat"), $(this).attr("lng"));
  });

  if (!("ontouchstart" in window)) {
    $(document).on("mouseover", ".feature-row", function (e) {
      highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
    });
  }

  $(document).on("mouseout", ".feature-row", clearHighlight);

  $("#about-btn").click(function () {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#full-extent-btn").click(function () {
    map.fitBounds(landsEFR.getBounds());
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#legend-btn").click(function () {
    $("#legendModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#login-btn").click(function () {
    $("#loginModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#list-btn").click(function () {
    animateSidebar();
    return false;
  });

  $("#nav-btn").click(function () {
    $(".navbar-collapse").collapse("toggle");
    return false;
  });



  $("#sidebar-hide-btn").click(function () {
    animateSidebar();
    return false;
  });

  function animateSidebar() {
    $("#sidebar").animate({
      width: "toggle"
    }, 350, function () {
      map.invalidateSize();
    });
  }



  function clearHighlight() {
    highlight.clearLayers();
  }

  $("#searchbox").click(function () {
    $(this).select();

  });

  /* Prevent hitting enter from refreshing the page */
  $("#searchbox").keypress(function (e) {
    if (e.which == 13) {
      // console.log(`in prevent`);
      e.preventDefault();
    }
  });



  var markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 16
  });

  function sidebarClick(lat, lng) {

    map.addLayer(highlight);
    map.setView([lat, lng], 17);
    if (document.body.clientWidth <= 767) {
      $("#sidebar").hide();
      map.invalidateSize();
    }
  }

  // function syncSidebar() {
  //   /* Empty sidebar features */
  //   $("#feature-list tbody").empty();
  //   /* Loop through theaters layer and add only features which are in the map bounds */
  //   theaters.eachLayer(function (layer) {

  //     if (!layer.feature.properties.PARCEL_ID.toLowerCase().includes("sector")) {






  //       if (map.hasLayer(theaters)) {

  //       if (map.getBounds().intersects(layer.getBounds())) {

  //     $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getBounds().getCenter().lat + '" lng="' + layer.getBounds().getCenter().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/bg-1.png"></td><td class="feature-name">' + layer.feature.properties.PARCEL_ID + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  //     featureList = new List("features", {
  //       valueNames: ["feature-name"]

  //     });
  //     featureList.sort("feature-name", {
  //       order: "asc"
  //     });
  //   }
  //       }
  //     }
  //   });


  // }



  // highlightFeature and highlightFunction already defined at top of file



  var highlight = L.geoJson(null);
  var highlightStyle = {
    stroke: false,
    fillColor: "#00FFFF",
    fillOpacity: 0.7,
    radius: 10
  };

  //?LAYERS IN layers.js

  //BASE LAYER ON WHEN LOAD PAGE

  $.getJSON("data/munCFRO.geojson", function (data) { munCFRO.addData(data); });

  $.getJSON("data/projectLine.geojson", function (data) { projectLine.addData(data); });

  $.getJSON("data/railLine.geojson", function (data) { railLine.addData(data); });

  $.getJSON("data/pks.geojson", function (data) { pks2.addData(data); });

  $.getJSON("data/sections.geojson", function (data) {
    sections.addData(data);
    $("#sectionFilter").on("change", function () {
      var val = parseInt(this.value);
      if (!val) {
        map.fitBounds(sections.getBounds());
      } else if (sectionBounds[val]) {
        map.fitBounds(sectionBounds[val], { padding: [40, 40] });
      }
    });
  });




  //! SET MAP
  var setY = 4.7185;
  var setX = -74.1945;
  var zoom = 11;

  map = L.map("map", {
    minZoom: 1,
    maxZoom: 22,
    zoom: zoom,
    center: [setY, setX],
    layers: [sections, labelsSections, cartoDark, munCFRO, blueLine, railLine, pks2, projectLine],
    // layers: [cartoLight, munCFRO, projectLine, railLine],
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
    wheelPxPerZoomLevel: 40,
    preferCanvas: true,
    rotate: true,
    touchRotate: true,
    rotateControl: {
      position: 'topright',
      closeOnZeroBearing: false
    },
    bearing: 0,
    updateWhenIdle: true
  });



  //! ============================================
  //! LAZY LOADING INFRASTRUCTURE
  //! ============================================
  // Instead of loading all ~40 GeoJSON files at startup (150+ MB),
  // layers load their data on first toggle via the layer control.

  var _lazyRegistry = {};
  var _layerLoaded = {};

  function registerLazy(layerObj, filePath, onLoadCallback) {
    var id = L.stamp(layerObj);
    _lazyRegistry[id] = { file: filePath, layer: layerObj, onLoad: onLoadCallback };
  }

  function lazyLoad(layerObj) {
    var id = L.stamp(layerObj);
    if (_layerLoaded[id] || !_lazyRegistry[id]) return;
    _layerLoaded[id] = true;
    var entry = _lazyRegistry[id];
    $.getJSON(entry.file, function (data) {
      entry.layer.addData(data);
      if (entry.onLoad) entry.onLoad(data);
    });
  }

  // Label group management for layers with labels
  var _labelGroupMap = {};

  function registerLabelGroup(layerObj, labelGroup) {
    _labelGroupMap[L.stamp(layerObj)] = labelGroup;
  }

  // Master overlayadd/overlayremove handler
  map.on("overlayadd", function (e) {
    lazyLoad(e.layer);
    var id = L.stamp(e.layer);
    if (_labelGroupMap[id]) map.addLayer(_labelGroupMap[id]);
  });

  map.on("overlayremove", function (e) {
    var id = L.stamp(e.layer);
    if (_labelGroupMap[id]) map.removeLayer(_labelGroupMap[id]);
  });

  // Register label groups for layers with labels
  registerLabelGroup(riparianZones, labelsRiparianZones);
  registerLabelGroup(subStations, labelsSubStations);
  registerLabelGroup(bicsRegio, labelsBicsRegio);
  registerLabelGroup(bicsAreas, labelsBicsAreas);
  registerLabelGroup(Bridges, labelsBridges);
  registerLabelGroup(Stations, labelsStations);
  registerLabelGroup(sections, labelsSections);

  //! ============================================
  //! EAGER LOADS — essential layers in initial view
  //! ============================================

  $.getJSON("data/blueLine.geojson", function (data) { blueLine.addData(data); });

  //! ============================================
  //! LAZY LAYER REGISTRATIONS — load on first toggle
  //! ============================================




  //! REFERENCE
  registerLazy(redLineV2, "data/projectLineMinute2.geojson");
  registerLazy(localBog, "data/localBog.geojson");
  registerLazy(fenceRegio, "data/fenceRegio.geojson");
  registerLazy(securityLine3m, "data/3m.geojson");
  registerLazy(networksLine, "data/networksLine.geojson");

  //! ENVIRONMENTAL
  registerLazy(environLine, "data/envLine.geojson");
  registerLazy(trees, "data/trees.geojson");
  registerLazy(riparianZones, "data/riparianZones.geojson");

  //! SOCIAL
  registerLazy(polGen, "data/polGen.geojson");
  registerLazy(polSpec, "data/polSpec.geojson");
  registerLazy(newArchPol, "data/newArchPol.geojson");
  registerLazy(minutesNeiborghood, "data/minutesNeiborghood.geojson");

  // OSMBuildings uses .set() instead of .addData()
  var _constructionsLoaded = false;
  registerLazy(constructions, "data/const.geojson");
  // Override: constructions needs special loading
  (function () {
    var id = L.stamp(constructions);
    _lazyRegistry[id] = {
      file: "data/const.geojson",
      layer: constructions,
      onLoad: null
    };
    var origLazyLoad = lazyLoad;
    // We handle constructions in overlayadd specially
  })();
  map.on("overlayadd", function (e) {
    if (e.layer === constructions && !_constructionsLoaded) {
      _constructionsLoaded = true;
      $.getJSON("data/const.geojson", function (data) {
        constructions.set(data);
      });
    }
  });

  //! UTILITIES EXISTING
  registerLazy(acuExis, "data/acuExis.geojson");
  registerLazy(enelExis, "data/enelExis.geojson");
  registerLazy(alcExis, "data/alcExis.geojson");
  registerLazy(etbExis, "data/etbExis.geojson");
  registerLazy(tigoExis, "data/tigoExis.geojson");
  registerLazy(gasExis, "data/gasExis.geojson");
  registerLazy(movExis, "data/movExis.geojson");

  //! UTILITIES MOVEMENTS
  registerLazy(acuProy, "data/acuProy.geojson");
  registerLazy(enelProy, "data/enelProy.geojson");
  registerLazy(alcProy, "data/alcProy.geojson");
  registerLazy(etbProy, "data/etbProy.geojson");
  registerLazy(tigoProy, "data/tigoProy.geojson");
  registerLazy(gasProy, "data/gasProy.geojson");
  registerLazy(movProy, "data/movProy.geojson");

  //! CENIT GROUP
  registerLazy(cenit, "data/cenit.geojson");
  registerLazy(cenitProy, "data/cenitProy.geojson");
  registerLazy(aremaLine, "data/aremaLine.geojson");
  registerLazy(cenitServ, "data/cenitServ.geojson");

  //! PERMITS
  registerLazy(bics, "data/bics1.geojson");
  registerLazy(bicsRegio, "data/bicsRegio1.geojson");
  registerLazy(bicsZI, "data/bicsZI1.geojson");
  registerLazy(bicsAreas, "data/bicsAreas1.geojson");

  //! STRUCTURES
  registerLazy(roadsProy, "data/roadsProy.geojson");
  registerLazy(descoles, "data/descoles.geojson");
  registerLazy(Bridges, "data/Bridges.geojson");
  registerLazy(Stations, "data/Stations.geojson");
  registerLazy(subStations, "data/subStations.geojson");

  //! ============================================
  //! LAND LAYERS — eager but deduplicated (1 fetch per file instead of 3)
  //! ============================================

  function loadLandLayer(filePath, geoJsonLayer, labelsGroup, clusterGroup) {
    $.getJSON(filePath, function (data) {
      // 1. Add to the GeoJSON layer (triggers onEachFeature for search arrays)
      geoJsonLayer.addData(data);

      // 2. Create label markers
      data.features.forEach(function (feature) {
        var polygon = L.geoJSON(feature.geometry);
        var centroid = polygon.getBounds().getCenter();
        labelsGroup.addLayer(L.marker([centroid.lat, centroid.lng], {
          icon: L.divIcon({
            className: "my-label-class",
            html: feature.properties.PARCEL_ID,
          }),
        }));
      });

      // 3. Create cluster markers
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          clusterGroup.addLayer(L.marker(layer.getBounds().getCenter()));
        },
      });
    });
  }

  // Each file fetched ONCE (was 3x each before)
  loadLandLayer("data/landsUtil.geojson", landsUtil, labelsLandsUtil, markerClustersLandsUtil);
  loadLandLayer("data/landsComp.geojson", landsComp, labelsLandsComp, markerClustersLandsComp);
  loadLandLayer("data/landsEFR.geojson", landsEFR, labelsLandsEFR, markerClustersLandsEFR);



  //! FONT, ROT AND SCALE PKS LABELS
  function updatePksLabels() {
    pks2.eachLayer(function (layer) {
      var zoom = map.getZoom();
      var bearing = (map.getBearing && map.getBearing()) || 0;
      // console.log(bearing)
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
        return (zoom >= 10) ? zoomArrayO[zooma] : 1
      }

      var labelAngle = layer.feature.properties.Angle + bearing;

      layer.setIcon(
        L.divIcon({
          html: `<div style='font-size: ${zoomArray(
            zoom
          )}px; -o-transform: rotate(45deg); transform: rotate(${labelAngle
            }deg)'>${layer.feature.properties.Text}</div>`,
          className: iconClass,
        })
      );
    });
  }
  map.on("zoomend", updatePksLabels);
  map.on("rotate", updatePksLabels);


  //!  MANAGE MARKERCLUSTERS

  function manageMarkerClusters(layer, markerClusters, labelsLayer) {

    // Función para actualizar la visibilidad según el zoom
    function updateLayersByZoom() {
      const zoom = map.getZoom();

      if (!map.hasLayer(layer)) {
        map.removeLayer(markerClusters);
        return;
      }

      if (zoom <= 16) {

        map.addLayer(markerClusters);
        map.removeLayer(labelsLayer);
        // map.removeLayer(layer);

      } else {
        map.removeLayer(markerClusters);
        map.addLayer(labelsLayer);
        map.addLayer(layer);
      }
    }

    // Evento: overlay agregado
    map.on("overlayadd", function (e) {
      if (e.layer === layer) {
        updateLayersByZoom();
      }
    });

    // Evento: overlay removido
    map.on("overlayremove", function (e) {
      if (e.layer === layer) {
        map.removeLayer(markerClusters);
        map.removeLayer(labelsLayer);
      }
    });

    // Evento: zoom
    map.on("zoomend", updateLayersByZoom);


  }


  manageMarkerClusters(landsEFR, markerClustersLandsEFR, labelsLandsEFR);

  manageMarkerClusters(landsUtil, markerClustersLandsUtil, labelsLandsUtil);
  manageMarkerClusters(landsComp, markerClustersLandsComp, labelsLandsComp);


}

)

  ();

// ! end init gis

//! SET CONTROL LAYERS AND LEGEND

var baseTree = [
  {
    label: "Base Maps",
    children: [
       { label: "Dark Map", layer: cartoDark },
      { label: "Light Map", layer: cartoLight },
      { label: "Color Map", layer: cartoColor },
      { label: "Google Sat", layer: googleSat },
      // {label: 'MapBox Sat', layer: mapBox},
      { label: "Esri Sat", layer: Esri_WorldImagery },
    ],
  },
];

var overlaysTree = {
  label: "Cfro Layers",
  selectAllCheckbox: "Un/select all",
  children: [
    { label: '<div id="onlysel">-Show only selected-</div>' },
    {
      label: "Reference",
      children: [
        { label: "Sections (Tramos)", layer: sections, name: "sections" },
        { label: "0+000 View PKs", layer: pks2, name: "pks2" },
        { label: "Project Line", layer: projectLine, name: "projectLine" },
        { label: "Avalaible Line", layer: blueLine, name: "blueLine" },
        { label: "Localities Bogota", layer: localBog, name: "localBog" },
        { label: "RailTrack", layer: railLine, name: "railLine" },
        { label: "Red Line Amendment 2", layer: redLineV2, name: "redLineV2" },
        { label: "Fences", layer: fenceRegio, name: "fenceRegio" },
        { label: "Security Line", layer: securityLine3m, name: "securityLine3m", },

      ],
    },
    {
      label: "Areas",
      selectAllCheckbox: true,
      children: [
        { label: "Lands Proyect", layer: landsEFR, name: "landsEFR" },
        { label: "Lands Utilities", layer: landsUtil, name: "landsUtil", },
        { label: "Lands Secondary Areas", layer: landsComp, name: "landsComp", },



      ],
    },
    {
      label: "Environmental",
      selectAllCheckbox: true,
      children: [
        { label: "Environmental Line", layer: environLine, name: "environLine" },
        { label: 'Trees', layer: trees, name: 'trees' },
        { label: 'Zmpa', layer: riparianZones, name: 'riparianZones' },

      ],
    },
    {
      label: "Social",
      selectAllCheckbox: true,
      children: [
        { label: "General Polygon Archeology", layer: polGen, name: "polGen" },
        { label: "Specific Polygons Archeology", layer: polSpec, name: "polSpec" },
        { label: "Constructions Near", layer: constructions, name: "constructions" },
        { label: "Archeology Areas", layer: newArchPol, name: "newArchPol" },
        { label: "Neiborghood Minutes", layer: minutesNeiborghood, name: "minutesNeiborghood" },


      ],
    },
    {
      label: "Permits",
      selectAllCheckbox: true,
      children: [

        { label: "Bics", layer: bics, name: "bics" },
        { label: "Bics in Regiotram", layer: bicsRegio, name: "bicsRegio" },
        { label: "Influence Zone Bics", layer: bicsZI, name: "bicsZI" },
        { label: "Areas in Influence Zone", layer: bicsAreas, name: "bicsAreas" }

      ],
    },
    {
      label: "Utilities Existing",
      selectAllCheckbox: true,
      children: [
        { label: "Water Supply Exist", layer: acuExis, name: "acuExis" },
        { label: "Energy Exist", layer: enelExis, name: "enelExis" },
        { label: "Drainage Exist", layer: alcExis, name: "alcExis" },
        { label: "Etb Exist", layer: etbExis, name: "etbExis" },
        { label: "tigo Exist", layer: tigoExis, name: "tigoExis" },
        { label: "Gas Exist", layer: gasExis, name: "gasExis" },
        { label: "Movistar Exist", layer: movExis, name: "movExis" },
      ],
    },
    {
      label: "Utilities Movements",
      selectAllCheckbox: true,
      children: [
        { label: "Water Supply Mov", layer: acuProy, name: "acuProy" },
        { label: "Energy Proy", layer: enelProy, name: "enelProy" },
        { label: "Drainage Proy", layer: alcProy, name: "alcProy" },
        { label: "Etb Proy", layer: etbProy, name: "etbProy" },
        { label: "Tigo Proy", layer: tigoProy, name: "tigoProy" },
        { label: "Gas Proy", layer: gasProy, name: "gasProy" },
        { label: "Movistar Proy", layer: movProy, name: "movProy" },
      ],
    },
    {
      label: "Cenit",
      selectAllCheckbox: true,
      children: [
        { label: "Cenit Exist", layer: cenit, name: "cenit" },
        { label: "Cenit Project", layer: cenitProy, name: "cenitProy" },
        { label: "Arema Line", layer: aremaLine, name: "aremaLine" },
        { label: "Serv Cenit", layer: cenitServ, name: "cenitServ" },
      ],
    },

    {
      label: "Structures",
      selectAllCheckbox: true,
      children: [
        { label: "Roads Proy", layer: roadsProy, name: "roadsProy" },
        { label: "Descoles", layer: descoles, name: "descoles" },
        { label: "Bridges", layer: Bridges, name: "Bridges" },
        { label: "Stations", layer: Stations, name: "Stations" },
        { label: "Sub Stations", layer: subStations, name: "subStations" },
      ],
    },
  ],
};


//! ADD CONTROL LAYERS

var lay = L.control.layers.tree(baseTree, overlaysTree, {
  position: "topright",
  namedToggle: true,
  selectorBack: false,
  closedSymbol: "&#8862; &#x1f5c0;",
  openedSymbol: "&#8863; &#x1f5c1;",
  collapseAll: "Collapse all",
  expandAll: "Expand all",
  collapsed: false,
});

lay.addTo(map).collapseTree().expandSelected().collapseTree(true);
L.DomEvent.on(L.DomUtil.get("onlysel"), "click", function () {
  lay.collapseTree(true).expandSelected(true);
});

var $layersControl = $(".leaflet-control-layers");
var $closeBtn = $('<a href="#" title="Close Layers" style="position:absolute; top:2px; right:7px; font-size:18px; color:#555; text-decoration:none; z-index:9999;"><i class="bi bi-x-circle-fill"></i></a>');
$layersControl.css("position", "relative");
$layersControl.append($closeBtn);
$layersControl.css("display", "none");

var hamburgerControl = L.control({ position: 'topright' });
hamburgerControl.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
  div.innerHTML = '<a href="#" title="Show Layers" style="font-size: 20px; line-height: 38px; width: 40px; height: 40px; display: block; background: #1c4b72; color: #ffffff; text-align: center; text-decoration: none; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"><i class="bi bi-layers-fill"></i></a>';
  div.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $layersControl.css("display", "block");
    div.style.display = "none";
  };

  $closeBtn.on("click", function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    $layersControl.css("display", "none");
    div.style.display = "block";
  });

  return div;
};
hamburgerControl.addTo(map);

// Legend toggle control (same pattern as layers)
var $legendDiv = $(".legend");
$legendDiv.css({ "position": "absolute", "display": "none" });

var legendControlDiv; // reference to show it back from the close btn handler

var legendControl = L.control({ position: 'topleft' });
legendControl.onAdd = function (map) {
  legendControlDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
  legendControlDiv.innerHTML = '<a href="#" title="Show Legend" style="font-size: 20px; line-height: 38px; width: 40px; height: 40px; display: block; background: #1c4b72; color: #ffffff; text-align: center; text-decoration: none; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"><i class="bi bi-card-list"></i></a>';
  legendControlDiv.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $legendDiv.css("display", "block");
    legendControlDiv.style.display = "none";
  };
  return legendControlDiv;
};
legendControl.addTo(map);


var locateControl = L.control.locate({
  position: "topright",
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
  icon: "bi bi-cursor-fill",
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

L.control.zoom({ position: 'topright' }).addTo(map);

// Move rotate control into the search bar
var rotateEl = document.querySelector('.leaflet-control-rotate');
var rotateContainer = document.getElementById('rotate-control-container');
if (rotateEl && rotateContainer) {
  rotateEl.style.margin = '0';
  rotateEl.style.border = 'none';
  rotateEl.style.boxShadow = 'none';
  rotateEl.title = 'Click and hold to rotate';
  rotateContainer.appendChild(rotateEl);
}

//! PROPERTIES PANEL


info.addTo(map);



//! LEGEND SIDE BAR





layersMap = overlaysTree.children;

docsId = [];
var legendContent = `<div id='legend22' class='overflow-auto'><div style="display:flex; justify-content:space-between; align-items:center;"><h3 class='text-secondary' style="margin:0;">Legend</h3><a id="legend-close-btn" href="#" title="Close Legend" style="font-size:20px; color:#555; text-decoration:none; line-height:1;"><i class="bi bi-x-circle-fill"></i></a></div>`;



for (i = 1; i < layersMap.length; i++) {
  //
  legendContent += `<div class="accordion accordion-flush bg-red" id="accordionFlushExample">
<div class="accordion-item bg-blue-light">
  <h5 class="accordion-header bg-cyan" id="flush-heading${i}">
    <button class="accordion-button collapsed text-gray-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
    ${layersMap[i].label}:
    </button>
    </h5>
    <div id="flush-collapse${i}"  class="accordion-collapse collapse show" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample${i}">`;
  layerLegend = layersMap[i].children;

  layerLegend.forEach((e) => {
    // console.log(layerLegend);
    if (layersProps[e.name][3] === "polygon") {
      styleLegend = `background: ${layersProps[e.name][1]}`;
    } else if (layersProps[e.name][2]) {
      styleLegend = `border-bottom: 3px dashed ${layersProps[e.name][1]};`;

    } else {
      styleLegend = `border-bottom: 3px solid ${layersProps[e.name][1]};`;
    }

    // styleLegend = `background-color: ${layersProps[e.name][1]}`
    //! add layers with range properties
    legendContent += layersProps[e.name][0]
      ? `<div id="${e.name}"> <strong>-${e.label} </strong>`
      : `<div id="${e.name}"> <span class="rectangle" style="display: inline-block; width: 50px; height: 10px; ${styleLegend} ;"></span> - ${e.label}`;

    styleLegend = {
      "line": '<span class="rectangle" style="display: inline-block; width: 50px; height: 10px; border-bottom: 3px solid',
      "polygon": '<span class="rectangle" style="display: inline-block; width: 50px; height: 10px; background:',
      "LineSolid": '<span class="rectangle" style="display: inline-block; width: 50px; height: 5px; border-top: 3px solid'
    }



    // range entities
    if (layersProps[e.name][0]) {



      Object.entries(layersProps[e.name][4]).forEach(([key, value], index) => {
        legendContent += `<br>.${key} ${styleLegend[layersProps[e.name][3]]} ${value} ;"></span>`;
        // console.log(index, key, value);
      });


    }

    legendContent += " </div>";
  });

  legendContent += `<br>`;
  legendContent += `</div>`;
  legendContent += `</div>
</div> `;

}



legendContent += `</div></div>`;

document.getElementById("legend").innerHTML = legendContent;

// Wire up the in-legend X close button
document.getElementById("legend-close-btn").addEventListener("click", function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  $(".legend").css("display", "none");
  if (legendControlDiv) legendControlDiv.style.display = "block";
});


function updateLegend() {
  layersMap = overlaysTree.children;

  for (i = 1; i < layersMap.length; i++) {
    layerLegend = layersMap[i].children;

    layerLegend.forEach((e) => {
      docsId[e.name] = document.getElementById(e.name);

      document.getElementById(e.name).style.display = map.hasLayer(e.layer)
        ? "block"
        : "none";
    });
  }
}

map.on("layeradd layerremove", function () {
  updateLegend();
});
updateLegend();

$(document).one("ajaxStop", function () {
  $("#loading").hide();

  //! SEARCH LANDS

  const searchData = [
    ...landsUtilSearch.map(d => ({ ...d, source: "Lands Utilities" })),
    ...landsEFRSearch.map(d => ({ ...d, source: "Lands Proyect" })),
    ...landsCompSearch.map(d => ({ ...d, source: "Lands Secondary" })),
  ];



  const searchBox = document.getElementById("searchBox");
  const resultsDiv = document.getElementById("results");

  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    if (!query) {
      resultsDiv.style.display = "none";
      return;
    }

    const filtered = searchData.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      // Agrupar por categoría
      const grouped = filtered.reduce((acc, item) => {
        if (!acc[item.source]) acc[item.source] = [];
        acc[item.source].push(item);
        return acc;
      }, {});

      let html = "";
      for (const category in grouped) {

        // Ordenar por item.name
        grouped[category].sort((a, b) =>
          a.name.localeCompare(b.name, "es", { sensitivity: "base" })
        );

        html += `
    <div><strong>---------</strong></div>
    <div><strong>${category}</strong></div>
  `;

        grouped[category].forEach(item => {
          html += `
      <div class="item" data-lat="${item.lat}" data-lng="${item.lng}">
        <small>${item.name}</small><br>
      </div>
    `;
        });
      }

      document.addEventListener("click", function (e) {
        if (e.target.closest(".item")) {


          const el = e.target.closest(".item");


          const lat = parseFloat(el.dataset.lat);
          const lng = parseFloat(el.dataset.lng);

          map.setView([lat, lng], 20);
        }
      });


      resultsDiv.innerHTML = html;
      resultsDiv.style.display = "block";
    } else {
      resultsDiv.innerHTML = `<div class="item">No hay resultados</div>`;
      resultsDiv.style.display = "block";
    }
  });

  document.addEventListener("click", (e) => {
    if (!resultsDiv.contains(e.target) && e.target !== searchBox) {
      resultsDiv.style.display = "none";
    }
  });



});




const a1mSearchBox = document.getElementById("a1mSearchBox");
const resultsDiv = document.getElementById("a1mResults");


a1mSearchBox.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, ""); // limpia caracteres no numéricos
});

// --- Buscar por id al presionar ENTER ---
a1mSearchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let query = a1mSearchBox.value.trim();

    // Convertir a número
    let idToFind = Number(query);

    // Aproximar al múltiplo inferior de 25
    idToFind = Math.floor(idToFind / 25) * 25;



    // Buscar en el array
    const result = a1mSearch.find(item => item.id === idToFind);

    if (result) {

      map.setView([result.lng, result.lat], 17);
    } else {

    }
  }
});