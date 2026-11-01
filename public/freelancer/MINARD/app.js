/**
 * Carte Figurative — Napoleon's 1812 Russian Campaign (Minard Map)
 * Interactive Leaflet Atlas & Synchronized Temperature/Attrition Graph
 * Full Bilingual Support (ES / EN)
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. Bilingual UI Dictionary & Historical Enrichment Tables
  // =========================================================================

  const UI_STRINGS = {
    en: {
      cartographerBadge: "Charles Joseph Minard · Paris, 20 Nov 1869 (Adapted Interactive Edition)",
      origMapBtnSub: "1869 Lithograph",
      origMapBtnLabel: "📜 Original Map",
      origDialogTitle: "Original Lithograph — Carte Figurative (1869)",
      origOpenPopupWin: "↗ Open in Popup Window",
      origCloseDialog: "✕ Close",
      kpi1Label: "Initial Crossing (Kowno)",
      kpi1Unit: "men",
      kpi2Label: "Reached Moscow",
      kpi2Unit: "men",
      kpi3Label: "Returned (Main & Flanks)",
      kpi3Unit: "men (2.4%)",
      kpi4Label: "Coldest Recorded",
      storyTour: "Story Tour",
      pauseTour: "Pause Tour",
      fullExtent: "Full Extent",
      themeParchment: "Theme: Parchment",
      themeDark: "Theme: Dark Slate",
      phaseLabel: "Phase:",
      phaseAll: "All Phases",
      phaseAdvance: "Advance (Jun–Sep)",
      phaseRetreat: "Retreat (Oct–Dec)",
      corpsLabel: "Corps / Route:",
      routeAll: "All Routes (Main + Northern Flanks)",
      routeMain: "Main Corps (Kowno ↔ Moscow)",
      routePolotsk: "Oudinot / Saint-Cyr (Kowno ↔ Polotsk → Studienska)",
      routeRiga: "Macdonald (Kowno ↔ Riga)",
      chkTroopLabels: "Troop Band Labels",
      chkConnectPath: "Chronological Path",
      chkRivers: "Key Rivers",
      legendTitle: "Minard Flow & Markers",
      legendHide: "Hide",
      legendShow: "Show",
      legendAdvStrong: "Advance",
      legendAdvDesc: "(Band width = Troop count)",
      legendRetStrong: "Retreat",
      legendRetDesc: "(Withering winter march)",
      legendWpAdv: "Advance Waypoint (Jun–Oct 1812)",
      legendWpRet: "Retreat Waypoint (Oct–Dec 1812)",
      legendNote: "Click any flow polygon or numbered waypoint to inspect troop strength, casualties, and historical context.",
      prevEvent: "← Previous Event",
      nextEvent: "Next Event →",
      tempTitle: "Tableau Graphique — Retreat Temperature (°C / °Réaumur) & Surviving Troops by Longitude",
      tempSubtitle: "Aligned West-to-East (24.0°E Kaunas ↔ 37.6°E Moscow) with the map above. Hover or click any point to highlight the corresponding stage on the map.",
      tempLegendAdv: "Advance Troops",
      tempLegendRet: "Retreat Troops",
      tempLegendCold: "Freezing Temp (°C)",
      tabTimeline: "Chronicle (27 Events)",
      tabSegments: "Flow Bands (45)",
      tabNotes: "Historical Context",
      searchPlaceholder: "Search city, battle, marshal, or date...",
      noEventsMatch: "No campaign events match your current filter.",
      phaseWordAdvance: "Advance",
      phaseWordRetreat: "Retreat",
      stopWord: "Stop",
      troopsWord: "Troops",
      tempWord: "Temp",
      eventCounter: (curr, total) => `Event ${curr} of ${total}`,
      popupTroops: (mov, count) => `${mov}: ${count} Troops`,
      popupMeta: (route, pctCorps, pctTotal) => `Route: ${route} (${pctCorps}% of corps peak · ${pctTotal}% of Grande Armée)`,
      segMen: "men",
      segBranchPeak: "% of branch peak",
      segmentsSummaryHtml: `<p>The <code>napoleon-campain.geojson</code> layer contains <strong>45 polygonal flow buffers</strong> digitized from Minard's chart. Click any segment to zoom and inspect its troop density.</p>`,
      historicalArticleHtml: `
        <h3>About Minard’s 1869 Masterpiece</h3>
        <p>
          Published by retired French civil engineer <strong>Charles Joseph Minard</strong> (1781–1870) on November 20, 1869, the <em>Carte Figurative</em> is celebrated by Edward Tufte as potentially the best statistical graphic ever drawn. It weaves six variables into a single two-dimensional surface:
        </p>
        <ul>
          <li><strong>Troop Headcount:</strong> Represented by the width of the flow zones (one millimeter per 10,000 men on the original print).</li>
          <li><strong>Geographic Coordinates:</strong> Latitude and longitude across Lithuania, Latvia, Belarus, and Russia.</li>
          <li><strong>Direction of Movement:</strong> Warm chamois/gold for the advance toward Moscow; dark charcoal for the catastrophic retreat.</li>
          <li><strong>Army Detachments:</strong> Macdonald’s X Corps to Riga in the north, Oudinot/Saint-Cyr’s II &amp; VI Corps at Polotsk, and the main Grande Armée column.</li>
          <li><strong>Dates &amp; Key Battles:</strong> From crossing the Niemen on June 24, 1812, to re-crossing at Kaunas on December 14, 1812.</li>
          <li><strong>Freezing Winter Temperatures:</strong> Plotted on the Réaumur scale below the map, showing how the −20°R to −30°R (−25°C to −37.5°C) freezes devastated the retreating survivors at the Berezina and Molodechno.</li>
        </ul>
        <h3>Adaptations Made to the Dataset</h3>
        <p>
          This interactive map directly loads the three workspace GeoJSON datasets in <code>data/</code> and enriches them with historical context:
        </p>
        <ul>
          <li><strong><code>data/napoleon-campain.geojson</code> (45 MultiPolygons):</strong> Rendered with proportional stroke/fill styling and interactive troop attrition calculations.</li>
          <li><strong><code>data/napoleon-Adv.geojson</code> (13 Waypoints):</strong> Standardized bilingual dates, reconciled calendar ordering around Borodino and Mozhaisk, and linked local troop estimates to each waypoint.</li>
          <li><strong><code>data/napoleon-ret.geojson</code> (14 Waypoints):</strong> Reordered chronologically from the surprise attack at Tarutino (18 Oct) and evacuation of Moscow (19 Oct) to the final bridge crossing at Kaunas (14 Dec), paired with Minard's temperature readings.</li>
        </ul>
      `,
    },
    es: {
      cartographerBadge: "Charles Joseph Minard · París, 20 Nov 1869 (Edición Interactiva Adaptada)",
      origMapBtnSub: "Litografía 1869",
      origMapBtnLabel: "📜 Mapa Original",
      origDialogTitle: "Litografía Original — Carte Figurative (1869)",
      origOpenPopupWin: "↗ Abrir en Ventana Emergente",
      origCloseDialog: "✕ Cerrar",
      kpi1Label: "Cruce Inicial (Kowno)",
      kpi1Unit: "hombres",
      kpi2Label: "Llegaron a Moscú",
      kpi2Unit: "hombres",
      kpi3Label: "Regresaron (Total)",
      kpi3Unit: "hombres (2.4%)",
      kpi4Label: "Mínima Registrada",
      storyTour: "Recorrido Histórico",
      pauseTour: "Pausar Recorrido",
      fullExtent: "Vista Completa",
      themeParchment: "Tema: Pergamino",
      themeDark: "Tema: Pizarra Oscura",
      phaseLabel: "Fase:",
      phaseAll: "Todas las Fases",
      phaseAdvance: "Avance (Jun–Sep)",
      phaseRetreat: "Retirada (Oct–Dic)",
      corpsLabel: "Cuerpo / Ruta:",
      routeAll: "Todas las Rutas (Principal + Flancos Norte)",
      routeMain: "Cuerpo Principal (Kowno ↔ Moscú)",
      routePolotsk: "Oudinot / Saint-Cyr (Kowno ↔ Pólatsk → Studienska)",
      routeRiga: "Macdonald (Kowno ↔ Riga)",
      chkTroopLabels: "Etiquetas de Tropas",
      chkConnectPath: "Ruta Cronológica",
      chkRivers: "Ríos Clave",
      legendTitle: "Flujo de Minard y Marcadores",
      legendHide: "Ocultar",
      legendShow: "Mostrar",
      legendAdvStrong: "Avance",
      legendAdvDesc: "(Ancho de banda = N.º de tropas)",
      legendRetStrong: "Retirada",
      legendRetDesc: "(Marcha invernal de desgaste)",
      legendWpAdv: "Hito de Avance (Jun–Oct 1812)",
      legendWpRet: "Hito de Retirada (Oct–Dic 1812)",
      legendNote: "Haz clic en cualquier polígono de flujo o marcador numerado para inspeccionar efectivos, bajas y contexto histórico.",
      prevEvent: "← Evento Anterior",
      nextEvent: "Siguiente Evento →",
      tempTitle: "Tableau Graphique — Temperatura en la Retirada (°C / °Réaumur) y Tropas Supervivientes por Longitud",
      tempSubtitle: "Alineado de Oeste a Este (24.0°E Kaunas ↔ 37.6°E Moscú) con el mapa superior. Pasa el cursor o haz clic en cualquier punto para resaltar la etapa en el mapa.",
      tempLegendAdv: "Tropas en Avance",
      tempLegendRet: "Tropas en Retirada",
      tempLegendCold: "Temp. de Congelación (°C)",
      tabTimeline: "Crónica (27 Eventos)",
      tabSegments: "Bandas de Flujo (45)",
      tabNotes: "Contexto Histórico",
      searchPlaceholder: "Buscar ciudad, batalla, mariscal o fecha...",
      noEventsMatch: "Ningún evento de la campaña coincide con el filtro actual.",
      phaseWordAdvance: "Avance",
      phaseWordRetreat: "Retirada",
      stopWord: "Parada",
      troopsWord: "Tropas",
      tempWord: "Temp",
      eventCounter: (curr, total) => `Evento ${curr} de ${total}`,
      popupTroops: (mov, count) => `${mov}: ${count} soldados`,
      popupMeta: (route, pctCorps, pctTotal) => `Ruta: ${route} (${pctCorps}% del pico del cuerpo · ${pctTotal}% de la Grande Armée)`,
      segMen: "hombres",
      segBranchPeak: "% del pico del ramal",
      segmentsSummaryHtml: `<p>La capa <code>napoleon-campain.geojson</code> contiene <strong>45 polígonos de flujo</strong> digitalizados a partir del gráfico de Minard. Haz clic en cualquier segmento para acercar y consultar su densidad de tropas.</p>`,
      historicalArticleHtml: `
        <h3>Sobre la Obra Maestra de Minard (1869)</h3>
        <p>
          Publicado por el ingeniero civil francés <strong>Charles Joseph Minard</strong> (1781–1870) el 20 de noviembre de 1869, la <em>Carte Figurative</em> es reconocida por Edward Tufte como posiblemente el mejor gráfico estadístico jamás dibujado. Integra seis variables en una sola superficie bidimensional:
        </p>
        <ul>
          <li><strong>Efectivos Militares:</strong> Representados por el grosor de las bandas de flujo (un milímetro por cada 10,000 hombres en la lámina original).</li>
          <li><strong>Coordenadas Geográficas:</strong> Latitud y longitud a través de Lituania, Letonia, Bielorrusia y Rusia.</li>
          <li><strong>Dirección del Movimiento:</strong> Dorado/gamuza para el avance hacia Moscú; carbón oscuro para la catastrófica retirada.</li>
          <li><strong>Destacamentos del Ejército:</strong> El X Cuerpo de Macdonald hacia Riga al norte, los Cuerpos II y VI de Oudinot/Saint-Cyr en Pólatsk y la columna principal de la Grande Armée.</li>
          <li><strong>Fechas y Batallas Clave:</strong> Desde el cruce del río Niemen el 24 de junio de 1812 hasta el retorno en Kaunas el 14 de diciembre de 1812.</li>
          <li><strong>Temperaturas Invernales:</strong> Trazadas en la escala Réaumur debajo del mapa, mostrando cómo las heladas de −20°R a −30°R (−25°C a −37.5°C) diezmaron a los supervivientes en el Berézina y Molodechno.</li>
        </ul>
        <h3>Adaptaciones Realizadas a los Datos</h3>
        <p>
          Este visor interactivo carga directamente los tres conjuntos de datos GeoJSON en <code>data/</code> y los enriquece con contexto histórico bilingüe:
        </p>
        <ul>
          <li><strong><code>data/napoleon-campain.geojson</code> (45 MultiPolígonos):</strong> Representados con estilos proporcionales y cálculo interactivo de desgaste de tropas.</li>
          <li><strong><code>data/napoleon-Adv.geojson</code> (13 Hitos de Avance):</strong> Fechas estandarizadas, orden cronológico reconciliado en torno a Borodinó y Mozhaisk, y estimación de tropas vinculada a cada punto.</li>
          <li><strong><code>data/napoleon-ret.geojson</code> (14 Hitos de Retirada):</strong> Ordenados cronológicamente desde el ataque sorpresa en Tarútino (18 Oct) y la evacuación de Moscú (19 Oct) hasta el cruce final del puente en Kaunas (14 Dic), integrados con las lecturas térmicas de Minard.</li>
        </ul>
      `,
    },
  };

  // Minard's original 1869 "Tableau Graphique de la Température" (Réaumur & Celsius)
  const MINARD_TEMPERATURES = [
    { lon: 37.62, lat: 55.76, tempR: 0, tempC: 0.0, date: "18 Oct", place: "Moscow", placeEs: "Moscú", troops: 100000 },
    { lon: 36.02, lat: 55.50, tempR: 0, tempC: 0.0, date: "28 Oct", place: "Mozhaisk", placeEs: "Mozhaisk", troops: 96000 },
    { lon: 34.29, lat: 55.21, tempR: -4, tempC: -5.0, date: "3 Nov", place: "Viazma", placeEs: "Viazma", troops: 65000 },
    { lon: 32.00, lat: 54.61, tempR: -9, tempC: -11.3, date: "9 Nov", place: "Smolensk", placeEs: "Smolensk", troops: 37000 },
    { lon: 31.43, lat: 54.57, tempR: -21, tempC: -26.3, date: "14 Nov", place: "Krasny", placeEs: "Krasni", troops: 24000 },
    { lon: 29.27, lat: 54.34, tempR: -11, tempC: -13.8, date: "24 Nov", place: "Bobr", placeEs: "Bobr", troops: 20000 },
    { lon: 28.36, lat: 54.33, tempR: -20, tempC: -25.0, date: "28 Nov", place: "Studienska", placeEs: "Studienska", troops: 20000 },
    { lon: 27.50, lat: 54.48, tempR: -24, tempC: -30.0, date: "1 Dec", place: "Zembin", placeEs: "Zembin", troops: 14000 },
    { lon: 26.84, lat: 54.31, tempR: -30, tempC: -37.5, date: "6 Dec", place: "Molodechno", placeEs: "Molodechno", troops: 12000 },
    { lon: 25.28, lat: 54.69, tempR: -26, tempC: -32.5, date: "7 Dec", place: "Vilna", placeEs: "Vilna", troops: 8000 },
    { lon: 24.14, lat: 54.75, tempR: -22, tempC: -27.5, date: "14 Dec", place: "Kowno", placeEs: "Kowno", troops: 4000 },
  ];

  // Key historical rivers from Minard's map for geographic context
  const HISTORICAL_RIVERS = [
    {
      name: { en: "Niemen R.", es: "Río Niemen" },
      labelPos: [55.02, 23.85],
      coords: [
        [53.90, 23.90],
        [54.45, 24.03],
        [54.75, 24.12],
        [54.90, 23.92],
        [55.08, 23.30],
        [55.25, 21.50],
      ],
    },
    {
      name: { en: "Berezina R.", es: "Río Berézina" },
      labelPos: [54.62, 28.32],
      coords: [
        [54.95, 28.20],
        [54.55, 28.32],
        [54.33, 28.36],
        [54.10, 28.50],
        [53.60, 28.90],
      ],
    },
    {
      name: { en: "Dnieper R.", es: "Río Dniéper" },
      labelPos: [54.42, 30.80],
      coords: [
        [55.15, 33.40],
        [54.94, 33.28],
        [54.78, 32.04],
        [54.51, 30.41],
        [53.90, 30.33],
      ],
    },
    {
      name: { en: "Moskva R.", es: "Río Moscova" },
      labelPos: [55.90, 37.55],
      coords: [
        [55.55, 35.85],
        [55.68, 36.70],
        [55.75, 37.62],
        [55.40, 38.20],
      ],
    },
  ];

  // =========================================================================
  // 2. Application State
  // =========================================================================

  const urlParams = new URLSearchParams(window.location.search);
  const initialLangParam = urlParams.get("lang") === "en" ? "en" : "es";

  const state = {
    lang: initialLangParam,
    map: null,
    campaignGeoJSON: null,
    waypoints: [],
    segments: [],
    activePhaseFilter: "all",
    activeRouteFilter: "all",
    showTroopLabels: true,
    showConnectPath: true,
    showRivers: true,
    selectedStepIndex: null,
    tourInterval: null,
    theme: "parchment",
    layers: {
      polygons: null,
      troopLabels: null,
      connectPaths: null,
      rivers: null,
      markers: null,
      longitudeGuide: null,
    },
    markerByStep: new Map(),
    polygonByIndex: new Map(),
  };

  function t() {
    return UI_STRINGS[state.lang] || UI_STRINGS.en;
  }

  // =========================================================================
  // 3. Data Fetching & Bilingual Adaptation Pipeline
  // =========================================================================

  async function fetchJsonWithFallback(url, fallbackKey) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (_err) {
      if (window.MINARD_FALLBACK_DATA && window.MINARD_FALLBACK_DATA[fallbackKey]) {
        return window.MINARD_FALLBACK_DATA[fallbackKey];
      }
      throw new Error(`Unable to load ${url}`);
    }
  }

  function computeMultiPolygonCentroid(coordinates) {
    let sumLon = 0;
    let sumLat = 0;
    let count = 0;
    coordinates.forEach((poly) => {
      poly.forEach((ring) => {
        const limit = ring.length > 1 ? ring.length - 1 : ring.length;
        for (let i = 0; i < limit; i++) {
          sumLon += ring[i][0];
          sumLat += ring[i][1];
          count++;
        }
      });
    });
    return count > 0 ? [sumLon / count, sumLat / count] : [30.0, 55.0];
  }

  function classifyRouteGroup(routeStr) {
    const r = (routeStr || "").toLowerCase();
    if (r.includes("polotsk")) return "polotsk";
    if (r.includes("riga")) return "riga";
    return "main";
  }

  // Bilingual Chronological sorting & historical enrichment for Advance + Retreat points
  const ADVANCE_ENRICHMENTS = {
    1: {
      sortOrder: 1,
      routeGroup: "main",
      name: { en: "Kowno / Kaunas (Lithuania)", es: "Kowno / Kaunas (Lituania)" },
      date: { en: "24 Jun", es: "24 Jun" },
      troopsEst: { en: "422,000 total (340,000 Main Corps)", es: "422,000 total (340,000 Cuerpo Principal)" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Crossing the Niemen (Kaunas): The massive multi-nation Grande Armée crosses the Niemen River at Kaunas (Kowno, in modern Lithuania), marking the official start of the invasion. The Russian forces under Barclay de Tolly immediately initiate a strategic retreat, enacting a scorched-earth policy.",
        es: "Cruce del Niemen (Kaunas): La gigantesca Grande Armée multinacional cruza el río Niemen en Kaunas (Kowno, en la actual Lituania), marcando el inicio oficial de la invasión. Las fuerzas rusas bajo el mando de Barclay de Tolly inician de inmediato una retirada estratégica aplicando la táctica de tierra quemada.",
      },
    },
    2: {
      sortOrder: 2,
      routeGroup: "main",
      name: { en: "Wilna / Vilna (Lithuania)", es: "Wilna / Vilna (Lituania)" },
      date: { en: "28 Jun", es: "28 Jun" },
      troopsEst: { en: "340,000 men", es: "340,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Occupation of Vilnius (Vilna): Napoleon enters Vilnius unopposed. Extreme weather (searing summer heat alternating with violent, muddy rainstorms) immediately decimates horses and fosters typhus, crippling the French supply lines right out of the gate.",
        es: "Ocupación de Vilna: Napoleón entra en Vilna sin oposición. El clima extremo (calor sofocante de verano alternado con violentas tormentas de lluvia y lodo) diezma de inmediato a los caballos y propaga el tifus, paralizando las líneas de suministro francesas desde el comienzo.",
      },
    },
    9: {
      sortOrder: 3,
      routeGroup: "riga",
      name: { en: "Gross-Ekau / Iecava (Latvia)", es: "Gross-Ekau / Iecava (Letonia)" },
      date: { en: "19 Jul", es: "19 Jul" },
      troopsEst: { en: "22,000 men (X Corps)", es: "22,000 hombres (X Cuerpo)" },
      corps: { en: "Macdonald (Northern Flank)", es: "Macdonald (Flanco Norte)" },
      description: {
        en: "General Macdonald: On the northern flank, French-allied Prussian forces defeat a Russian detachment, clearing the path toward Riga.",
        es: "General Macdonald: En el flanco norte, las fuerzas prusianas aliadas de Francia derrotan a un destacamento ruso, despejando el camino hacia Riga.",
      },
    },
    10: {
      sortOrder: 4,
      routeGroup: "main",
      name: { en: "Gloubokoe / Hlybokaye (Belarus)", es: "Gloubokoe / Hlybókaye (Bielorrusia)" },
      date: { en: "20 Jul", es: "20 Jul" },
      troopsEst: { en: "280,000 men", es: "280,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Napoleon sets up a temporary headquarters here for a few days to reorganize his rapidly tiring logistics chain.",
        es: "Napoleón establece aquí un cuartel general temporal durante varios días para reorganizar su agotada cadena logística.",
      },
    },
    3: {
      sortOrder: 5,
      routeGroup: "main",
      name: { en: "Witebsk / Vitebsk (Belarus)", es: "Witebsk / Vítebsk (Bielorrusia)" },
      date: { en: "28 Jul", es: "28 Jul" },
      troopsEst: { en: "210,000 men", es: "210,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Arrival at Vitebsk: Napoleon reaches Vitebsk. Frustrated by the lack of a decisive battlefield victory, he briefly considers halting the campaign until the following spring but ultimately decides to press deeper into Russia.",
        es: "Llegada a Vítebsk: Napoleón alcanza Vítebsk. Frustrado por la falta de una victoria decisiva en el campo de batalla, considera brevemente detener la campaña hasta la primavera siguiente, pero finalmente decide adentrarse más en Rusia.",
      },
    },
    5: {
      sortOrder: 6,
      routeGroup: "main",
      name: { en: "Smolensk / Smolensk (Russia)", es: "Smolensk / Esmolensko (Rusia)" },
      date: { en: "16–18 Aug", es: "16–18 Ago" },
      troopsEst: { en: "175,000 → 145,000 men", es: "175,000 → 145,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Battle of Smolensk: The first major collision of the war. The French successfully capture the holy city of Smolensk, but the Russian forces burn the vast supply stores and slip away unscathed, evading Napoleon's attempts to encircle them.",
        es: "Batalla de Smolensk: El primer gran choque de la guerra. Los franceses logran capturar la ciudad santa de Smolensk, pero las fuerzas rusas incendian los vastos depósitos de suministros y se retiran intactas, evadiendo los intentos de cerco de Napoleón.",
      },
    },
    12: {
      sortOrder: 7,
      routeGroup: "main",
      name: { en: "Dorogobouge / Dorogobuzh (Russia)", es: "Dorogobouge / Dorogobuzh (Rusia)" },
      date: { en: "25 Aug", es: "25 Ago" },
      troopsEst: { en: "145,000 men", es: "145,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "The retreating Russians briefly consider making a stand here but decide the terrain is too weak and abandon it to the French.",
        es: "Los rusos en retirada consideran brevemente presentar batalla aquí, pero deciden que el terreno es desfavorable y lo abandonan ante el avance francés.",
      },
    },
    6: {
      sortOrder: 8,
      routeGroup: "main",
      name: { en: "Wizma / Viazma (Russia)", es: "Wizma / Viazma (Rusia)" },
      date: { en: "30 Aug", es: "30 Ago" },
      troopsEst: { en: "140,000 men", es: "140,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "The French continue pursuing the Russians through this town, which is torched during the retreat.",
        es: "Los franceses continúan persiguiendo a las fuerzas rusas a través de esta localidad, que es incendiada durante la retirada.",
      },
    },
    13: {
      sortOrder: 9,
      routeGroup: "main",
      name: { en: "Chjat / Gagarin (Russia)", es: "Chjat / Gagarin (Rusia)" },
      date: { en: "1–3 Sep", es: "1–3 Sep" },
      troopsEst: { en: "127,100 men", es: "127,100 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Napoleon halts his army here for a couple of days to let his scattered columns rest and concentrate before the final push.",
        es: "Napoleón detiene aquí a su ejército durante un par de días para permitir que sus columnas dispersas descansen y se concentren antes del empuje final.",
      },
    },
    34: {
      sortOrder: 10,
      routeGroup: "main",
      name: { en: "Borodino / Borodino (Russia)", es: "Borodino / Borodinó (Rusia)" },
      date: { en: "7 Sep (26 Aug OS)", es: "7 Sep (26 Ago CJ)" },
      troopsEst: { en: "127,100 → 100,000 men", es: "127,100 → 100,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "The Battle of Borodino: The bloodiest single day of the Napoleonic Wars. Fought just 70 miles west of Moscow, the battle yields roughly 70,000 total casualties. The French secure a tactical victory, but the newly appointed Russian Field Marshal Mikhail Kutuzov preserves his army by executing an orderly withdrawal.",
        es: "La Batalla de Borodinó: El día más sangriento de las Guerras Napoleónicas. Librada a unos 110 km al oeste de Moscú, deja cerca de 70,000 bajas totales. Los franceses obtienen una victoria táctica, pero el recién nombrado mariscal de campo ruso Mijaíl Kutúzov preserva su ejército ejecutando un repliegue ordenado.",
      },
    },
    7: {
      sortOrder: 11,
      routeGroup: "main",
      name: { en: "Mojaisk / Mozhaisk (Russia)", es: "Mojaisk / Mozhaisk (Rusia)" },
      date: { en: "8–9 Sep", es: "8–9 Sep" },
      troopsEst: { en: "100,000 men", es: "100,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Located just past the Borodino battlefield, the French take this town and utilize it as a massive, overflowing field hospital for the thousands wounded at Borodino.",
        es: "Situada justo después del campo de batalla de Borodinó, los franceses toman esta ciudad y la utilizan como un enorme y desbordado hospital de campaña para los miles de heridos de Borodinó.",
      },
    },
    8: {
      sortOrder: 12,
      routeGroup: "main",
      name: { en: "Moscou / Moscow (Russia)", es: "Moscou / Moscú (Rusia)" },
      date: { en: "14 Sep", es: "14 Sep" },
      troopsEst: { en: "100,000 men", es: "100,000 hombres" },
      corps: { en: "Main Corps", es: "Cuerpo Principal" },
      description: {
        en: "Entry into Moscow: Napoleon rides victoriously into Moscow, only to discover the metropolis 98% abandoned. That night, fires intentionally lit by the city’s governor engulf Moscow, turning Napoleon’s ultimate prize into a hollow, smoky ruin devoid of food or shelter.",
        es: "Entrada en Moscú: Napoleón entra victorioso en Moscú, solo para descubrir la metrópoli abandonada en un 98 %. Esa noche, los incendios provocados por orden del gobernador envuelven la ciudad, convirtiendo el gran trofeo de Napoleón en una ruina humeante sin víveres ni refugio.",
      },
    },
    11: {
      sortOrder: 13,
      routeGroup: "polotsk",
      name: { en: "Polotsk / Polatsk (Belarus)", es: "Polotsk / Pólatsk (Bielorrusia)" },
      date: { en: "18–20 Oct", es: "18–20 Oct" },
      troopsEst: { en: "33,000 → 30,000 men", es: "33,000 → 30,000 hombres" },
      corps: { en: "Saint-Cyr (II & VI Corps)", es: "Saint-Cyr (II y VI Cuerpos)" },
      description: {
        en: "While Napoleon is stuck in Moscow deciding whether to retreat, a major battle erupts far to his north. Russian forces successfully defeat Marshal Saint-Cyr's forces in the Second Battle of Polotsk, threatening Napoleon's primary line of retreat back to Europe.",
        es: "Mientras Napoleón permanece en Moscú decidiendo la retirada, estalla una gran batalla al norte. Las fuerzas rusas derrotan al mariscal Saint-Cyr en la Segunda Batalla de Pólatsk, amenazando la línea principal de retirada francesa hacia Europa.",
      },
    },
  };

  const RETREAT_ENRICHMENTS = {
    1: {
      sortOrder: 14,
      routeGroup: "main",
      tempC: "0°C (0°R)",
      name: { en: "Tarantino / Tarutino (Russia)", es: "Tarantino / Tarútino (Rusia)" },
      date: { en: "18 Oct", es: "18 Oct" },
      troopsEst: { en: "98,000 men", es: "98,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Battle of Vinkovo (Tarutino): Russian forces under General Bennigsen launch a surprise attack against Marshal Joachim Murat’s vanguard. While Murat manages to escape, this defeat convinces Napoleon he can no longer maintain his position, prompting the grand evacuation of Moscow the very next day (October 19).",
        es: "Batalla de Vinkovo (Tarútino): Las fuerzas rusas bajo el mando del general Bennigsen lanzan un ataque sorpresa contra la vanguardia del mariscal Joaquín Murat. Aunque Murat logra escapar, esta derrota convence a Napoleón de que no puede sostener su posición, precipitando la evacuación de Moscú al día siguiente (19 de octubre).",
      },
    },
    2: {
      sortOrder: 15,
      routeGroup: "main",
      tempC: "0°C (0°R)",
      name: { en: "Moscou / Moscow (Russia)", es: "Moscou / Moscú (Rusia)" },
      date: { en: "19 Oct", es: "19 Oct" },
      troopsEst: { en: "98,000 men", es: "98,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Napoleon officially abandons a burning Moscow, giving the signal for 100,000 troops and thousands of civilian wagons to begin the march westward.",
        es: "Napoleón abandona oficialmente una Moscú en llamas, dando la señal para que cerca de 100,000 soldados y miles de carruajes inicien la marcha hacia el oeste.",
      },
    },
    3: {
      sortOrder: 16,
      routeGroup: "main",
      tempC: "0°C (0°R)",
      name: { en: "Malo-Jarosewli / Maloyaroslávets (Russia)", es: "Malo-Jarosewli / Maloyaroslávets (Rusia)" },
      date: { en: "24 Oct", es: "24 Oct" },
      troopsEst: { en: "97,000 men", es: "97,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "The Blocked Escape Route: A fierce battle breaks out as the French attempt to break through to a southern, untouched retreat route. Though tactically a draw, the engagement forces Napoleon to turn his army back onto the devastated, food-depleted northern road they used during the initial invasion.",
        es: "La ruta de escape bloqueada: Estalla una feroz batalla cuando los franceses intentan abrirse paso hacia una ruta meridional intacta. Aunque tácticamente indeciso, el combate obliga a Napoleón a desviar su ejército de vuelta hacia el devastado camino del norte empleado en la invasión inicial.",
      },
    },
    4: {
      sortOrder: 17,
      routeGroup: "main",
      tempC: "0°C (0°R)",
      name: { en: "Mozhaisk / Borodinó (Russia)", es: "Mozhaisk / Borodinó (Rusia)" },
      date: { en: "28 Oct", es: "28 Oct" },
      troopsEst: { en: "96,000 men", es: "96,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Revisiting the Graveyard: The retreating army passes back through the Borodino battlefield, where tens of thousands of unburied, decomposing corpses from the bloody September battle still litter the landscape, severely damaging French morale.",
        es: "Regreso al cementerio: El ejército en retirada vuelve a pasar por el campo de batalla de Borodinó, donde decenas de miles de cadáveres insepultos de la sangrienta batalla de septiembre aún cubren el terreno, golpeando gravemente la moral francesa.",
      },
    },
    5: {
      sortOrder: 18,
      routeGroup: "main",
      tempC: "−5°C (−4°R)",
      name: { en: "Wizma / Viazma (Russia)", es: "Wizma / Viazma (Rusia)" },
      date: { en: "3 Nov", es: "3 Nov" },
      troopsEst: { en: "87,000 → 55,000 men", es: "87,000 → 55,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "The First Winter Strikes: Russian forces attack the overextended French rear guard. Shortly after this battle, the first severe winter snows arrive, causing massive casualties among the ill-equipped French troops.",
        es: "Los primeros golpes del invierno: Las fuerzas rusas atacan a la extendida retaguardia francesa. Poco después de esta batalla llegan las primeras nevadas severas del invierno, causando bajas masivas entre las tropas francesas mal equipadas.",
      },
    },
    6: {
      sortOrder: 19,
      routeGroup: "main",
      tempC: "−11.3°C (−9°R)",
      name: { en: "Smolensk / Smolensk (Russia)", es: "Smolensk / Esmolensko (Rusia)" },
      date: { en: "9–13 Nov", es: "9–13 Nov" },
      troopsEst: { en: "37,000 men", es: "37,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "The Collapse of Discipline: The army arrives expecting massive stockpiles of food, only to find the depots depleted or rapidly looted by frantic advance units. The loss of order turns the organized retreat into a desperate survival scramble.",
        es: "El colapso de la disciplina: El ejército llega esperando grandes reservas de víveres, pero encuentra los almacenes agotados o saqueados por las unidades de vanguardia. La pérdida del orden transforma la retirada en una lucha desesperada por sobrevivir.",
      },
    },
    7: {
      sortOrder: 20,
      routeGroup: "main",
      tempC: "−26.3°C (−21°R)",
      name: { en: "Krasny / Krasnyi (Russia)", es: "Krasny / Krasni (Rusia)" },
      date: { en: "15–17 Nov", es: "15–17 Nov" },
      troopsEst: { en: "24,000 men", es: "24,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Marshal Ney’s Rear Guard Action: Surrounded by Russian forces, Napoleon uses his Imperial Guard to keep the main escape path open. Marshal Michel Ney fights a legendary, desperate action to break through the encirclement with the rear guard.",
        es: "La acción de retaguardia del mariscal Ney: Rodeado por fuerzas rusas, Napoleón emplea a su Guardia Imperial para mantener abierta la vía de escape. El mariscal Michel Ney libra un combate legendario y desesperado para romper el cerco con la retaguardia.",
      },
    },
    8: {
      sortOrder: 21,
      routeGroup: "main",
      tempC: "−13.8°C (−11°R)",
      name: { en: "Orscha / Orsha (Belarus)", es: "Orscha / Orsha (Bielorrusia)" },
      date: { en: "20 Nov", es: "20 Nov" },
      troopsEst: { en: "20,000 men", es: "20,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "The Imperial Regroup: Napoleon attempts to reorganize the remaining forces and re-establish military order. He is forced to abandon a massive portion of the army's remaining artillery pieces due to the deaths of thousands of horses.",
        es: "El reagrupamiento imperial: Napoleón intenta reorganizar las fuerzas restantes y restablecer el orden militar. Se ve obligado a abandonar gran parte de las piezas de artillería restantes debido a la muerte de miles de caballos.",
      },
    },
    9: {
      sortOrder: 22,
      routeGroup: "main",
      tempC: "−13.8°C (−11°R)",
      name: { en: "Botr / Bobr (Belarus)", es: "Botr / Bobr (Bielorrusia)" },
      date: { en: "23 Nov", es: "23 Nov" },
      troopsEst: { en: "20,000 men (+30,000 Polotsk Corps)", es: "20,000 hombres (+30,000 Cuerpo de Pólatsk)" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Burning the Baggage: Reaching Bobr, Napoleon establishes a temporary headquarters. He orders the burning of the state archives, secret papers, and luxury imperial baggage to free up wagons and horses for the wounded.",
        es: "Quema del equipaje imperial: Al llegar a Bobr, Napoleón establece un cuartel general temporal y ordena quemar archivos de Estado, documentos secretos y equipaje de lujo para liberar carros y caballos destinados a los heridos.",
      },
    },
    10: {
      sortOrder: 23,
      routeGroup: "main",
      tempC: "−25.0°C (−20°R)",
      name: { en: "Studienska / Studenka (Belarus)", es: "Studienska / Studenka (Bielorrusia)" },
      date: { en: "26–29 Nov", es: "26–29 Nov" },
      troopsEst: { en: "50,000 → 28,000 men", es: "50,000 → 28,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "The Berezina River Catastrophe: French engineers build temporary bridges over the freezing river. Amid chaotic Russian artillery fire, thousands of soldiers and civilian stragglers drown, freeze, or are left behind when the bridges are burned to stop the pursuing Russians.",
        es: "La catástrofe del río Berézina: Los pontoneros franceses construyen puentes improvisados sobre las aguas heladas. Bajo el fuego de la artillería rusa, miles de soldados y rezagados mueren ahogados, congelados o quedan atrás cuando se queman los puentes para frenar la persecución rusa.",
      },
    },
    11: {
      sortOrder: 24,
      routeGroup: "main",
      tempC: "−37.5°C (−30°R)",
      name: { en: "Molodezno / Maladzyechna (Belarus)", es: "Molodezno / Maladzyechna (Bielorrusia)" },
      date: { en: "3 Dec", es: "3 Dic" },
      troopsEst: { en: "12,000 men", es: "12,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: 'The 29th Bulletin: Napoleon halts here to draft a shocking official message to Paris, admitting for the first time that the army has suffered an unprecedented disaster, famously concluding with: "The health of His Majesty has never been better."',
        es: "El 29.º Boletín: Napoleón se detiene aquí para redactar un impactante comunicado oficial hacia París, admitiendo por primera vez que el ejército ha sufrido un desastre sin precedentes y concluyendo con la célebre frase: «La salud de Su Majestad nunca ha sido mejor».",
      },
    },
    12: {
      sortOrder: 25,
      routeGroup: "main",
      tempC: "−35.0°C (−28°R)",
      name: { en: "Smorgoni / Smorgon (Belarus)", es: "Smorgoni / Smorgón (Bielorrusia)" },
      date: { en: "5 Dec", es: "5 Dic" },
      troopsEst: { en: "12,000 men", es: "12,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Napoleon Departs: Recognizing the political instability in France and the total loss of his army, Napoleon leaves his troops in disguise, handing operational command over to Murat as he rushes back to Paris to secure his throne.",
        es: "Partida de Napoleón: Consciente de la inestabilidad política en Francia y de la pérdida total de su ejército, Napoleón abandona a sus tropas de incógnito, entregando el mando operativo a Murat mientras se apresura a regresar a París para asegurar su trono.",
      },
    },
    13: {
      sortOrder: 26,
      routeGroup: "main",
      tempC: "−32.5°C (−26°R)",
      name: { en: "Vilna / Vilnius (Lithuania)", es: "Vilna / Vilna (Lituania)" },
      date: { en: "7–9 Dec", es: "7–9 Dic" },
      troopsEst: { en: "8,000 men", es: "8,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Collapse at Vilnius (Vilna): Exhausted, typhus-ridden, and frostbitten survivors stagger into Lithuanian territory in −32.5°C (−26°R) cold. Chaotic scenes unfold at the city gates and supply depots; nearly 20,000 stragglers and wounded are captured or perish in the streets within 48 hours.",
        es: "Colapso en Vilna: Las tropas exhaustas, enfermas de tifus y congeladas entran en territorio lituano bajo un frío de −32.5°C (−26°R). Se desata el caos en las puertas de la ciudad y en los depósitos de suministros; cerca de 20,000 rezagados y heridos son capturados o perecen en las calles en 48 horas.",
      },
    },
    14: {
      sortOrder: 27,
      routeGroup: "main",
      tempC: "−27.5°C (−22°R)",
      name: { en: "Kowno / Kaunas (Lithuania)", es: "Kowno / Kaunas (Lituania)" },
      date: { en: "14 Dec", es: "14 Dic" },
      troopsEst: { en: "4,000 Main + 6,000 Flank = 10,000 men", es: "4,000 Principal + 6,000 Flancos = 10,000 hombres" },
      corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
      description: {
        en: "Crossing the Niemen: The broken remnants of the army re-cross the Niemen River, finally exiting Russian territory. Marshal Ney is famously reported to be the last French soldier to cross the bridge, marking the definitive, tragic end of the campaign.",
        es: "Cruce final del Niemen: Los restos diezmados del ejército vuelven a cruzar el río Niemen, saliendo finalmente de territorio ruso. Se atribuye al mariscal Ney haber sido el último soldado francés en cruzar el puente, marcando el trágico final definitivo de la campaña.",
      },
    },
  };

  function getLocalizedWp(wp) {
    const lang = state.lang;
    return {
      ...wp,
      phaseLabel: wp.phase === "Advance" ? t().phaseWordAdvance : t().phaseWordRetreat,
      name: wp.i18n.name[lang] || wp.i18n.name.en,
      date: wp.i18n.date[lang] || wp.i18n.date.en,
      description: wp.i18n.description[lang] || wp.i18n.description.en,
      troopsEst: wp.i18n.troopsEst[lang] || wp.i18n.troopsEst.en,
      corps: wp.i18n.corps[lang] || wp.i18n.corps.en,
    };
  }

  async function loadAndAdaptData() {
    const [campaignRaw, advRaw, retRaw] = await Promise.all([
      fetchJsonWithFallback("data/napoleon-campain.geojson", "campaign"),
      fetchJsonWithFallback("data/napoleon-Adv.geojson", "advance"),
      fetchJsonWithFallback("data/napoleon-ret.geojson", "retreat"),
    ]);

    // 1. Adapt Flow Polygons (napoleon-campain.geojson)
    state.segments = campaignRaw.features.map((feat, idx) => {
      const props = { ...feat.properties };
      if (props.Movement === "Advance" && props.Route === "Moscow-Kowno") {
        props.Route = "Kovno-Moscow";
        props.adaptedNote = "Route label standardized from Moscow-Kowno to Kovno-Moscow";
      }
      const centroid = computeMultiPolygonCentroid(feat.geometry.coordinates);
      const routeGroup = classifyRouteGroup(props.Route);
      const maxRef = routeGroup === "polotsk" ? 60000 : routeGroup === "riga" ? 22000 : 340000;
      const pctOfCorps = Math.min(100, Math.round((props.Troops / maxRef) * 100));

      return {
        index: idx,
        feature: {
          ...feat,
          properties: {
            ...props,
            segmentIndex: idx,
            centroid,
            routeGroup,
            pctOfCorps,
          },
        },
        movement: props.Movement,
        troops: props.Troops,
        route: props.Route,
        routeGroup,
        centroid,
        pctOfCorps,
      };
    });

    state.campaignGeoJSON = {
      type: "FeatureCollection",
      features: state.segments.map((s) => s.feature),
    };

    // 2. Adapt Advance & Retreat Waypoints into a unified 27-step chronological timeline
    const adaptedAdv = advRaw.features.map((f) => {
      const rawOrder = f.properties.order;
      const meta = ADVANCE_ENRICHMENTS[rawOrder];
      const [lon, lat] = f.geometry.coordinates;
      return {
        phase: "Advance",
        rawOrder,
        sortOrder: meta ? meta.sortOrder : rawOrder,
        i18n: meta || {
          name: { en: f.properties.name, es: f.properties.name },
          date: { en: f.properties.date, es: f.properties.date },
          description: { en: f.properties.description, es: f.properties.description },
          troopsEst: { en: "Main Column", es: "Columna Principal" },
          corps: { en: "Grande Armée", es: "Grande Armée" },
        },
        tempC: "Summer heat / Storms",
        routeGroup: meta ? meta.routeGroup : "main",
        lon,
        lat,
      };
    });

    const adaptedRet = retRaw.features.map((f) => {
      const rawOrder = f.properties.order;
      const meta = RETREAT_ENRICHMENTS[rawOrder];
      const [lon, lat] = f.geometry.coordinates;
      return {
        phase: "Retreat",
        rawOrder,
        sortOrder: meta ? meta.sortOrder : 13 + rawOrder,
        i18n: meta || {
          name: { en: f.properties.name, es: f.properties.name },
          date: { en: f.properties.date, es: f.properties.date },
          description: { en: f.properties.description, es: f.properties.description },
          troopsEst: { en: "Retreating Column", es: "Columna en Retirada" },
          corps: { en: "Retreating Grande Armée", es: "Grande Armée en Retirada" },
        },
        tempC: meta ? meta.tempC : "Below freezing",
        routeGroup: meta ? meta.routeGroup : "main",
        lon,
        lat,
      };
    });

    state.waypoints = [...adaptedAdv, ...adaptedRet]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((wp, idx) => ({
        ...wp,
        stepIndex: idx + 1,
        phaseNumber: wp.phase === "Advance" ? idx + 1 : idx + 1 - adaptedAdv.length,
      }));
  }

  // =========================================================================
  // 4. Leaflet Map Initialization & Layer Rendering
  // =========================================================================

  function initMap() {
    state.map = L.map("minard-map", {
      center: [55.15, 30.5],
      zoom: 6,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: "topleft" }).addTo(state.map);
    L.control.scale({ imperial: true, metric: true, position: "bottomright" }).addTo(state.map);

    // API-key-free Basemap layers
    const esriLightGray = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | Minard 1869",
        maxZoom: 16,
      }
    );

    const osmStandard = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Minard 1869',
      maxZoom: 19,
    });

    const esriWorldTopo = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Esri, USGS, NOAA",
        maxZoom: 18,
      }
    );

    const esriDarkGray = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
        maxZoom: 16,
      }
    );

    const googleSatellite = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        attribution: "Imagery &copy; Google",
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const googleHybrid = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      {
        attribution: "Imagery &copy; Google",
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    esriLightGray.addTo(state.map);

    state.layers.rivers = L.layerGroup().addTo(state.map);
    state.layers.polygons = L.layerGroup().addTo(state.map);
    state.layers.connectPaths = L.layerGroup().addTo(state.map);
    state.layers.troopLabels = L.layerGroup().addTo(state.map);
    state.layers.markers = L.layerGroup().addTo(state.map);
    state.layers.longitudeGuide = L.layerGroup().addTo(state.map);

    L.control
      .layers(
        {
          "Archival Parchment (Light Canvas)": esriLightGray,
          "OpenStreetMap Standard": osmStandard,
          "Cartographic Topographic (Esri)": esriWorldTopo,
          "Dark Slate (Dark Canvas)": esriDarkGray,
          "Google Satellite": googleSatellite,
          "Google Hybrid (Satellite + Labels)": googleHybrid,
        },
        {
          "Flow Bands (Polygons)": state.layers.polygons,
          "Waypoints (Markers)": state.layers.markers,
          "Chronological Path": state.layers.connectPaths,
          "Troop Band Labels": state.layers.troopLabels,
          "Key Rivers": state.layers.rivers,
        },
        { position: "topleft" }
      )
      .addTo(state.map);
  }

  function renderRiversLayer() {
    state.layers.rivers.clearLayers();
    if (!state.showRivers) return;

    HISTORICAL_RIVERS.forEach((river) => {
      L.polyline(river.coords, {
        color: "#4a7c9b",
        weight: 2.2,
        opacity: 0.65,
        dashArray: "4, 3",
        interactive: false,
      }).addTo(state.layers.rivers);

      const riverName = river.name[state.lang] || river.name.en;
      const labelIcon = L.divIcon({
        className: "river-label-icon",
        html: `<span class="river-label-text">${riverName}</span>`,
        iconSize: [90, 20],
        iconAnchor: [45, 10],
      });
      L.marker(river.labelPos, { icon: labelIcon, interactive: false }).addTo(state.layers.rivers);
    });
  }

  function getPolygonStyle(props, isHovered = false) {
    const isAdvance = props.Movement === "Advance";
    if (isAdvance) {
      return {
        fillColor: isHovered ? "#e5b55f" : "#c8923b",
        fillOpacity: isHovered ? 0.92 : 0.78,
        color: isHovered ? "#5c3b05" : "#8c5e14",
        weight: isHovered ? 2.2 : 1.2,
      };
    }
    return {
      fillColor: isHovered ? "#451a1b" : "#231f1e",
      fillOpacity: isHovered ? 0.95 : 0.85,
      color: isHovered ? "#ff5c5c" : "#9e2a2b",
      weight: isHovered ? 2.4 : 1.3,
    };
  }

  function renderFlowPolygons() {
    state.layers.polygons.clearLayers();
    state.layers.troopLabels.clearLayers();
    state.polygonByIndex.clear();

    const filteredSegments = state.segments.filter((seg) => {
      const phaseMatch =
        state.activePhaseFilter === "all" || seg.movement === state.activePhaseFilter;
      const routeMatch =
        state.activeRouteFilter === "all" || seg.routeGroup === state.activeRouteFilter;
      return phaseMatch && routeMatch;
    });

    const labeledKeys = new Set();

    filteredSegments.forEach((seg) => {
      const geoLayer = L.geoJSON(seg.feature, {
        style: () => getPolygonStyle(seg.feature.properties, false),
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          const formattedTroops = p.Troops.toLocaleString("en-US");
          const survivalFromStart = ((p.Troops / 422000) * 100).toFixed(1);
          const movLabel = p.Movement === "Advance" ? t().phaseWordAdvance : t().phaseWordRetreat;

          layer.bindTooltip(
            `<div class="minard-popup-title">${t().popupTroops(movLabel, formattedTroops)}</div>
             <div class="minard-popup-meta">${t().popupMeta(p.Route, p.pctOfCorps, survivalFromStart)}</div>`,
            { sticky: true, direction: "top" }
          );

          layer.on("mouseover", () => {
            layer.setStyle(getPolygonStyle(p, true));
            highlightLongitudeOnChart(p.centroid[0], p.Movement);
          });

          layer.on("mouseout", () => {
            layer.setStyle(getPolygonStyle(p, false));
            clearLongitudeHighlight();
          });

          layer.on("click", () => {
            state.map.fitBounds(layer.getBounds(), { maxZoom: 8, padding: [40, 40] });
          });
        },
      }).addTo(state.layers.polygons);

      state.polygonByIndex.set(seg.index, geoLayer);

      if (state.showTroopLabels) {
        const dedupeKey = `${seg.movement}-${seg.route}-${seg.troops}`;
        if (!labeledKeys.has(dedupeKey)) {
          labeledKeys.add(dedupeKey);
          const [lon, lat] = seg.centroid;
          const phaseClass = seg.movement === "Advance" ? "advance" : "retreat";
          const labelIcon = L.divIcon({
            className: "troop-band-label",
            html: `<span class="troop-band-tag ${phaseClass}">${(seg.troops / 1000).toFixed(
              seg.troops % 1000 === 0 ? 0 : 1
            )}k</span>`,
            iconSize: [44, 18],
            iconAnchor: [22, 9],
          });
          L.marker([lat, lon], { icon: labelIcon, interactive: false }).addTo(
            state.layers.troopLabels
          );
        }
      }
    });
  }

  function renderWaypointsAndPaths() {
    state.layers.markers.clearLayers();
    state.layers.connectPaths.clearLayers();
    state.markerByStep.clear();

    const visibleWaypoints = state.waypoints.filter((wp) => {
      const phaseMatch =
        state.activePhaseFilter === "all" || wp.phase === state.activePhaseFilter;
      const routeMatch =
        state.activeRouteFilter === "all" || wp.routeGroup === state.activeRouteFilter;
      return phaseMatch && routeMatch;
    });

    if (state.showConnectPath) {
      const mainAdvCoords = visibleWaypoints
        .filter((w) => w.phase === "Advance" && w.routeGroup === "main")
        .map((w) => [w.lat, w.lon]);
      if (mainAdvCoords.length > 1) {
        L.polyline(mainAdvCoords, {
          color: "#a87018",
          weight: 2,
          dashArray: "6, 6",
          opacity: 0.75,
          interactive: false,
        }).addTo(state.layers.connectPaths);
      }

      const mainRetCoords = visibleWaypoints
        .filter((w) => w.phase === "Retreat" && w.routeGroup === "main")
        .map((w) => [w.lat, w.lon]);
      if (mainRetCoords.length > 1) {
        L.polyline(mainRetCoords, {
          color: "#b02a2b",
          weight: 2,
          dashArray: "5, 5",
          opacity: 0.8,
          interactive: false,
        }).addTo(state.layers.connectPaths);
      }
    }

    visibleWaypoints.forEach((rawWp) => {
      const wp = getLocalizedWp(rawWp);
      const phaseClass = wp.phase === "Advance" ? "advance" : "retreat";
      const isSelected = state.selectedStepIndex === wp.stepIndex;

      const latOffset = wp.phase === "Retreat" ? -0.035 : 0.0;
      const lonOffset = wp.phase === "Retreat" ? 0.035 : 0.0;

      const icon = L.divIcon({
        className: "minard-waypoint-icon",
        html: `<div class="waypoint-badge ${phaseClass} ${
          isSelected ? "active-marker" : ""
        }" title="${wp.name} (${wp.date})">${wp.phaseNumber}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([wp.lat + latOffset, wp.lon + lonOffset], {
        icon,
        zIndexOffset: isSelected ? 1000 : wp.phase === "Advance" ? 200 : 300,
      }).addTo(state.layers.markers);

      marker.bindTooltip(
        `<strong>${wp.phaseLabel} #${wp.phaseNumber}: ${wp.name}</strong><br/>${wp.date} · ${wp.troopsEst}`,
        { direction: "top", offset: [0, -12] }
      );

      marker.on("click", () => {
        selectWaypoint(wp.stepIndex, true);
      });

      state.markerByStep.set(wp.stepIndex, marker);
    });
  }

  // =========================================================================
  // 5. Spotlight Card & Sidebar Chronicle Synchronization
  // =========================================================================

  function selectWaypoint(stepIndex, flyTo = true) {
    const rawWp = state.waypoints.find((w) => w.stepIndex === stepIndex);
    if (!rawWp) return;

    const wp = getLocalizedWp(rawWp);
    state.selectedStepIndex = stepIndex;

    renderWaypointsAndPaths();

    const spotlight = document.getElementById("active-spotlight");
    const badge = document.getElementById("spotlight-badge");
    const dateEl = document.getElementById("spotlight-date");
    const titleEl = document.getElementById("spotlight-title");
    const metricsEl = document.getElementById("spotlight-metrics");
    const descEl = document.getElementById("spotlight-desc");
    const counterEl = document.getElementById("spotlight-counter");

    spotlight.hidden = false;
    badge.textContent = `${wp.phaseLabel} · ${t().stopWord} #${wp.phaseNumber}`;
    badge.className = `phase-pill ${wp.phase.toLowerCase()}`;
    dateEl.textContent = `${wp.date}, 1812`;
    titleEl.textContent = wp.name;

    metricsEl.innerHTML = `
      <span class="metric-chip">${t().troopsWord}: ${wp.troopsEst}</span>
      <span class="metric-chip">${wp.phase === "Retreat" ? `${t().tempWord}: ${wp.tempC}` : wp.corps}</span>
      <span class="metric-chip">${wp.lon.toFixed(2)}°E, ${wp.lat.toFixed(2)}°N</span>
    `;
    descEl.textContent = wp.description;
    counterEl.textContent = t().eventCounter(wp.stepIndex, state.waypoints.length);

    document.querySelectorAll(".timeline-card").forEach((card) => {
      const cardStep = Number(card.dataset.step);
      card.classList.toggle("active", cardStep === stepIndex);
      if (cardStep === stepIndex) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    highlightLongitudeOnChart(wp.lon, wp.phase);

    if (flyTo && state.map) {
      state.map.flyTo([wp.lat, wp.lon], Math.max(state.map.getZoom(), 7), {
        duration: 0.85,
      });
    }
  }

  function renderTimelineSidebar(searchQuery = "") {
    const container = document.getElementById("timeline-list");
    const q = searchQuery.trim().toLowerCase();

    const filtered = state.waypoints
      .map(getLocalizedWp)
      .filter((wp) => {
        const phaseMatch =
          state.activePhaseFilter === "all" || wp.phase === state.activePhaseFilter;
        const routeMatch =
          state.activeRouteFilter === "all" || wp.routeGroup === state.activeRouteFilter;
        const textMatch =
          !q ||
          wp.name.toLowerCase().includes(q) ||
          wp.description.toLowerCase().includes(q) ||
          wp.date.toLowerCase().includes(q);
        return phaseMatch && routeMatch && textMatch;
      });

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.82rem;">${t().noEventsMatch}</p>`;
      return;
    }

    container.innerHTML = filtered
      .map((wp) => {
        const phaseClass = wp.phase.toLowerCase();
        const isActive = state.selectedStepIndex === wp.stepIndex ? "active" : "";
        return `
          <article class="timeline-card ${phaseClass} ${isActive}" data-step="${wp.stepIndex}">
            <div class="timeline-card-header">
              <span class="timeline-step-num">
                <span class="phase-pill ${phaseClass}">${wp.phaseLabel} #${wp.phaseNumber}</span>
              </span>
              <span class="timeline-date-badge">${wp.date}</span>
            </div>
            <h3 class="timeline-title">${wp.name}</h3>
            <div class="timeline-meta-row">
              <span>👥 ${wp.troopsEst}</span>
              ${wp.phase === "Retreat" ? `<span>❄️ ${wp.tempC}</span>` : `<span>🚩 ${wp.corps}</span>`}
            </div>
            <p class="timeline-desc">${wp.description}</p>
          </article>
        `;
      })
      .join("");

    container.querySelectorAll(".timeline-card").forEach((card) => {
      card.addEventListener("click", () => {
        const step = Number(card.dataset.step);
        selectWaypoint(step, true);
      });
    });
  }

  function renderSegmentsSidebar() {
    const container = document.getElementById("segments-list");
    const sorted = [...state.segments].sort((a, b) => {
      if (a.movement !== b.movement) return a.movement === "Advance" ? -1 : 1;
      return b.troops - a.troops;
    });

    container.innerHTML = sorted
      .map((seg) => {
        const phaseClass = seg.movement.toLowerCase();
        const movLabel = seg.movement === "Advance" ? t().phaseWordAdvance : t().phaseWordRetreat;
        const widthPct = Math.max(3, Math.round((seg.troops / 340000) * 100));
        return `
          <div class="segment-card" data-seg-idx="${seg.index}">
            <div class="segment-top">
              <span>${movLabel} · ${seg.route}</span>
              <span>${seg.troops.toLocaleString("en-US")} ${t().segMen}</span>
            </div>
            <div class="segment-bar-track">
              <div class="segment-bar-fill ${phaseClass}" style="inline-size: ${widthPct}%"></div>
            </div>
            <div class="segment-sub">
              <span>Lon ${seg.centroid[0].toFixed(1)}°E, Lat ${seg.centroid[1].toFixed(1)}°N</span>
              <span>${seg.pctOfCorps}${t().segBranchPeak}</span>
            </div>
          </div>
        `;
      })
      .join("");

    container.querySelectorAll(".segment-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.dataset.segIdx);
        const layer = state.polygonByIndex.get(idx);
        if (layer && state.map) {
          state.map.fitBounds(layer.getBounds(), { maxZoom: 8, padding: [50, 50] });
          layer.openTooltip();
        }
      });
    });
  }

  // =========================================================================
  // 6. Minard's Synchronized Temperature & Troop Attrition SVG Chart
  // =========================================================================

  const CHART_LON_MIN = 23.6;
  const CHART_LON_MAX = 38.0;

  function lonToX(lon, width, padLeft, padRight) {
    const plotW = width - padLeft - padRight;
    return padLeft + ((lon - CHART_LON_MIN) / (CHART_LON_MAX - CHART_LON_MIN)) * plotW;
  }

  function renderMinardChart() {
    const container = document.getElementById("minard-chart-container");
    const width = 920;
    const height = 152;
    const padLeft = 52;
    const padRight = 56;
    const padTop = 14;
    const padBottom = 24;

    const midY = 68;
    const tempBottomY = height - padBottom;

    const troopToY = (troops) => {
      return midY - (troops / 360000) * (midY - padTop);
    };

    const tempCToY = (tempC) => {
      const topT = midY + 8;
      return topT + (Math.abs(tempC) / 40) * (tempBottomY - topT);
    };

    const advanceProfile = [
      { lon: 23.94, troops: 340000 },
      { lon: 25.28, troops: 340000 },
      { lon: 27.70, troops: 280000 },
      { lon: 30.20, troops: 210000 },
      { lon: 32.05, troops: 175000 },
      { lon: 33.29, troops: 145000 },
      { lon: 34.99, troops: 127100 },
      { lon: 35.82, troops: 100000 },
      { lon: 37.62, troops: 100000 },
    ];

    const retreatProfile = MINARD_TEMPERATURES.map((pt) => ({
      lon: pt.lon,
      troops: pt.troops,
      place: state.lang === "es" ? pt.placeEs : pt.place,
    })).sort((a, b) => a.lon - b.lon);

    const advPoints = advanceProfile
      .map((p) => `${lonToX(p.lon, width, padLeft, padRight).toFixed(1)},${troopToY(p.troops).toFixed(1)}`)
      .join(" ");

    const advArea =
      `${lonToX(advanceProfile[0].lon, width, padLeft, padRight).toFixed(1)},${midY} ` +
      advPoints +
      ` ${lonToX(advanceProfile[advanceProfile.length - 1].lon, width, padLeft, padRight).toFixed(1)},${midY}`;

    const retPoints = retreatProfile
      .map((p) => `${lonToX(p.lon, width, padLeft, padRight).toFixed(1)},${troopToY(p.troops).toFixed(1)}`)
      .join(" ");

    const retArea =
      `${lonToX(retreatProfile[0].lon, width, padLeft, padRight).toFixed(1)},${midY} ` +
      retPoints +
      ` ${lonToX(retreatProfile[retreatProfile.length - 1].lon, width, padLeft, padRight).toFixed(1)},${midY}`;

    const tempSorted = [...MINARD_TEMPERATURES].sort((a, b) => a.lon - b.lon);
    const tempPolyline = tempSorted
      .map((tPt) => `${lonToX(tPt.lon, width, padLeft, padRight).toFixed(1)},${tempCToY(tPt.tempC).toFixed(1)}`)
      .join(" ");

    const verticalDropLines = tempSorted
      .map((tPt) => {
        const x = lonToX(tPt.lon, width, padLeft, padRight).toFixed(1);
        const yT = tempCToY(tPt.tempC).toFixed(1);
        const yR = troopToY(tPt.troops).toFixed(1);
        return `<line x1="${x}" y1="${yR}" x2="${x}" y2="${yT}" stroke="var(--border-strong)" stroke-dasharray="2,2" stroke-width="1" />`;
      })
      .join("");

    const tempNodes = tempSorted
      .map((tPt) => {
        const x = lonToX(tPt.lon, width, padLeft, padRight).toFixed(1);
        const y = tempCToY(tPt.tempC).toFixed(1);
        const placeName = state.lang === "es" ? tPt.placeEs : tPt.place;
        return `
          <g class="chart-temp-node" data-lon="${tPt.lon}" data-lat="${tPt.lat}" data-place="${placeName}" style="cursor: pointer;">
            <circle cx="${x}" cy="${y}" r="4.5" fill="var(--color-cold)" stroke="var(--bg-surface)" stroke-width="1.5" />
            <text x="${x}" y="${Number(y) + 12}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--text-primary)" font-weight="600">
              ${tPt.tempC}°C
            </text>
            <text x="${x}" y="${midY + 4}" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" fill="var(--text-muted)">
              ${placeName}
            </text>
          </g>
        `;
      })
      .join("");

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Synchronized chart of troop strength and winter temperature by longitude">
        <line x1="${padLeft}" y1="${troopToY(300000)}" x2="${width - padRight}" y2="${troopToY(300000)}" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
        <line x1="${padLeft}" y1="${troopToY(150000)}" x2="${width - padRight}" y2="${troopToY(150000)}" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
        <line x1="${padLeft}" y1="${midY}" x2="${width - padRight}" y2="${midY}" stroke="var(--border-strong)" stroke-width="1.2" />
        <line x1="${padLeft}" y1="${tempCToY(-20)}" x2="${width - padRight}" y2="${tempCToY(-20)}" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
        <line x1="${padLeft}" y1="${tempCToY(-37.5)}" x2="${width - padRight}" y2="${tempCToY(-37.5)}" stroke="var(--border-subtle)" stroke-dasharray="3,3" />

        <text x="${padLeft - 6}" y="${troopToY(300000) + 3}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--text-muted)">300k</text>
        <text x="${padLeft - 6}" y="${troopToY(150000) + 3}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--text-muted)">150k</text>
        <text x="${padLeft - 6}" y="${midY + 3}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--text-muted)">0 / 0°C</text>
        <text x="${padLeft - 6}" y="${tempCToY(-20) + 3}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--color-cold)">−20°C</text>
        <text x="${padLeft - 6}" y="${tempCToY(-37.5) + 3}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--color-cold)">−38°C</text>

        <text x="${width - padRight + 6}" y="${midY + 10}" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--text-muted)">0°R</text>
        <text x="${width - padRight + 6}" y="${tempCToY(-20) + 3}" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--color-cold)">−16°R</text>
        <text x="${width - padRight + 6}" y="${tempCToY(-37.5) + 3}" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--color-cold)">−30°R</text>

        <polygon points="${advArea}" fill="rgba(200, 146, 59, 0.25)" />
        <polyline points="${advPoints}" fill="none" stroke="var(--color-advance)" stroke-width="2.4" />
        <polygon points="${retArea}" fill="rgba(158, 42, 43, 0.25)" />
        <polyline points="${retPoints}" fill="none" stroke="var(--color-retreat-accent)" stroke-width="2.2" />

        ${verticalDropLines}

        <polyline points="${tempPolyline}" fill="none" stroke="var(--color-cold)" stroke-width="2.2" />

        ${tempNodes}

        <line id="chart-lon-cursor" x1="0" y1="${padTop}" x2="0" y2="${height - padBottom}" stroke="var(--color-advance)" stroke-width="2" visibility="hidden" />
      </svg>
    `;

    container.querySelectorAll(".chart-temp-node").forEach((node) => {
      node.addEventListener("mouseenter", () => {
        const lon = Number(node.dataset.lon);
        const lat = Number(node.dataset.lat);
        highlightLongitudeOnChart(lon, "Retreat");
        showMapLongitudeLine(lon, lat, node.dataset.place);
      });

      node.addEventListener("mouseleave", () => {
        clearLongitudeHighlight();
      });

      node.addEventListener("click", () => {
        const lon = Number(node.dataset.lon);
        let closestWp = null;
        let minDist = Infinity;
        state.waypoints
          .filter((w) => w.phase === "Retreat")
          .forEach((w) => {
            const d = Math.abs(w.lon - lon);
            if (d < minDist) {
              minDist = d;
              closestWp = w;
            }
          });
        if (closestWp) {
          selectWaypoint(closestWp.stepIndex, true);
        }
      });
    });
  }

  function highlightLongitudeOnChart(lon, phase = "Advance") {
    const cursor = document.getElementById("chart-lon-cursor");
    if (!cursor) return;
    const x = lonToX(lon, 920, 52, 56);
    cursor.setAttribute("x1", x.toFixed(1));
    cursor.setAttribute("x2", x.toFixed(1));
    cursor.setAttribute(
      "stroke",
      phase === "Retreat" ? "var(--color-retreat-accent)" : "var(--color-advance)"
    );
    cursor.setAttribute("visibility", "visible");
  }

  function showMapLongitudeLine(lon, lat, label) {
    if (!state.layers.longitudeGuide) return;
    state.layers.longitudeGuide.clearLayers();
    L.polyline(
      [
        [53.8, lon],
        [56.7, lon],
      ],
      {
        color: "#1d6fa5",
        weight: 2,
        dashArray: "4, 4",
        interactive: false,
      }
    ).addTo(state.layers.longitudeGuide);

    L.circleMarker([lat, lon], {
      radius: 7,
      color: "#1d6fa5",
      fillColor: "#4da8da",
      fillOpacity: 0.9,
    })
      .bindTooltip(`<strong>${label}</strong> (${lon.toFixed(1)}°E)`, { permanent: true, direction: "top" })
      .addTo(state.layers.longitudeGuide);
  }

  function clearLongitudeHighlight() {
    const cursor = document.getElementById("chart-lon-cursor");
    if (cursor) cursor.setAttribute("visibility", "hidden");
    if (state.layers.longitudeGuide) state.layers.longitudeGuide.clearLayers();
  }

  // =========================================================================
  // 7. Dynamic Language Switching & Static DOM Translation
  // =========================================================================

  function applyStaticTranslations() {
    const dict = t();
    document.documentElement.lang = state.lang;

    const badgeEl = document.querySelector(".brand-block .cartographer-badge");
    if (badgeEl) badgeEl.textContent = dict.cartographerBadge;

    const origBtnSub = document.getElementById("original-map-btn-sub");
    if (origBtnSub) origBtnSub.textContent = dict.origMapBtnSub;
    const origBtnLabel = document.getElementById("original-map-btn-label");
    if (origBtnLabel) origBtnLabel.textContent = dict.origMapBtnLabel;
    const origDialogTitle = document.getElementById("original-map-dialog-title");
    if (origDialogTitle) origDialogTitle.textContent = dict.origDialogTitle;
    const origPopupWinBtn = document.getElementById("btn-open-popup-window");
    if (origPopupWinBtn) origPopupWinBtn.textContent = dict.origOpenPopupWin;
    const origCloseBtn = document.getElementById("btn-close-original-dialog");
    if (origCloseBtn) origCloseBtn.textContent = dict.origCloseDialog;

    const kpiItems = document.querySelectorAll(".kpi-strip .kpi-item:not(.kpi-btn-original)");
    if (kpiItems.length >= 4) {
      kpiItems[0].querySelector(".kpi-label").textContent = dict.kpi1Label;
      kpiItems[0].querySelector(".kpi-value small").textContent = dict.kpi1Unit;
      kpiItems[1].querySelector(".kpi-label").textContent = dict.kpi2Label;
      kpiItems[1].querySelector(".kpi-value small").textContent = dict.kpi2Unit;
      kpiItems[2].querySelector(".kpi-label").textContent = dict.kpi3Label;
      kpiItems[2].querySelector(".kpi-value small").textContent = dict.kpi3Unit;
      kpiItems[3].querySelector(".kpi-label").textContent = dict.kpi4Label;
    }

    const tourLabel = document.getElementById("tour-btn-label");
    if (tourLabel) {
      tourLabel.textContent = state.tourInterval ? dict.pauseTour : dict.storyTour;
    }

    const resetBtn = document.getElementById("btn-reset-view");
    if (resetBtn) resetBtn.textContent = dict.fullExtent;

    const themeBtn = document.getElementById("btn-theme-toggle");
    if (themeBtn) {
      themeBtn.textContent = state.theme === "parchment" ? dict.themeParchment : dict.themeDark;
    }

    // Map toolbar
    const filterGroups = document.querySelectorAll(".map-toolbar .filter-group");
    if (filterGroups.length >= 2) {
      const phaseLbl = filterGroups[0].querySelector(".toolbar-label");
      if (phaseLbl) phaseLbl.textContent = dict.phaseLabel;
      const corpsLbl = filterGroups[1].querySelector(".toolbar-label");
      if (corpsLbl) corpsLbl.textContent = dict.corpsLabel;
    }

    const chipAll = document.querySelector('[data-filter-phase="all"]');
    if (chipAll) chipAll.textContent = dict.phaseAll;

    const chipAdv = document.querySelector('[data-filter-phase="Advance"]');
    if (chipAdv) {
      chipAdv.innerHTML = `<span class="swatch swatch-advance"></span>${dict.phaseAdvance}`;
    }

    const chipRet = document.querySelector('[data-filter-phase="Retreat"]');
    if (chipRet) {
      chipRet.innerHTML = `<span class="swatch swatch-retreat"></span>${dict.phaseRetreat}`;
    }

    const selectRoute = document.getElementById("select-route");
    if (selectRoute && selectRoute.options.length >= 4) {
      selectRoute.options[0].textContent = dict.routeAll;
      selectRoute.options[1].textContent = dict.routeMain;
      selectRoute.options[2].textContent = dict.routePolotsk;
      selectRoute.options[3].textContent = dict.routeRiga;
    }

    const chkTroopSpan = document.querySelector("#chk-troop-labels + span");
    if (chkTroopSpan) chkTroopSpan.textContent = dict.chkTroopLabels;
    const chkPathSpan = document.querySelector("#chk-connect-path + span");
    if (chkPathSpan) chkPathSpan.textContent = dict.chkConnectPath;
    const chkRiversSpan = document.querySelector("#chk-rivers + span");
    if (chkRiversSpan) chkRiversSpan.textContent = dict.chkRivers;

    // Legend
    const legendTitle = document.querySelector(".map-legend .legend-title");
    if (legendTitle) legendTitle.textContent = dict.legendTitle;
    const legendEl = document.getElementById("map-legend");
    const legendToggleLabel = document.getElementById("legend-toggle-label");
    if (legendToggleLabel) {
      const isCollapsed = legendEl && legendEl.classList.contains("is-collapsed");
      legendToggleLabel.textContent = isCollapsed ? dict.legendShow : dict.legendHide;
    }
    const legendRows = document.querySelectorAll(".map-legend .legend-row");
    if (legendRows.length >= 4) {
      legendRows[0].querySelector("span:last-child").innerHTML = `<strong>${dict.legendAdvStrong}</strong> ${dict.legendAdvDesc}`;
      legendRows[1].querySelector("span:last-child").innerHTML = `<strong>${dict.legendRetStrong}</strong> ${dict.legendRetDesc}`;
      legendRows[2].querySelector("span:last-child").textContent = dict.legendWpAdv;
      legendRows[3].querySelector("span:last-child").textContent = dict.legendWpRet;
    }
    const legendNote = document.querySelector(".map-legend .legend-scale-note");
    if (legendNote) legendNote.textContent = dict.legendNote;

    // Spotlight buttons
    const prevBtn = document.getElementById("btn-prev-step");
    if (prevBtn) prevBtn.textContent = dict.prevEvent;
    const nextBtn = document.getElementById("btn-next-step");
    if (nextBtn) nextBtn.textContent = dict.nextEvent;

    // Temperature panel
    const tempTitle = document.querySelector(".temp-panel-title");
    if (tempTitle) tempTitle.textContent = dict.tempTitle;
    const tempSubtitle = document.querySelector(".temp-panel-subtitle");
    if (tempSubtitle) tempSubtitle.textContent = dict.tempSubtitle;
    const tempLegend = document.querySelector(".temp-unit-legend");
    if (tempLegend) {
      tempLegend.innerHTML = `
        <span class="temp-dot temp-dot-adv"></span> ${dict.tempLegendAdv}
        <span class="temp-dot temp-dot-ret"></span> ${dict.tempLegendRet}
        <span class="temp-dot temp-dot-cold"></span> ${dict.tempLegendCold}
      `;
    }

    // Sidebar Tabs & Search
    const tabTimeline = document.querySelector('[data-tab="timeline"]');
    if (tabTimeline) tabTimeline.textContent = dict.tabTimeline;
    const tabSegments = document.querySelector('[data-tab="segments"]');
    if (tabSegments) tabSegments.textContent = dict.tabSegments;
    const tabNotes = document.querySelector('[data-tab="notes"]');
    if (tabNotes) tabNotes.textContent = dict.tabNotes;

    const searchInput = document.getElementById("search-events");
    if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

    const segSummary = document.querySelector(".segments-summary");
    if (segSummary) segSummary.innerHTML = dict.segmentsSummaryHtml;

    const histArticle = document.querySelector(".historical-article");
    if (histArticle) histArticle.innerHTML = dict.historicalArticleHtml;
  }

  function setLanguage(newLang) {
    const normalized = newLang === "en" ? "en" : "es";
    if (state.lang === normalized) return;
    state.lang = normalized;

    applyStaticTranslations();
    renderRiversLayer();
    renderFlowPolygons();
    renderWaypointsAndPaths();
    const searchEl = document.getElementById("search-events");
    renderTimelineSidebar(searchEl ? searchEl.value : "");
    renderSegmentsSidebar();
    renderMinardChart();

    if (state.selectedStepIndex) {
      selectWaypoint(state.selectedStepIndex, false);
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "MINARD_LANGUAGE_CHANGE") {
      setLanguage(event.data.lang);
    }
  });

  // =========================================================================
  // 8. Interactive Controls, Filters & Guided Story Tour
  // =========================================================================

  function stopTour() {
    if (state.tourInterval) {
      clearInterval(state.tourInterval);
      state.tourInterval = null;
    }
    const btn = document.getElementById("btn-tour-toggle");
    const label = document.getElementById("tour-btn-label");
    btn.classList.remove("playing");
    label.textContent = t().storyTour;
  }

  function toggleTour() {
    if (state.tourInterval) {
      stopTour();
      return;
    }

    const btn = document.getElementById("btn-tour-toggle");
    const label = document.getElementById("tour-btn-label");
    btn.classList.add("playing");
    label.textContent = t().pauseTour;

    const nextIdx =
      state.selectedStepIndex && state.selectedStepIndex < state.waypoints.length
        ? state.selectedStepIndex
        : 1;
    selectWaypoint(nextIdx, true);

    state.tourInterval = setInterval(() => {
      const current = state.selectedStepIndex || 1;
      if (current >= state.waypoints.length) {
        stopTour();
      } else {
        selectWaypoint(current + 1, true);
      }
    }, 3800);
  }

  function bindUIEvents() {
    document.querySelectorAll("[data-filter-phase]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-filter-phase]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.activePhaseFilter = chip.dataset.filterPhase;
        renderFlowPolygons();
        renderWaypointsAndPaths();
        renderTimelineSidebar(document.getElementById("search-events").value);
      });
    });

    document.getElementById("select-route").addEventListener("change", (e) => {
      state.activeRouteFilter = e.target.value;
      renderFlowPolygons();
      renderWaypointsAndPaths();
      renderTimelineSidebar(document.getElementById("search-events").value);
    });

    document.getElementById("chk-troop-labels").addEventListener("change", (e) => {
      state.showTroopLabels = e.target.checked;
      renderFlowPolygons();
    });

    document.getElementById("chk-connect-path").addEventListener("change", (e) => {
      state.showConnectPath = e.target.checked;
      renderWaypointsAndPaths();
    });

    document.getElementById("chk-rivers").addEventListener("change", (e) => {
      state.showRivers = e.target.checked;
      renderRiversLayer();
    });

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        document.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.getElementById("tab-panel-timeline").hidden = targetTab !== "timeline";
        document.getElementById("tab-panel-segments").hidden = targetTab !== "segments";
        document.getElementById("tab-panel-notes").hidden = targetTab !== "notes";
        document.getElementById("timeline-search-bar").hidden = targetTab !== "timeline";
      });
    });

    document.getElementById("search-events").addEventListener("input", (e) => {
      renderTimelineSidebar(e.target.value);
    });

    document.getElementById("btn-prev-step").addEventListener("click", () => {
      stopTour();
      const prev =
        state.selectedStepIndex && state.selectedStepIndex > 1
          ? state.selectedStepIndex - 1
          : state.waypoints.length;
      selectWaypoint(prev, true);
    });

    document.getElementById("btn-next-step").addEventListener("click", () => {
      stopTour();
      const next =
        state.selectedStepIndex && state.selectedStepIndex < state.waypoints.length
          ? state.selectedStepIndex + 1
          : 1;
      selectWaypoint(next, true);
    });

    document.getElementById("spotlight-close").addEventListener("click", () => {
      stopTour();
      document.getElementById("active-spotlight").hidden = true;
      state.selectedStepIndex = null;
      renderWaypointsAndPaths();
    });

    document.getElementById("btn-tour-toggle").addEventListener("click", toggleTour);

    document.getElementById("btn-reset-view").addEventListener("click", () => {
      stopTour();
      if (state.map) {
        state.map.flyTo([55.15, 30.5], 6, { duration: 0.7 });
      }
    });

    document.getElementById("btn-theme-toggle").addEventListener("click", (e) => {
      state.theme = state.theme === "parchment" ? "dark" : "parchment";
      document.body.setAttribute("data-theme", state.theme);
      e.currentTarget.textContent =
        state.theme === "parchment" ? t().themeParchment : t().themeDark;
    });

    // Original Map Dialog & Popup Window controls + fallbacks
    const origDialog = document.getElementById("original-map-dialog");
    const origOpenBtn = document.getElementById("btn-original-map");
    const origCloseBtn = document.getElementById("btn-close-original-dialog");
    const origPopupWinBtn = document.getElementById("btn-open-popup-window");

    if (origDialog) {
      if (!("commandForElement" in HTMLButtonElement.prototype)) {
        if (origOpenBtn) {
          origOpenBtn.addEventListener("click", () => {
            if (!origDialog.open) origDialog.showModal();
          });
        }
        if (origCloseBtn) {
          origCloseBtn.addEventListener("click", () => {
            if (origDialog.open) origDialog.close();
          });
        }
      }

      if (!("closedBy" in HTMLDialogElement.prototype)) {
        origDialog.addEventListener("click", (event) => {
          if (event.target !== origDialog) return;
          const rect = origDialog.getBoundingClientRect();
          const isDialogContent =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (isDialogContent) return;
          origDialog.close();
        });
      }
    }

    if (origPopupWinBtn) {
      origPopupWinBtn.addEventListener("click", () => {
        window.open(
          "minard.png",
          "MinardOriginal1869",
          "width=1280,height=780,resizable=yes,scrollbars=yes"
        );
      });
    }

    // Legend Sandwich (Hide / Show) Control
    const legendEl = document.getElementById("map-legend");
    const legendToggleBtn = document.getElementById("btn-legend-toggle");
    const legendToggleLabel = document.getElementById("legend-toggle-label");
    const legendBody = document.getElementById("legend-body");

    if (legendToggleBtn && legendEl && legendBody) {
      legendToggleBtn.addEventListener("click", () => {
        const willCollapse = !legendEl.classList.contains("is-collapsed");
        if (!willCollapse) {
          legendBody.hidden = false;
        }
        // Force layout read when expanding so transition plays from 0 -> auto
        void legendBody.offsetHeight;
        legendEl.classList.toggle("is-collapsed", willCollapse);
        legendToggleBtn.setAttribute("aria-expanded", String(!willCollapse));
        if (legendToggleLabel) {
          legendToggleLabel.textContent = willCollapse ? t().legendShow : t().legendHide;
        }
      });

      legendBody.addEventListener("transitionend", (event) => {
        if (
          event.propertyName === "block-size" &&
          legendEl.classList.contains("is-collapsed")
        ) {
          legendBody.hidden = true;
        }
      });
    }
  }

  // =========================================================================
  // 9. Bootstrap Application
  // =========================================================================

  async function init() {
    try {
      await loadAndAdaptData();
      initMap();
      applyStaticTranslations();
      renderRiversLayer();
      renderFlowPolygons();
      renderWaypointsAndPaths();
      renderTimelineSidebar();
      renderSegmentsSidebar();
      renderMinardChart();
      bindUIEvents();

      const allLayer = L.geoJSON(state.campaignGeoJSON);
      state.map.fitBounds(allLayer.getBounds(), { padding: [24, 24] });

      selectWaypoint(1, false);
    } catch (err) {
      console.error("Failed to initialize Minard Leaflet Atlas:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
