/**
 * F1 GRAND PRIX CIRCUITS & ROADS ATLAS - APP LOGIC
 * High-performance interactive map explorer for F1 GeoJSON tracks.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    circuits: [],
    filteredCircuits: [],
    selectedCircuit: null,
    searchQuery: '',
    selectedRegion: 'all',
    selectedSeason: 'all',
    selectedSort: 'name_asc',
    showAllTracksOnMap: false,
    currentTileLayer: 'satellite',
    simulation: {
      active: false,
      paused: false,
      animId: null,
      pointIndex: 0,
      subProgress: 0,
      lapTimeMs: 0,
      startTime: null,
      speedKmh: 240,
      chaseCam: true,
      carMarker: null
    }
  };

  // Map & Layer References
  let map = null;
  let baseLayers = {};
  let worldMarkersGroup = null;
  let activeTrackGroup = null;
  let allTracksLayerGroup = null;

  // DOM Elements
  const dom = {
    circuitsList: document.getElementById('circuitsList'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    filterPills: document.querySelectorAll('.filter-pill'),
    sortSelect: document.getElementById('sortSelect'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    sidebarCollapseHandle: document.getElementById('sidebarCollapseHandle'),
    totalCircuitsCount: document.getElementById('totalCircuitsCount'),
    totalDistanceKm: document.getElementById('totalDistanceKm'),
    totalCountriesCount: document.getElementById('totalCountriesCount'),
    worldOverviewBtn: document.getElementById('worldOverviewBtn'),
    // showAllTracksBtn: document.getElementById('showAllTracksBtn'),
    circuitHudCard: document.getElementById('circuitHudCard'),
    hudCountryTag: document.getElementById('hudCountryTag'),
    hudTitle: document.getElementById('hudTitle'),
    hudMinimizeBtn: document.getElementById('hudMinimizeBtn'),
    hudCloseBtn: document.getElementById('hudCloseBtn'),
    hudLengthKm: document.getElementById('hudLengthKm'),
    hudLengthMi: document.getElementById('hudLengthMi'),
    hudOpened: document.getElementById('hudOpened'),
    hudAltitude: document.getElementById('hudAltitude'),
    hudEstLapTime: document.getElementById('hudEstLapTime'),
    hudF1Years: document.getElementById('hudF1Years'),
    hudTotalGps: document.getElementById('hudTotalGps'),
    hudGpNameText: document.getElementById('hudGpNameText'),
    hudYearsChips: document.getElementById('hudYearsChips'),
    hudYearsChipsWrapper: document.getElementById('hudYearsChipsWrapper'),
    simStartBtn: document.getElementById('simStartBtn'),
    simStopBtn: document.getElementById('simStopBtn'),
    simStatusDot: document.getElementById('simStatusDot'),
    simStatusText: document.getElementById('simStatusText'),
    simTimer: document.getElementById('simTimer'),
    simProgressBar: document.getElementById('simProgressBar'),
    downloadGeoJsonBtn: document.getElementById('downloadGeoJsonBtn'),
    copyCoordsBtn: document.getElementById('copyCoordsBtn'),
    tileSatelliteBtn: document.getElementById('tileSatelliteBtn'),
    tileDarkBtn: document.getElementById('tileDarkBtn'),
    tileStreetsBtn: document.getElementById('tileStreetsBtn'),
    fileInput: document.getElementById('fileInput'),
    uploadBtn: document.getElementById('uploadBtn'),
    resultsModal: document.getElementById('f1ResultsModal'),
    modalTitle: document.getElementById('f1ModalTitle'),
    modalSub: document.getElementById('f1ModalSub'),
    modalTag: document.getElementById('f1ModalTag'),
    modalBody: document.getElementById('f1ModalBody'),
    modalCloseBtn: document.getElementById('f1ModalCloseBtn')
  };

  const CIRCUIT_ERGAST_MAP = {
    'au-1953': ['albert_park'],
    'pt-1972': ['estoril'],
    'it-1953': ['imola'],
    'mx-1962': ['rodriguez'],
    'pt-2008': ['portimao'],
    'br-1977': ['jacarepagua'],
    'it-1914': ['mugello'],
    'br-1940': ['interlagos'],
    'it-1922': ['monza'],
    'ar-1952': ['galvez'],
    'bh-2002': ['bahrain'],
    'az-2016': ['baku'],
    'es-1991': ['catalunya'],
    'mc-1929': ['monaco'],
    'fr-1960': ['magny_cours'],
    'be-1925': ['spa'],
    'ca-1978': ['villeneuve'],
    'us-2012': ['americas'],
    'fr-1969': ['ricard'],
    'nl-1948': ['zandvoort'],
    'es-2026': ['madring'],
    'de-1932': ['hockenheimring'],
    'hu-1986': ['hungaroring'],
    'us-1909': ['indianapolis'],
    'tr-2005': ['istanbul'],
    'sa-2021': ['jeddah'],
    'za-1961': ['kyalami'],
    'us-2023': ['vegas', 'las_vegas'],
    'qa-2004': ['losail'],
    'sg-2008': ['marina_bay'],
    'us-2022': ['miami'],
    'de-1927': ['nurburgring'],
    'at-1969': ['red_bull_ring', 'A1-Ring', 'osterreichring'],
    'my-1999': ['sepang'],
    'cn-2004': ['shanghai'],
    'gb-1948': ['silverstone'],
    'ru-2014': ['sochi'],
    'jp-1962': ['suzuka'],
    'us-1956': ['watkins_glen'],
    'ae-2009': ['yas_marina']
  };

  const CALENDAR_2024 = [
    'bh-2002', 'sa-2021', 'au-1953', 'jp-1962', 'cn-2004', 'us-2022',
    'it-1953', 'mc-1929', 'ca-1978', 'es-1991', 'at-1969', 'gb-1948',
    'hu-1986', 'be-1925', 'nl-1948', 'it-1922', 'az-2016', 'sg-2008',
    'us-2012', 'mx-1962', 'br-1940', 'us-2023', 'qa-2004', 'ae-2009'
  ];

  const CALENDAR_2025 = [
    'au-1953', 'cn-2004', 'jp-1962', 'bh-2002', 'sa-2021', 'us-2022',
    'it-1953', 'mc-1929', 'es-1991', 'ca-1978', 'at-1969', 'gb-1948',
    'be-1925', 'hu-1986', 'nl-1948', 'it-1922', 'az-2016', 'sg-2008',
    'us-2012', 'mx-1962', 'br-1940', 'us-2023', 'qa-2004', 'ae-2009'
  ];

  const CALENDAR_2026 = [
    'es-2026', 'au-1953', 'bh-2002', 'sa-2021', 'jp-1962', 'cn-2004',
    'us-2022', 'it-1953', 'mc-1929', 'ca-1978', 'at-1969', 'gb-1948',
    'be-1925', 'hu-1986', 'nl-1948', 'it-1922', 'az-2016', 'sg-2008',
    'us-2012', 'mx-1962', 'br-1940', 'us-2023', 'qa-2004', 'ae-2009'
  ];

  const f1ResultsCache = {};

  /**
   * Initialize Application
   */
  async function init() {
    loadCircuitsData();
    initMap();
    setupEventListeners();
    updateHeaderStats();
    applyFilterAndSort();
    renderCircuitsList();
    renderWorldMarkers();
  }

  /**
   * Load Circuits from circuits-data.js or fallback
   */
  function loadCircuitsData() {
    if (window.F1_CIRCUITS && Array.isArray(window.F1_CIRCUITS)) {
      state.circuits = window.F1_CIRCUITS;
      state.filteredCircuits = [...state.circuits];
    } else {
      console.warn('F1_CIRCUITS not loaded globally. Checking fallback...');
      state.circuits = [];
      state.filteredCircuits = [];
    }
  }

  /**
   * Initialize Leaflet Map
   */
  function initMap() {
    // Default world center view
    map = L.map('map', {
      center: [28.0, 15.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 19,
      zoomControl: false
    });

    // Custom Zoom Control placed top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Tile Layers
    baseLayers.satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri, Maxar, Earthstar Geographics',
        maxZoom: 19
      }
    );

    baseLayers.dark = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19
      }
    );

    baseLayers.streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19
      }
    );

    // Add default layer (Satellite is magnificent for F1 circuits)
    baseLayers.satellite.addTo(map);

    // Layer groups for vectors
    worldMarkersGroup = L.layerGroup().addTo(map);
    allTracksLayerGroup = L.layerGroup().addTo(map);
    activeTrackGroup = L.layerGroup().addTo(map);
  }

  /**
   * Switch Base Tile Layer
   */
  function setBaseTileLayer(layerKey) {
    if (layerKey === state.currentTileLayer) return;

    // Remove old layer
    if (baseLayers[state.currentTileLayer]) {
      map.removeLayer(baseLayers[state.currentTileLayer]);
    }

    // Add new layer
    if (baseLayers[layerKey]) {
      baseLayers[layerKey].addTo(map);
      state.currentTileLayer = layerKey;
    }

    // Update active button state
    [dom.tileSatelliteBtn, dom.tileDarkBtn, dom.tileStreetsBtn].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (layerKey === 'satellite' && dom.tileSatelliteBtn) dom.tileSatelliteBtn.classList.add('active');
    if (layerKey === 'dark' && dom.tileDarkBtn) dom.tileDarkBtn.classList.add('active');
    if (layerKey === 'streets' && dom.tileStreetsBtn) dom.tileStreetsBtn.classList.add('active');
  }

  /**
   * Render SVG Thumbnail directly from LineString coordinates
   */
  function generateTrackSvg(coordinates, width = 68, height = 48, padding = 5) {
    if (!coordinates || coordinates.length < 2) {
      return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><circle cx="${width/2}" cy="${height/2}" r="10" fill="#333"/></svg>`;
    }

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < coordinates.length; i++) {
      const x = coordinates[i][0];
      const y = coordinates[i][1];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    const rangeX = maxX - minX || 0.0001;
    const rangeY = maxY - minY || 0.0001;

    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const scale = Math.min(innerW / rangeX, innerH / rangeY);
    const offsetX = padding + (innerW - rangeX * scale) / 2;
    const offsetY = padding + (innerH - rangeY * scale) / 2;

    let d = '';
    for (let i = 0; i < coordinates.length; i++) {
      const px = offsetX + (coordinates[i][0] - minX) * scale;
      // Invert Y so North is up
      const py = height - (offsetY + (coordinates[i][1] - minY) * scale);
      d += (i === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : ` L ${px.toFixed(1)} ${py.toFixed(1)}`);
    }

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <path d="${d}" fill="none" stroke="#00e5ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="${offsetX + (coordinates[0][0] - minX) * scale}" cy="${height - (offsetY + (coordinates[0][1] - minY) * scale)}" r="2.5" fill="#e10600" />
      </svg>
    `;
  }

  /**
   * Update Header Stats Counters
   */
  function updateHeaderStats() {
    const totalCount = state.circuits.length;
    let totalLenM = 0;
    const countries = new Set();

    state.circuits.forEach(c => {
      totalLenM += (c.length || 0);
      if (c.country) countries.add(c.country);
    });

    const totalKm = Math.round(totalLenM / 1000);

    if (dom.totalCircuitsCount) dom.totalCircuitsCount.textContent = totalCount;
    if (dom.totalDistanceKm) dom.totalDistanceKm.textContent = `${totalKm} km`;
    if (dom.totalCountriesCount) dom.totalCountriesCount.textContent = countries.size;
  }

  /**
   * Filter and Sort Circuits
   */
  function applyFilterAndSort() {
    const query = state.searchQuery.toLowerCase().trim();
    const region = state.selectedRegion;
    const season = state.selectedSeason;

    state.filteredCircuits = state.circuits.filter(c => {
      // Search Match
      const matchesSearch = !query ||
        c.name.toLowerCase().includes(query) ||
        (c.location && c.location.toLowerCase().includes(query)) ||
        (c.country && c.country.toLowerCase().includes(query)) ||
        (c.opened && String(c.opened).includes(query)) ||
        (c.firstgp && String(c.firstgp).includes(query)) ||
        (c.f1Years && c.f1Years.toLowerCase().includes(query)) ||
        (c.grandPrix && c.grandPrix.toLowerCase().includes(query)) ||
        (Array.isArray(c.yearsList) && c.yearsList.some(y => String(y) === query || String(y).includes(query)));

      // Region Match
      let matchesRegion = true;
      if (region && region !== 'all') {
        matchesRegion = c.region && c.region.toLowerCase() === region.toLowerCase();
      }

      // Season Match (2024, 2025, 2026)
      let matchesSeason = true;
      if (season && season !== 'all') {
        if (season === '2024') {
          matchesSeason = CALENDAR_2024.includes(c.id);
        } else if (season === '2025') {
          matchesSeason = CALENDAR_2025.includes(c.id);
        } else if (season === '2026') {
          matchesSeason = CALENDAR_2026.includes(c.id);
        }
      }

      return matchesSearch && matchesRegion && matchesSeason;
    });

    // Sorting
    switch (state.selectedSort) {
      case 'name_asc':
        state.filteredCircuits.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        state.filteredCircuits.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'calendar_2024':
        state.filteredCircuits.sort((a, b) => {
          const idxA = CALENDAR_2024.indexOf(a.id);
          const idxB = CALENDAR_2024.indexOf(b.id);
          if (idxA === -1 && idxB === -1) return a.name.localeCompare(b.name);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });
        break;
      case 'calendar_2025':
        state.filteredCircuits.sort((a, b) => {
          const idxA = CALENDAR_2025.indexOf(a.id);
          const idxB = CALENDAR_2025.indexOf(b.id);
          if (idxA === -1 && idxB === -1) return a.name.localeCompare(b.name);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });
        break;
      case 'calendar_2026':
        state.filteredCircuits.sort((a, b) => {
          const idxA = CALENDAR_2026.indexOf(a.id);
          const idxB = CALENDAR_2026.indexOf(b.id);
          if (idxA === -1 && idxB === -1) return a.name.localeCompare(b.name);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });
        break;
      case 'gps_desc':
        state.filteredCircuits.sort((a, b) => (b.totalGps || 0) - (a.totalGps || 0));
        break;
      case 'gps_asc':
        state.filteredCircuits.sort((a, b) => (a.totalGps || 0) - (b.totalGps || 0));
        break;
      case 'length_desc':
        state.filteredCircuits.sort((a, b) => (b.length || 0) - (a.length || 0));
        break;
      case 'length_asc':
        state.filteredCircuits.sort((a, b) => (a.length || 0) - (b.length || 0));
        break;
      case 'opened_desc':
        state.filteredCircuits.sort((a, b) => (b.opened || 0) - (a.opened || 0));
        break;
      case 'opened_asc':
        state.filteredCircuits.sort((a, b) => (a.opened || 0) - (b.opened || 0));
        break;
      case 'altitude_desc':
        state.filteredCircuits.sort((a, b) => (b.altitude || 0) - (a.altitude || 0));
        break;
      default:
        break;
    }
  }

  /**
   * Render Sidebar Circuit Cards (with Hide/Show Chevron & Collapsible Details)
   */
  function renderCircuitsList() {
    if (!dom.circuitsList) return;

    if (state.filteredCircuits.length === 0) {
      dom.circuitsList.innerHTML = `
        <div class="empty-state">
          <i class="fa fa-flag-checkered"></i>
          <p>No F1 circuits match your search filters.</p>
        </div>
      `;
      return;
    }

    let html = '';
    state.filteredCircuits.forEach(c => {
      const isSelected = state.selectedCircuit && state.selectedCircuit.id === c.id;
      const isHudVisible = isSelected && dom.circuitHudCard && dom.circuitHudCard.classList.contains('visible');
      const km = (c.length / 1000).toFixed(2);
      const coords = c.geojson.features[0].geometry.coordinates;
      const svgThumb = generateTrackSvg(coords, 54, 40);

      // Determine Season Badging and Round
      let seasonBadgeHtml = '';
      if (c.id === 'es-2026') {
        seasonBadgeHtml = '<span class="card-season-pill new-2026" title="New 2026 Formula 1 Host Track">2026 NEW</span>';
      } else if (CALENDAR_2024.includes(c.id) && CALENDAR_2026.includes(c.id)) {
        seasonBadgeHtml = '<span class="card-season-pill" title="Contracted on 2024, 2025 & 2026 Calendars">2024-26</span>';
      } else if (CALENDAR_2024.includes(c.id)) {
        seasonBadgeHtml = '<span class="card-season-pill" title="2024 Formula 1 Calendar Track">2024</span>';
      }

      // Round info when season filter is active
      let roundInfo = '';
      if (state.selectedSeason === '2024' && CALENDAR_2024.includes(c.id)) {
        roundInfo = `<span style="color: var(--cyan-neon); font-size: 11px; font-weight: 700; margin-right: 5px; font-family: var(--font-mono);">R${CALENDAR_2024.indexOf(c.id) + 1}</span>`;
      } else if (state.selectedSeason === '2025' && CALENDAR_2025.includes(c.id)) {
        roundInfo = `<span style="color: var(--cyan-neon); font-size: 11px; font-weight: 700; margin-right: 5px; font-family: var(--font-mono);">R${CALENDAR_2025.indexOf(c.id) + 1}</span>`;
      } else if (state.selectedSeason === '2026' && CALENDAR_2026.includes(c.id)) {
        roundInfo = `<span style="color: var(--cyan-neon); font-size: 11px; font-weight: 700; margin-right: 5px; font-family: var(--font-mono);">R${CALENDAR_2026.indexOf(c.id) + 1}</span>`;
      }

      html += `
        <div class="circuit-card ${isSelected ? 'active' : ''}" data-id="${c.id}">
          <div class="card-svg-thumb">
            ${svgThumb}
          </div>
          <div class="card-info">
            <div class="card-title-line">
              <span class="card-flag">${c.flag || '🏁'}</span>
              <span class="card-title" title="${c.name}">${c.name}</span>
            </div>
            <div class="card-sub-line">
              <span class="card-location">${roundInfo}${c.location || c.country}</span>
              ${seasonBadgeHtml}
              <span class="card-distance-pill">${km} km</span>
            </div>
          </div>
          <button class="card-chevron-btn" aria-label="Toggle circuit HUD" title="${isHudVisible ? 'Hide HUD' : 'Explore Circuit'}">
            <i class="fa ${isHudVisible ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
          </button>
        </div>
      `;
    });

    dom.circuitsList.innerHTML = html;

    // Attach click listeners to cards
    const cards = dom.circuitsList.querySelectorAll('.circuit-card');
    cards.forEach(card => {
      const id = card.getAttribute('data-id');
      const circuit = state.circuits.find(c => c.id === id);
      if (!circuit) return;

      card.addEventListener('click', () => {
        if (state.selectedCircuit && state.selectedCircuit.id === circuit.id) {
          // If already selected, toggle the HUD card
          const isVisible = dom.circuitHudCard.classList.contains('visible');
          if (isVisible) {
            dom.circuitHudCard.classList.remove('visible');
          } else {
            dom.circuitHudCard.classList.add('visible');
          }
          const chevron = card.querySelector('.card-chevron-btn i');
          if (chevron) {
            chevron.className = `fa ${!isVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`;
          }
        } else {
          selectCircuit(circuit, true);
        }
      });
    });
  }

  /**
   * Render Global Markers on Map
   */
  function renderWorldMarkers() {
    worldMarkersGroup.clearLayers();

    const circuitsToRender = state.filteredCircuits.length > 0 ? state.filteredCircuits : state.circuits;

    circuitsToRender.forEach(c => {
      if (!c.center || c.center[0] === 0) return;

      const customIcon = L.divIcon({
        className: 'f1-circuit-marker',
        html: `
          <div class="f1-marker-pin ${state.selectedCircuit && state.selectedCircuit.id === c.id ? 'active' : ''}" title="${c.name}">
            <span>${c.flag || '🏁'}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(c.center, { icon: customIcon });

      const km = (c.length / 1000).toFixed(2);
      const popupHtml = `
        <div class="popup-circuit-title">${c.name}</div>
        <div class="popup-circuit-loc">${c.flag || ''} ${c.location}, ${c.country}</div>
        <div class="popup-circuit-stats">
          <div>Length: <strong>${km} km</strong> (${(c.length * 0.000621371).toFixed(2)} mi)</div>
          <div>F1 Seasons: <strong style="color: #00e5ff;">${c.f1Years || 'N/A'}</strong> (${c.totalGps !== undefined ? c.totalGps : 0} GPs)</div>
          <div>Grand Prix: <strong>${c.grandPrix ? c.grandPrix.split(',')[0] : 'Formula 1'}</strong></div>
          <div>Inaugurated: <strong>${c.opened || 'N/A'}</strong> (1st GP: <strong>${c.firstgp || '—'}</strong>)</div>
        </div>
        <button class="popup-circuit-btn" onclick="window.F1_SELECT_CIRCUIT('${c.id}')">
          🏎️ Explore Track
        </button>
      `;

      marker.bindPopup(popupHtml, { minWidth: 220 });

      marker.on('click', () => {
        selectCircuit(c, false);
      });

      worldMarkersGroup.addLayer(marker);
    });
  }

  // Global helper for popup button click
  window.F1_SELECT_CIRCUIT = function (circuitId) {
    const circuit = state.circuits.find(c => c.id === circuitId);
    if (circuit) {
      selectCircuit(circuit, true);
      map.closePopup();
    }
  };

  /**
   * Select and Zoom into a Circuit
   */
  function selectCircuit(circuit, flyTo = true) {
    state.selectedCircuit = circuit;

    // Stop ongoing simulation if running
    stopSimulation();

    // Re-render card selection state in list and update chevron icons
    const allCards = dom.circuitsList.querySelectorAll('.circuit-card');
    allCards.forEach(c => {
      const isCardSelected = (c.getAttribute('data-id') === circuit.id);
      c.classList.toggle('active', isCardSelected);
      const chevron = c.querySelector('.card-chevron-btn i');
      if (chevron) {
        chevron.className = `fa ${isCardSelected ? 'fa-chevron-up' : 'fa-chevron-down'}`;
      }
      if (isCardSelected) {
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Render active track vector on map
    renderActiveTrack(circuit, flyTo);

    // Update HUD and ensure it is expanded and visible
    updateCircuitHud(circuit);
    if (dom.circuitHudCard) {
      dom.circuitHudCard.classList.remove('minimized');
      dom.circuitHudCard.classList.add('visible');
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 768 && dom.sidebar) {
      dom.sidebar.classList.add('collapsed');
      if (dom.sidebarCollapseHandle) {
        dom.sidebarCollapseHandle.setAttribute('title', 'Expand Sidebar');
      }
    }
  }

  /**
   * Render the active track geometry on the map
   */
  function renderActiveTrack(circuit, flyTo = true) {
    activeTrackGroup.clearLayers();

    const feat = circuit.geojson.features[0];
    const coords = feat.geometry.coordinates; // [ [lon, lat], ... ]
    const latLngs = coords.map(pt => [pt[1], pt[0]]);

    // 1. Asphalt casing / outer track edge
    const roadCasing = L.polyline(latLngs, {
      color: '#080c14',
      weight: 12,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    });

    // 2. Neon / F1 Racing Line
    const racingLine = L.polyline(latLngs, {
      color: '#e10600',
      weight: 5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round'
    });

    // 3. Inner neon glow centerline
    const innerGlow = L.polyline(latLngs, {
      color: '#ffffff',
      weight: 1.5,
      opacity: 0.8,
      dashArray: '8, 8'
    });

    activeTrackGroup.addLayer(roadCasing);
    activeTrackGroup.addLayer(racingLine);
    activeTrackGroup.addLayer(innerGlow);

    // 4. Start / Finish Line Banner Marker
    const startPoint = latLngs[0];
    const gridIcon = L.divIcon({
      className: 'grid-marker-wrap',
      html: `<div class="grid-marker">🏁 START / FINISH</div>`,
      iconSize: [120, 24],
      iconAnchor: [60, 26]
    });
    const gridMarker = L.marker(startPoint, { icon: gridIcon });
    activeTrackGroup.addLayer(gridMarker);

    // 5. Bounding Box & Camera Zoom
    const bbox = circuit.bbox; // [minLon, minLat, maxLon, maxLat]
    if (bbox && flyTo) {
      const bounds = L.latLngBounds([
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]]
      ]);
      map.flyToBounds(bounds, {
        padding: [80, 80],
        maxZoom: 16,
        duration: 1.6
      });
    }
  }

  /**
   * Update the Circuit HUD (Bottom Right Floating Card)
   */
  function updateCircuitHud(circuit) {
    if (!circuit || !dom.circuitHudCard) return;

    const km = (circuit.length / 1000).toFixed(3);
    const miles = (circuit.length * 0.000621371).toFixed(2);

    // Calculate approximate Pole Lap Time at 230 km/h average
    const avgSpeedMs = (230 * 1000) / 3600;
    const estSeconds = circuit.length / avgSpeedMs;
    const estMin = Math.floor(estSeconds / 60);
    const estSec = (estSeconds % 60).toFixed(3);
    const lapTimeStr = `${estMin}:${estSec.padStart(6, '0')}`;

    dom.hudCountryTag.innerHTML = `<span>${circuit.flag || '🏁'}</span> <span>${circuit.location || ''}, ${circuit.country || ''}</span>`;
    dom.hudTitle.textContent = circuit.name;
    dom.hudLengthKm.textContent = `${km} km`;
    dom.hudLengthMi.textContent = `${miles} mi`;
    dom.hudOpened.textContent = circuit.opened ? `${circuit.opened} (GP ${circuit.firstgp || '—'})` : 'Historic';
    dom.hudAltitude.textContent = circuit.altitude ? `${circuit.altitude} m` : 'Sea Level';
    dom.hudEstLapTime.textContent = `~${lapTimeStr}`;

    // F1 Grand Prix Years & History
    if (dom.hudF1Years) {
      dom.hudF1Years.textContent = circuit.f1Years || (circuit.firstgp ? `Since ${circuit.firstgp}` : 'N/A');
    }
    if (dom.hudTotalGps) {
      dom.hudTotalGps.textContent = circuit.totalGps !== undefined ? `${circuit.totalGps} GP${circuit.totalGps === 1 ? '' : 's'}` : 'F1 GP';
    }
    if (dom.hudGpNameText) {
      dom.hudGpNameText.textContent = circuit.grandPrix || 'Formula 1 Grand Prix';
    }

    // Render Year Chips
    if (dom.hudYearsChips) {
      const years = Array.isArray(circuit.yearsList) ? circuit.yearsList : [];
      if (years.length > 0) {
        if (dom.hudYearsChipsWrapper) dom.hudYearsChipsWrapper.style.display = 'block';

        const renderChipHtml = (y) => `
          <button class="f1-year-chip" data-year="${y}" title="Click to view ${y} Grand Prix winner & points scorers" type="button">
            ${y}
          </button>
        `;

        if (years.length <= 14) {
          // Direct chips display
          dom.hudYearsChips.innerHTML = years.map(renderChipHtml).join('');
        } else {
          // Compact with toggle button for circuits with 15+ seasons
          const chipsHtml = years.map(renderChipHtml).join('');
          dom.hudYearsChips.innerHTML = `
            <div id="chipsListInner" style="display: none; flex-wrap: wrap; gap: 4px; width: 100%; margin-bottom: 6px;">
              ${chipsHtml}
            </div>
            <button class="hud-years-toggle-btn" id="toggleYearsListBtn" type="button">
              <i class="fa fa-chevron-down"></i> View all ${years.length} individual years
            </button>
          `;
          const toggleBtn = dom.hudYearsChips.querySelector('#toggleYearsListBtn');
          const innerList = dom.hudYearsChips.querySelector('#chipsListInner');
          if (toggleBtn && innerList) {
            toggleBtn.onclick = (e) => {
              e.stopPropagation();
              const isHidden = innerList.style.display === 'none';
              innerList.style.display = isHidden ? 'flex' : 'none';
              toggleBtn.innerHTML = isHidden ?
                `<i class="fa fa-chevron-up"></i> Hide year list` :
                `<i class="fa fa-chevron-down"></i> View all ${years.length} individual years`;
            };
          }
        }

        // Attach click listeners to all year chips
        const allChips = dom.hudYearsChips.querySelectorAll('.f1-year-chip');
        allChips.forEach(chip => {
          chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const year = chip.getAttribute('data-year');
            openYearResultsModal(year, circuit);
          });
        });
      } else {
        if (dom.hudYearsChipsWrapper) dom.hudYearsChipsWrapper.style.display = 'none';
        dom.hudYearsChips.innerHTML = '';
      }
    }

    // Reset Sim HUD UI
    dom.simProgressBar.style.width = '0%';
    dom.simTimer.textContent = '00:00.000';
    dom.simStatusDot.className = 'sim-indicator-dot';
    dom.simStatusText.textContent = 'Ready';
    dom.simStartBtn.innerHTML = '<i class="fa fa-play"></i> Simulate Lap';

    // Download GeoJSON button
    dom.downloadGeoJsonBtn.onclick = () => {
      downloadGeoJsonFile(circuit);
    };

    // Copy coords button
    dom.copyCoordsBtn.onclick = () => {
      const coordsText = JSON.stringify(circuit.geojson.features[0].geometry.coordinates);
      navigator.clipboard.writeText(coordsText).then(() => {
        alert(`Copied ${circuit.name} coordinates to clipboard!`);
      });
    };

    dom.circuitHudCard.classList.add('visible');
  }

  /**
   * Download GeoJSON file
   */
  function downloadGeoJsonFile(circuit) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(circuit.geojson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${circuit.filename || circuit.id + '.geojson'}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Toggle World Overview
   */
  function zoomToWorldOverview() {
    state.selectedCircuit = null;
    activeTrackGroup.clearLayers();
    stopSimulation();

    if (dom.circuitHudCard) {
      dom.circuitHudCard.classList.remove('visible');
    }

    const allCards = dom.circuitsList.querySelectorAll('.circuit-card');
    allCards.forEach(c => c.classList.remove('active'));

    map.flyTo([28.0, 15.0], 3, { duration: 1.5 });
  }

  /**
   * Toggle Rendering All 40 Tracks on Map
   */
  function toggleShowAllTracks() {
    state.showAllTracksOnMap = !state.showAllTracksOnMap;

    if (dom.showAllTracksBtn) {
      dom.showAllTracksBtn.classList.toggle('active', state.showAllTracksOnMap);
    }

    if (!state.showAllTracksOnMap) {
      allTracksLayerGroup.clearLayers();
      return;
    }

    allTracksLayerGroup.clearLayers();

    state.circuits.forEach(c => {
      const feat = c.geojson.features[0];
      const coords = feat.geometry.coordinates;
      const latLngs = coords.map(pt => [pt[1], pt[0]]);

      const polyline = L.polyline(latLngs, {
        color: '#ff2a44',
        weight: 3.5,
        opacity: 0.95
      });

      polyline.bindTooltip(`<b>${c.name}</b><br>${(c.length/1000).toFixed(2)} km`, {
        permanent: false,
        sticky: true
      });

      polyline.on('click', () => {
        selectCircuit(c, true);
      });

      allTracksLayerGroup.addLayer(polyline);
    });
  }

  /**
   * Lap Simulation (F1 Car Animation on GeoJSON Track)
   */
  function toggleLapSimulation() {
    if (!state.selectedCircuit) return;

    if (state.simulation.active) {
      stopSimulation();
    } else {
      startSimulation();
    }
  }

  function startSimulation() {
    const circuit = state.selectedCircuit;
    if (!circuit) return;

    const coords = circuit.geojson.features[0].geometry.coordinates;
    const latLngs = coords.map(pt => [pt[1], pt[0]]);

    if (latLngs.length < 2) return;

    state.simulation.active = true;
    state.simulation.paused = false;
    state.simulation.pointIndex = 0;
    state.simulation.subProgress = 0;
    state.simulation.startTime = performance.now();

    dom.simStatusDot.className = 'sim-indicator-dot running';
    dom.simStatusText.textContent = 'Racing...';
    dom.simStartBtn.innerHTML = '<i class="fa fa-pause"></i> Pause Lap';

    // Create or reset car marker
    if (state.simulation.carMarker) {
      activeTrackGroup.removeLayer(state.simulation.carMarker);
    }

    const carIcon = L.divIcon({
      className: 'f1-car-icon-wrap',
      html: `<div class="racing-car-marker" id="simCarMarker">🏎️</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    state.simulation.carMarker = L.marker(latLngs[0], { icon: carIcon, zIndexOffset: 1000 });
    activeTrackGroup.addLayer(state.simulation.carMarker);

    runSimulationLoop();
  }

  function runSimulationLoop() {
    if (!state.simulation.active) return;

    const circuit = state.selectedCircuit;
    const coords = circuit.geojson.features[0].geometry.coordinates;
    const latLngs = coords.map(pt => [pt[1], pt[0]]);
    const totalPoints = latLngs.length;

    const sim = state.simulation;
    const speedFactor = 0.045; // Speed multiplier for smooth traversal

    sim.subProgress += speedFactor;

    if (sim.subProgress >= 1.0) {
      sim.subProgress = 0;
      sim.pointIndex++;

      if (sim.pointIndex >= totalPoints - 1) {
        // Lap Completed!
        finishSimulation();
        return;
      }
    }

    // Interpolate position between current point and next point
    const p1 = latLngs[sim.pointIndex];
    const p2 = latLngs[sim.pointIndex + 1];

    const currentLat = p1[0] + (p2[0] - p1[0]) * sim.subProgress;
    const currentLng = p1[1] + (p2[1] - p1[1]) * sim.subProgress;
    const currentPos = [currentLat, currentLng];

    // Update car position
    if (sim.carMarker) {
      sim.carMarker.setLatLng(currentPos);
    }

    // Update Timer & Progress
    const elapsedMs = performance.now() - sim.startTime;
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    const ms = Math.floor(elapsedMs % 1000);
    dom.simTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;

    const totalProgress = ((sim.pointIndex + sim.subProgress) / totalPoints) * 100;
    dom.simProgressBar.style.width = `${Math.min(100, totalProgress)}%`;

    // Chase Cam: smooth pan if enabled
    if (sim.chaseCam && sim.pointIndex % 8 === 0 && sim.subProgress < speedFactor * 1.5) {
      map.panTo(currentPos, { animate: true, duration: 0.3 });
    }

    sim.animId = requestAnimationFrame(runSimulationLoop);
  }

  function stopSimulation() {
    state.simulation.active = false;
    if (state.simulation.animId) {
      cancelAnimationFrame(state.simulation.animId);
      state.simulation.animId = null;
    }

    if (state.simulation.carMarker) {
      activeTrackGroup.removeLayer(state.simulation.carMarker);
      state.simulation.carMarker = null;
    }

    if (dom.simStatusDot) dom.simStatusDot.className = 'sim-indicator-dot';
    if (dom.simStatusText) dom.simStatusText.textContent = 'Stopped';
    if (dom.simStartBtn) dom.simStartBtn.innerHTML = '<i class="fa fa-play"></i> Simulate Lap';
  }

  function finishSimulation() {
    stopSimulation();
    dom.simStatusDot.className = 'sim-indicator-dot';
    dom.simStatusText.textContent = '🏁 Lap Finished!';
    dom.simProgressBar.style.width = '100%';
  }

  /**
   * Handle Custom GeoJSON File Upload
   */
  function handleCustomGeoJson(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const geojson = JSON.parse(e.target.result);
        const feat = geojson.features ? geojson.features[0] : geojson;
        if (!feat || !feat.geometry || !feat.geometry.coordinates) {
          alert('Invalid GeoJSON format. Feature with LineString geometry required.');
          return;
        }

        const customCircuit = {
          filename: file.name,
          id: 'custom-' + Date.now(),
          name: (feat.properties && (feat.properties.Name || feat.properties.name)) || file.name.replace('.geojson', ''),
          location: (feat.properties && (feat.properties.Location || feat.properties.location)) || 'Custom Track',
          country: 'User Track',
          flag: '🏁',
          region: 'Other',
          opened: (feat.properties && feat.properties.opened) || new Date().getFullYear(),
          length: (feat.properties && feat.properties.length) || 5000,
          altitude: (feat.properties && feat.properties.altitude) || 0,
          bbox: geojson.bbox || feat.bbox,
          geojson: geojson
        };

        state.circuits.unshift(customCircuit);
        applyFilterAndSort();
        renderCircuitsList();
        renderWorldMarkers();
        selectCircuit(customCircuit, true);
        alert(`Successfully imported: ${customCircuit.name}!`);
      } catch (err) {
        alert('Error parsing GeoJSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Search input
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      applyFilterAndSort();
      renderCircuitsList();
    });

    // Clear search
    dom.clearSearchBtn.addEventListener('click', () => {
      dom.searchInput.value = '';
      state.searchQuery = '';
      dom.clearSearchBtn.style.display = 'none';
      applyFilterAndSort();
      renderCircuitsList();
    });

    // Season filter pills (2024, 2025, 2026, all)
    const seasonPills = document.querySelectorAll('.season-pill');
    seasonPills.forEach(pill => {
      pill.addEventListener('click', () => {
        seasonPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedSeason = pill.getAttribute('data-season') || 'all';
        applyFilterAndSort();
        renderCircuitsList();
        renderWorldMarkers();
      });
    });

    // Region filter pills
    const regionPills = document.querySelectorAll('.region-pill');
    regionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        regionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedRegion = pill.getAttribute('data-region') || 'all';
        applyFilterAndSort();
        renderCircuitsList();
        renderWorldMarkers();
      });
    });

    // Sort select
    dom.sortSelect.addEventListener('change', (e) => {
      state.selectedSort = e.target.value;
      applyFilterAndSort();
      renderCircuitsList();
      renderWorldMarkers();
    });

    // World overview button
    dom.worldOverviewBtn.addEventListener('click', zoomToWorldOverview);

    // Show all tracks button
    // dom.showAllTracksBtn.addEventListener('click', toggleShowAllTracks);

    // Base Tile Switchers
    if (dom.tileSatelliteBtn) {
      dom.tileSatelliteBtn.addEventListener('click', () => setBaseTileLayer('satellite'));
    }
    if (dom.tileDarkBtn) {
      dom.tileDarkBtn.addEventListener('click', () => setBaseTileLayer('dark'));
    }
    if (dom.tileStreetsBtn) {
      dom.tileStreetsBtn.addEventListener('click', () => setBaseTileLayer('streets'));
    }

    // HUD Close Button
    dom.hudCloseBtn.addEventListener('click', () => {
      dom.circuitHudCard.classList.remove('visible');
      stopSimulation();
      activeTrackGroup.clearLayers();
      state.selectedCircuit = null;
      const allCards = dom.circuitsList.querySelectorAll('.circuit-card');
      allCards.forEach(c => {
        c.classList.remove('active');
        const chevron = c.querySelector('.card-chevron-btn i');
        if (chevron) chevron.className = 'fa fa-chevron-down';
      });
    });

    // Results Modal Close Listeners
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.addEventListener('click', closeResultsModal);
    }
    if (dom.resultsModal) {
      dom.resultsModal.addEventListener('click', (e) => {
        if (e.target === dom.resultsModal) closeResultsModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.resultsModal && dom.resultsModal.classList.contains('active')) {
        closeResultsModal();
      }
    });

    // Sim Start / Stop
    dom.simStartBtn.addEventListener('click', toggleLapSimulation);
    dom.simStopBtn.addEventListener('click', stopSimulation);

    // HUD Minimize Toggle
    if (dom.hudMinimizeBtn) {
      dom.hudMinimizeBtn.addEventListener('click', () => {
        dom.circuitHudCard.classList.toggle('minimized');
        const isMin = dom.circuitHudCard.classList.contains('minimized');
        dom.hudMinimizeBtn.setAttribute('title', isMin ? 'Expand Card' : 'Minimize Card');
      });
    }

    // Sidebar Collapse Handle
    if (dom.sidebarCollapseHandle) {
      dom.sidebarCollapseHandle.addEventListener('click', () => {
        dom.sidebar.classList.toggle('collapsed');
        const isCollapsed = dom.sidebar.classList.contains('collapsed');
        dom.sidebarCollapseHandle.setAttribute('title', isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar');
        if (map) {
          setTimeout(() => map.invalidateSize(), 360);
        }
      });
    }

    // Sidebar Mobile Toggle
    if (dom.sidebarToggleBtn) {
      dom.sidebarToggleBtn.addEventListener('click', () => {
        dom.sidebar.classList.toggle('collapsed');
        if (map) {
          setTimeout(() => map.invalidateSize(), 360);
        }
      });
    }

    // Custom File Upload
    if (dom.uploadBtn && dom.fileInput) {
      dom.uploadBtn.addEventListener('click', () => dom.fileInput.click());
      dom.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleCustomGeoJson(e.target.files[0]);
        }
      });
    }

    // Window Resize
    window.addEventListener('resize', () => {
      if (map) map.invalidateSize();
    });
  }

  /**
   * Historical Grand Prix Results Modal Logic
   */
  function closeResultsModal() {
    if (dom.resultsModal) {
      dom.resultsModal.classList.remove('active');
      dom.resultsModal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        if (!dom.resultsModal.classList.contains('active')) {
          dom.resultsModal.style.display = 'none';
        }
      }, 250);
    }
    const activeChip = document.querySelector('.f1-year-chip.active-year');
    if (activeChip) activeChip.classList.remove('active-year');
  }

  async function openYearResultsModal(year, circuit) {
    if (!circuit || !dom.resultsModal) return;

    // Highlight active chip
    const allChips = document.querySelectorAll('.f1-year-chip');
    allChips.forEach(c => {
      c.classList.toggle('active-year', c.getAttribute('data-year') === String(year));
    });

    // Display Modal
    dom.resultsModal.style.display = 'flex';
    setTimeout(() => dom.resultsModal.classList.add('active'), 10);
    dom.resultsModal.setAttribute('aria-hidden', 'false');

    dom.modalTag.innerHTML = `<i class="fa fa-flag-checkered"></i> <span>F1 ${year} SEASON CLASSIFICATION</span>`;
    dom.modalTitle.textContent = `${circuit.name} (${year})`;
    dom.modalSub.textContent = `${circuit.flag || '🏁'} ${circuit.location}, ${circuit.country} • Fetching official race data...`;

    dom.modalBody.innerHTML = `
      <div class="f1-results-loading">
        <div class="f1-results-spinner"></div>
        <p>Retrieving official ${year} Formula 1 Grand Prix results & point scorers...</p>
      </div>
    `;

    const cacheKey = `${circuit.id}_${year}`;
    if (f1ResultsCache[cacheKey]) {
      renderRaceResults(f1ResultsCache[cacheKey], year, circuit);
      return;
    }

    try {
      const ergastIds = CIRCUIT_ERGAST_MAP[circuit.id] || [];
      let foundRaces = [];

      // 1. Try mapped Ergast/Jolpica circuit IDs
      for (const ergId of ergastIds) {
        try {
          const resp = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/circuits/${ergId}/results.json`);
          if (resp.ok) {
            const data = await resp.json();
            const races = data?.MRData?.RaceTable?.Races || [];
            if (races.length > 0) {
              foundRaces = races;
              break;
            }
          }
        } catch (err) {
          console.warn(`Query ${ergId} error:`, err);
        }
      }

      // 2. If not found by circuit ID, fallback to season query
      if (foundRaces.length === 0) {
        try {
          const resp = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/results.json?limit=100`);
          if (resp.ok) {
            const data = await resp.json();
            const allSeasonRaces = data?.MRData?.RaceTable?.Races || [];
            const cNameLower = circuit.name.toLowerCase();
            const cLocLower = (circuit.location || '').toLowerCase();
            const cCountryLower = (circuit.country || '').toLowerCase();

            foundRaces = allSeasonRaces.filter(r => {
              const rCirc = r.Circuit || {};
              const rcName = (rCirc.circuitName || '').toLowerCase();
              const rcLoc = (rCirc.Location?.locality || '').toLowerCase();
              const rcCountry = (rCirc.Location?.country || '').toLowerCase();
              return rcName.includes(cNameLower) || cNameLower.includes(rcName) ||
                     (cLocLower && (rcLoc.includes(cLocLower) || cLocLower.includes(rcLoc))) ||
                     (cCountryLower && rcCountry.includes(cCountryLower));
            });
          }
        } catch (err) {
          console.warn('Fallback season query failed:', err);
        }
      }

      f1ResultsCache[cacheKey] = foundRaces;
      renderRaceResults(foundRaces, year, circuit);
    } catch (err) {
      console.error('Failed to fetch race results:', err);
      dom.modalBody.innerHTML = `
        <div class="f1-results-empty">
          <i class="fa fa-triangle-exclamation"></i>
          <h3 style="color:#fff; margin-bottom:8px;">Unable to Load Results</h3>
          <p>Could not retrieve race classification data for ${circuit.name} in ${year}.</p>
          <p style="font-size: 12px; color: #64748b;">${err.message || 'Check your internet connection'}</p>
        </div>
      `;
    }
  }

  function renderRaceResults(races, year, circuit) {
    if (!races || races.length === 0) {
      dom.modalSub.textContent = `${circuit.flag || '🏁'} ${circuit.location}, ${circuit.country}`;
      dom.modalBody.innerHTML = `
        <div class="f1-results-empty">
          <i class="fa fa-flag-checkered" style="color: var(--cyan-neon); font-size: 32px;"></i>
          <h3 style="color: #fff; margin-bottom: 8px;">No Championship Results Found</h3>
          <p>No official World Championship Grand Prix recorded for ${circuit.name} in ${year}.</p>
          ${parseInt(year) >= 2025 ? '<p style="color: var(--gold-accent); font-size: 13px; margin-top: 8px;">Scheduled Future Formula 1 Season</p>' : ''}
        </div>
      `;
      return;
    }

    let fullHtml = '';

    races.forEach((race, rIdx) => {
      const results = race.Results || [];
      const winner = results[0] || null;
      // Pilotos puntuables: drivers that scored points in this race
      const pointScorers = results.filter(r => parseFloat(r.points) > 0);
      const displayedScorers = pointScorers.length > 0 ? pointScorers : results.slice(0, 6);
      const remainingDrivers = results.filter(r => !displayedScorers.includes(r));

      const raceName = race.raceName || `${circuit.name} Grand Prix`;
      const raceDate = race.date ? new Date(race.date + 'T12:00:00Z').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';
      const roundText = race.round ? `Round ${race.round}` : '';

      if (rIdx === 0) {
        dom.modalTitle.textContent = `${year} ${raceName}`;
        dom.modalSub.textContent = `${circuit.flag || '🏁'} ${race.Circuit?.circuitName || circuit.name} • ${roundText ? roundText + ' • ' : ''}${raceDate}`;
      }

      const winnerDriver = winner ? `${winner.Driver.givenName} ${winner.Driver.familyName}` : 'Unknown';
      const winnerConstructor = winner?.Constructor?.name || 'Unknown Team';
      const winnerTime = winner?.Time?.time || winner?.status || '';
      const winnerPoints = winner ? `${winner.points} pts` : '';
      const winnerLaps = winner?.laps ? `${winner.laps} Laps` : '';
      const winnerGrid = winner?.grid ? `Started P${winner.grid}` : '';

      fullHtml += `
        ${races.length > 1 ? `<h3 style="color: var(--cyan-neon); margin: ${rIdx > 0 ? '24px' : '0'} 0 12px 0; font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;"><i class="fa fa-flag-checkered"></i> ${raceName} (${raceDate})</h3>` : ''}

        <!-- Winner Spotlight Banner -->
        ${winner ? `
          <div class="f1-winner-spotlight">
            <div class="f1-winner-left">
              <div class="f1-trophy-badge" title="Race Winner">
                <i class="fa fa-trophy"></i>
              </div>
              <div>
                <div class="f1-winner-p1-label">Grand Prix Winner</div>
                <div class="f1-winner-name">${winnerDriver}</div>
                <div class="f1-winner-team">
                  <span class="f1-winner-team-pill">${winnerConstructor}</span>
                  ${winnerGrid ? `<span style="font-size: 11px; color: #94a3b8;">${winnerGrid}</span>` : ''}
                </div>
              </div>
            </div>
            <div class="f1-winner-right">
              <div class="f1-winner-points">+${winnerPoints}</div>
              <div class="f1-winner-time">${winnerTime} ${winnerLaps ? '(' + winnerLaps + ')' : ''}</div>
            </div>
          </div>
        ` : ''}

        <!-- Points Scorers Section (Pilotos Puntuables) -->
        <div class="f1-section-header">
          <div class="f1-section-title">
            <i class="fa fa-list-ol" style="color: var(--cyan-neon);"></i>
            <span>Points Scorers • Pilotos Puntuables</span>
          </div>
          <span class="f1-scorers-count-pill">${displayedScorers.length} Drivers in Points</span>
        </div>

        <div class="f1-table-wrap">
          <table class="f1-results-table">
            <thead>
              <tr>
                <th style="width: 45px;">Pos</th>
                <th>Driver / Piloto</th>
                <th>Constructor</th>
                <th style="text-align: right;">Time / Status</th>
                <th style="text-align: right; width: 85px;">Points</th>
              </tr>
            </thead>
            <tbody>
              ${displayedScorers.map(r => {
                const pos = r.position;
                let badgeClass = '';
                let posIcon = '';
                if (pos === '1') { badgeClass = 'gold'; posIcon = ' 🥇'; }
                else if (pos === '2') { badgeClass = 'silver'; posIcon = ' 🥈'; }
                else if (pos === '3') { badgeClass = 'bronze'; posIcon = ' 🥉'; }

                const dName = `${r.Driver.givenName} ${r.Driver.familyName}`;
                const cName = r.Constructor.name;
                const timeText = r.Time?.time || r.status || '—';
                const gridText = r.grid ? `P${r.grid}` : '';

                return `
                  <tr>
                    <td>
                      <span class="f1-pos-badge ${badgeClass}">${pos}</span>
                    </td>
                    <td>
                      <div class="f1-driver-col">
                        ${dName}${posIcon}
                        ${gridText ? `<span style="font-size: 10px; color: #64748b; font-weight: normal; margin-left: 6px;">[Grid: ${gridText}]</span>` : ''}
                      </div>
                    </td>
                    <td>
                      <span class="f1-team-pill">${cName}</span>
                    </td>
                    <td style="text-align: right;">
                      <span class="f1-time-col">${timeText}</span>
                    </td>
                    <td style="text-align: right;">
                      <span class="f1-points-col">+${r.points}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Remaining Classified Drivers Toggle -->
        ${remainingDrivers.length > 0 ? `
          <div style="margin-top: 10px; margin-bottom: 16px;">
            <button class="f1-toggle-full-btn" id="toggleGridBtn_${rIdx}" type="button">
              <i class="fa fa-chevron-down"></i> View Remaining Classified Drivers (${remainingDrivers.length} more)
            </button>
            <div id="remainingDriversWrap_${rIdx}" style="display: none; margin-top: 10px;" class="f1-table-wrap">
              <table class="f1-results-table">
                <thead>
                  <tr>
                    <th style="width: 45px;">Pos</th>
                    <th>Driver</th>
                    <th>Constructor</th>
                    <th style="text-align: right;">Laps / Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${remainingDrivers.map(r => {
                    const dName = `${r.Driver.givenName} ${r.Driver.familyName}`;
                    const cName = r.Constructor.name;
                    const statusText = r.Time?.time || r.status || 'DNF';
                    return `
                      <tr>
                        <td>
                          <span class="f1-pos-badge">${r.positionText || r.position}</span>
                        </td>
                        <td>
                          <span class="f1-driver-col" style="color: #cbd5e1;">${dName}</span>
                        </td>
                        <td>
                          <span class="f1-team-pill">${cName}</span>
                        </td>
                        <td style="text-align: right;">
                          <span class="f1-time-col">${statusText} (${r.laps} Laps)</span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
      `;
    });

    dom.modalBody.innerHTML = fullHtml;

    // Attach listeners for remaining drivers toggles
    races.forEach((_, rIdx) => {
      const toggleBtn = dom.modalBody.querySelector(`#toggleGridBtn_${rIdx}`);
      const wrap = dom.modalBody.querySelector(`#remainingDriversWrap_${rIdx}`);
      if (toggleBtn && wrap) {
        toggleBtn.onclick = () => {
          const isHidden = wrap.style.display === 'none';
          wrap.style.display = isHidden ? 'block' : 'none';
          toggleBtn.innerHTML = isHidden
            ? `<i class="fa fa-chevron-up"></i> Hide Remaining Drivers`
            : `<i class="fa fa-chevron-down"></i> View Remaining Classified Drivers`;
        };
      }
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
