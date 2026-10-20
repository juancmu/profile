// Clock Update
function updateClock() {
  const now = new Date();
  const timeString = now.toISOString().substring(11, 19) + ' UTC';
  document.getElementById('clockDisplay').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Map Initialization
const map = L.map('map', {
  zoomControl: false,
  attributionControl: false,
  rotate: true,
  touchRotate: true,
  rotateControl: {
    closeOnZeroBearing: false,
    position: 'topleft'
  }
}).setView([4.7185, -74.1945], 11);

// Move rotate control into the search bar container
const rotateEl = document.querySelector('.leaflet-control-rotate');
const rotateContainer = document.getElementById('rotate-control-container');
if (rotateEl && rotateContainer) {
  rotateEl.style.margin = '0';
  rotateEl.style.border = 'none';
  rotateEl.style.boxShadow = 'none';
  rotateEl.title = 'Click and hold to rotate';
  // Remove placeholder icon
  const placeholderIcon = rotateContainer.querySelector('.bi-arrow-up-down');
  if (placeholderIcon) rotateContainer.removeChild(placeholderIcon);
  rotateContainer.appendChild(rotateEl);
}

// Custom Controls Logic
document.getElementById('btnZoomIn').addEventListener('click', () => map.zoomIn());
document.getElementById('btnZoomOut').addEventListener('click', () => map.zoomOut());

let locationMarker = null;
let locationCircle = null;
let isTrackingLocation = false;
const btnLocate = document.getElementById('btnLocate');

btnLocate.addEventListener('click', () => {
  if (!isTrackingLocation) {
    isTrackingLocation = true;
    btnLocate.style.color = "var(--cyan)";
    btnLocate.style.textShadow = "var(--cyan-glow)";
    map.locate({setView: true, maxZoom: 18, watch: true, enableHighAccuracy: true});
  } else {
    isTrackingLocation = false;
    btnLocate.style.color = "";
    btnLocate.style.textShadow = "";
    map.stopLocate();
    if(locationMarker) {
      map.removeLayer(locationMarker);
      map.removeLayer(locationCircle);
      locationMarker = null;
      locationCircle = null;
    }
  }
});

map.on('locationfound', (e) => {
  const radius = e.accuracy;
  if(locationMarker) {
    locationMarker.setLatLng(e.latlng);
    locationCircle.setLatLng(e.latlng);
    locationCircle.setRadius(radius);
  } else {
    locationMarker = L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();
    locationCircle = L.circle(e.latlng, radius).addTo(map);
  }
});

map.on('locationerror', (e) => {
  isTrackingLocation = false;
  btnLocate.style.color = "";
  btnLocate.style.textShadow = "";
  alert(e.message);
});

// Street View on map click
map.on('click', (e) => {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  const streetViewLink = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + lat + ',' + lng;

  L.popup()
    .setLatLng(e.latlng)
    .setContent(`<div style="text-align: center;"><a href='${streetViewLink}' target='_blank' style='color: #00f0ff; text-decoration: none; font-weight: bold; font-family: "Rajdhani", sans-serif; font-size: 16px;'><i class="bi bi-person-walking"></i> View in Street View</a></div>`)
    .openOn(map);
});

const cartoDark = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
  maxZoom: 23,
});

const cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 23,
});
cartoLight.addTo(map);

const cartoColor = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 23,
});

const googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 24,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

const Esri_WorldImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 24,
});

const neonColors = {
  project: "#ff00ff",
  util: "#00f0ff",
  comp: "#39ff14",
  delivered: "#00ff66",
  pending: "#ff3c3c"
};

function getStyle(type, feature) {
  const isDelivered = feature.properties.EFR_ENTRG === "DELIVERED";
  const baseColor = neonColors[type];
  const fillColor = isDelivered ? neonColors.delivered : neonColors.pending;
  return {
    color: baseColor,
    weight: 2,
    fillColor: fillColor,
    fillOpacity: 0.3
  };
}

// Data Loading & Processing
async function loadGeoJSON(url) {
  const resp = await fetch(url);
  return resp.json();
}

let searchData = [];
let a1mSearch = [];
let sectionBounds = {};

async function initDashboard() {
  try {
    const [efrData, utilData, compData, sectionsData, pksData] = await Promise.all([
      loadGeoJSON("../data/landsEFR.geojson"),
      loadGeoJSON("../data/landsUtil.geojson"),
      loadGeoJSON("../data/landsComp.geojson"),
      loadGeoJSON("../data/sections.geojson"),
      loadGeoJSON("../data/1m.geojson")
    ]);

    // Build Search Data Helper
    const buildSearchData = (feature, layer, sourceName) => {
      if (feature.properties) {
        let name = feature.properties.PARCEL_ID || feature.properties.PREDIO || "Unknown";
        searchData.push({
          name: String(name),
          source: sourceName,
          lat: layer.getBounds().getCenter().lat,
          lng: layer.getBounds().getCenter().lng
        });
      }
    };

    // Add to map
    const layerEFR = L.geoJSON(efrData, { 
      style: (f) => getStyle('project', f),
      onEachFeature: (f, l) => buildSearchData(f, l, "Lands Project")
    }).addTo(map);

    const layerUtil = L.geoJSON(utilData, { 
      style: (f) => getStyle('util', f),
      onEachFeature: (f, l) => buildSearchData(f, l, "Lands Utilities")
    }).addTo(map);

    const layerComp = L.geoJSON(compData, { 
      style: (f) => getStyle('comp', f),
      onEachFeature: (f, l) => buildSearchData(f, l, "Lands Secondary")
    }).addTo(map);

    const layerSections = L.geoJSON(sectionsData, {
      style: { color: "#ff9900", weight: 2, dashArray: "5, 5", fillOpacity: 0 },
      onEachFeature: (feature, layer) => {
        const tramo = feature.properties.Tramo;
        if(tramo) {
          const b = layer.getBounds();
          sectionBounds[tramo] = sectionBounds[tramo] ? sectionBounds[tramo].extend(b) : b;
        }
      }
    }).addTo(map);

    // Populate PK Search Data
    L.geoJSON(pksData, {
      onEachFeature: (feature, layer) => {
        if(feature.properties.id !== undefined) {
          let latVal = feature.properties.POINT_X !== undefined ? feature.properties.POINT_X : layer.getLatLng().lng;
          let lngVal = feature.properties.POINT_Y !== undefined ? feature.properties.POINT_Y : layer.getLatLng().lat;
          a1mSearch.push({
            id: Number(feature.properties.id),
            lat: latVal,
            lng: lngVal
          });
        }
      }
    });



    // Setup Tree Control
    const baseTree = {
      label: "Base Maps",
      children: [
        { label: "Dark Map", layer: cartoDark },
        { label: "Light Map", layer: cartoLight },
        { label: "Color Map", layer: cartoColor },
        { label: "Google Sat", layer: googleSat },
        { label: "Esri Sat", layer: Esri_WorldImagery }
      ]
    };

    const overlaysTree = {
      label: "Cfro Layers",
      selectAllCheckbox: true,
      children: [
        {
          label: "Reference",
          children: [
            { label: "Sections", layer: layerSections }
          ]
        },
        {
          label: "Areas",
          selectAllCheckbox: true,
          children: [
            { label: "Project Lands", layer: layerEFR },
            { label: "Utilities Lands", layer: layerUtil },
            { label: "Secondary Lands", layer: layerComp }
          ]
        }
      ]
    };

    L.control.layers.tree(baseTree, overlaysTree, {
      namedToggle: false,
      selectorBack: false,
      closedSymbol: '&#8862; &#x1f4c1;',
      openedSymbol: '&#8863; &#x1f4c2;',
      collapseAll: 'Collapse all',
      expandAll: 'Expand all'
    }).addTo(map);

    // Calculate Stats
    let total = 0;
    let delivered = 0;
    let pending = 0;
    
    let alerts = [];
    let sectorStats = { 
      'URBANO': { delivered: 0, pending: 0 },
      'SUBURBANO': { delivered: 0, pending: 0 }
    };

    const processFeatures = (features, source) => {
      features.forEach(f => {
        total++;
        const p = f.properties;
        const isDelivered = p.EFR_ENTRG === "DELIVERED";
        const sector = p.SECTOR || "UNKNOWN";
        const timeStr = (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (isDelivered) {
          delivered++;
          if(sectorStats[sector]) sectorStats[sector].delivered++;
          alerts.push({ type: 'delivered', tag: '[INFO]', msg: `Delivered - ${p.PREDIO || p.PARCEL_ID || 'Unknown ID'}`, time: timeStr, source });
        } else {
          pending++;
          if(sectorStats[sector]) sectorStats[sector].pending++;
          alerts.push({ type: 'pending', tag: '[ALERT]', msg: `Pending - ${p.PREDIO || p.PARCEL_ID || 'Unknown ID'}`, time: timeStr, source });
        }
      });
    };

    processFeatures(efrData.features || [], "Project");
    processFeatures(utilData.features || [], "Utilities");
    processFeatures(compData.features || [], "Secondary");

    // Update Overview Stats
    document.getElementById('valTotal').textContent = total.toLocaleString();
    document.getElementById('valDelivered').textContent = delivered.toLocaleString();
    document.getElementById('valPending').textContent = pending.toLocaleString();

    // Populate Alert Feed
    // Shuffle and pick top 50 to simulate a live feed since dataset is large
    alerts.sort(() => 0.5 - Math.random());
    const feedHtml = alerts.slice(0, 50).map(a => `
      <div class="alert-card ${a.type}">
        <div>
          <span class="alert-tag">${a.tag}</span> 
          ${a.msg} 
          <span style="color:var(--text-muted)">(${a.source})</span>
        </div>
        <div class="alert-time">${a.time}</div>
      </div>
    `).join('');
    document.getElementById('alertFeedContainer').innerHTML = feedHtml;

    // Charts Config
    Chart.defaults.color = "#64748b";
    Chart.defaults.font.family = "'Rajdhani', sans-serif";
    
    // Bar Chart
    const ctxBar = document.getElementById('progressChart').getContext('2d');
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['URBANO', 'SUBURBANO'],
        datasets: [
          {
            label: 'Delivered',
            data: [sectorStats['URBANO'].delivered, sectorStats['SUBURBANO'].delivered],
            backgroundColor: 'rgba(0, 255, 102, 0.8)',
            borderColor: neonColors.delivered,
            borderWidth: 1
          },
          {
            label: 'Pending',
            data: [sectorStats['URBANO'].pending, sectorStats['SUBURBANO'].pending],
            backgroundColor: 'rgba(255, 60, 60, 0.8)',
            borderColor: neonColors.pending,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });

    // Donut Chart
    const ctxDonut = document.getElementById('statusChart').getContext('2d');
    const effPercent = total > 0 ? Math.round((delivered / total) * 100) : 0;
    document.getElementById('donutCenterText').textContent = effPercent + '%';

    new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: ['Delivered', 'Pending'],
        datasets: [{
          data: [delivered, pending],
          backgroundColor: [neonColors.delivered, neonColors.pending],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { display: false }
        }
      }
    });

    // Search Land Logic
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
        const grouped = filtered.reduce((acc, item) => {
          if (!acc[item.source]) acc[item.source] = [];
          acc[item.source].push(item);
          return acc;
        }, {});

        let html = "";
        for (const category in grouped) {
          grouped[category].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
          html += `<div style="padding: 5px 10px; color: var(--cyan); border-bottom: 1px solid rgba(255,255,255,0.1);"><strong>${category}</strong></div>`;
          grouped[category].forEach(item => {
            html += `<div class="search-item" data-lat="${item.lat}" data-lng="${item.lng}" style="padding: 5px 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px;">${item.name}</div>`;
          });
        }
        resultsDiv.innerHTML = html;
        resultsDiv.style.display = "block";
      } else {
        resultsDiv.innerHTML = `<div style="padding: 5px 10px; font-size: 12px;">No results found</div>`;
        resultsDiv.style.display = "block";
      }
    });

    resultsDiv.addEventListener("click", function(e) {
      if (e.target.classList.contains("search-item")) {
        const lat = parseFloat(e.target.dataset.lat);
        const lng = parseFloat(e.target.dataset.lng);
        map.setView([lat, lng], 20);
        resultsDiv.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (!resultsDiv.contains(e.target) && e.target !== searchBox) {
        resultsDiv.style.display = "none";
      }
    });

    // Search PK Logic
    const a1mSearchBox = document.getElementById("a1mSearchBox");
    a1mSearchBox.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, ""); // Allow only numbers
    });

    a1mSearchBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        let query = a1mSearchBox.value.trim();
        let idToFind = Number(query);
        idToFind = Math.floor(idToFind / 25) * 25;

        const result = a1mSearch.find(item => item.id === idToFind);
        if (result) {
          map.setView([result.lng, result.lat], 17);
        }
      }
    });

    // Section Filter Logic
    document.getElementById("sectionFilter").addEventListener("change", function () {
      const val = parseInt(this.value);
      if (!val) {
        if(layerSections.getBounds().isValid()) {
          map.fitBounds(layerSections.getBounds());
        }
      } else if (sectionBounds[val]) {
        map.fitBounds(sectionBounds[val], { padding: [40, 40] });
      }
    });

  } catch(e) {
    console.error("Error loading dashboard data:", e);
  }
}

initDashboard();
