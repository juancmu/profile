import fs from 'fs';
import path from 'path';
import { QUESTIONS } from '../src/pages/gispQuestions.js';

const newQuestions = [
  // ── CARTOGRAPHY & VISUALIZATION (101-120) ──────────────────────────────────────
  {
    id: 101,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which map projection preserves local shapes and angles but distorts areas significantly near the poles?",
    options: ["Lambert Equal-Area", "Mercator", "Gall-Peters", "Sinusoidal"],
    answer: 1,
    explanation: "The Mercator projection is a conformal cylindrical projection. It preserves local angles and shapes (conformality) at the expense of severe area distortion at high latitudes."
  },
  {
    id: 102,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What is the scale factor at the central meridian of any Universal Transverse Mercator (UTM) zone?",
    options: ["1.0000", "0.9996", "0.9900", "1.0004"],
    answer: 1,
    explanation: "To reduce overall distortion across the zone, a scale factor of 0.9996 is applied to the central meridian of each UTM zone."
  },
  {
    id: 103,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which visual variable is best suited for representing nominal (categorical) data on a map?",
    options: ["Value", "Size", "Color Hue", "Texture density"],
    answer: 2,
    explanation: "Color Hue (different colors like red, blue, green) is the most effective visual variable for displaying categorical/nominal differences because it does not imply order or quantity."
  },
  {
    id: 104,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "A cartogram is a map projection style where geographic size is scaled proportional to:",
    options: ["Topological connectivity", "An attribute value (e.g., population or GDP)", "Geodetic distance from the center", "True ellipsoidal surface area"],
    answer: 1,
    explanation: "In a cartogram, the thematic variable (such as population) replaces the land area or distance, distorting the map geometry to reflect the statistical value."
  },
  {
    id: 105,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which classification method is most appropriate when you want to emphasize data extremes and outliers?",
    options: ["Equal Interval", "Standard Deviation", "Quantile", "Natural Breaks (Jenks)"],
    answer: 1,
    explanation: "Standard Deviation classification displays classes based on statistical variance from the mean, highlighting outliers that lie several standard deviations away."
  },
  {
    id: 106,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What does a scale of 1:24,000 represent for a standard USGS quadrangle map?",
    options: ["1 inch on the map equals 24,000 feet on the ground", "1 unit on the map equals 24,000 of the same units on the ground", "1 centimeter on the map equals 24 kilometers on the ground", "1 foot on the map equals 24,000 meters on the ground"],
    answer: 1,
    explanation: "A representative fraction (RF) scale like 1:24,000 is unitless: 1 unit (inch, cm, etc.) on the map represents 24,000 of that same unit on the ground."
  },
  {
    id: 107,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which map projection is characterized by straight rhumb lines, making it highly valuable for marine navigation?",
    options: ["Mercator", "Gnomonic", "Azimuthal Equidistant", "Albers Conic"],
    answer: 0,
    explanation: "On a Mercator projection, any straight line represents a line of constant compass bearing (rhumb line), which makes it simple for navigators to plot courses."
  },
  {
    id: 108,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which cartographic generalization process involves combining multiple distinct point symbols into a single polygon cluster at small scales?",
    options: ["Simplification", "Aggregation", "Displacement", "Refinement"],
    answer: 1,
    explanation: "Aggregation is the process of joining multiple close features into a single higher-order feature (such as multiple point buildings into a single urban area polygon)."
  },
  {
    id: 109,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "A diverging color ramp is most appropriate for visualizing which of the following datasets?",
    options: ["Population density", "Mean temperature anomalies (deviation from long-term average)", "Soil classification types", "Total annual rainfall amounts"],
    answer: 1,
    explanation: "Diverging color ramps use two contrasting hues that highlight deviations in positive and negative directions from a critical midpoint value (such as average temperature)."
  },
  {
    id: 110,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "In GIS map labeling, what does an 'annotation' class provide that dynamic labels do not?",
    options: ["Automatic coordinate projection", "Individual control over the placement, size, and styling of each text element", "Smaller file sizes and database footprint", "Instant update based on attribute values"],
    answer: 1,
    explanation: "Annotation layers store individual text features, allowing cartographers to manually position, style, and edit individual labels without depending on dynamic placement rules."
  },
  {
    id: 111,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which coordinate grid lines on a map represent lines of constant latitude?",
    options: ["Meridians", "Parallels", "Great Circles", "Rhumb Lines"],
    answer: 1,
    explanation: "Parallels are horizontal grid lines representing constant latitude, running parallel to the Equator. Meridians represent constant longitude."
  },
  {
    id: 112,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What type of map projection is formed by projecting the earth's surface onto a flat plane tangent at a single point?",
    options: ["Cylindrical", "Conic", "Azimuthal", "Transverse"],
    answer: 2,
    explanation: "Azimuthal (or planar) projections project geographic data onto a flat plane tangent or secant to the Earth's surface, preserving directions from the center point."
  },
  {
    id: 113,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Why is normalizing data (e.g., dividing population by area) essential for choropleth maps?",
    options: ["To speed up rendering in GIS software", "To prevent large-area polygons from dominating the visual layout and misrepresenting density", "To convert data to decimal degrees", "To match the projection coordinate system"],
    answer: 1,
    explanation: "Without normalization, larger areas are visually exaggerated and raw counts fail to represent the actual spatial density or rate, leading to incorrect interpretations."
  },
  {
    id: 114,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What visual effect is achieved by using a hillshade raster behind a terrain map?",
    options: ["Calculating true aspect angles", "Simulating the light and shadow on a surface to create a 3D illusion of relief", "Delineating stream channels", "Determining slope percentages"],
    answer: 1,
    explanation: "Hillshading calculates hypothetical illumination of a surface from a specified sun angle, creating shadows that give the user a clear visual perception of terrain relief."
  },
  {
    id: 115,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which map projection is commonly used by Google Maps and most modern web mapping services?",
    options: ["WGS 84 Geographic (EPSG:4326)", "Web Mercator (EPSG:3857)", "UTM Zone 10N", "Robinson compromises"],
    answer: 1,
    explanation: "Web Mercator (EPSG:3857) is the standard projection for web maps because it preserves angles and directions locally, and projects the earth onto a clean square raster grid."
  },
  {
    id: 116,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What characterizes a 'large-scale' map compared to a 'small-scale' map?",
    options: ["It covers a very large geographic area with minimal detail", "It has a larger representative fraction (e.g., 1:5,000) and displays a small area with high detail", "It applies only to regional maps", "It has a smaller representative fraction (e.g., 1:1,000,000)"],
    answer: 1,
    explanation: "A large-scale map has a larger fraction value (like 1/1,000 is larger than 1/1,000,000). It covers a small area but reveals much more detail and features."
  },
  {
    id: 117,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "On a map showing points with varying sizes, which symbol scaling method scales symbol radius linearly with the data value?",
    options: ["Perceptual scaling", "Mathematical radius scaling (causes area to grow quadratically)", "Apparent magnitude scaling", "Range grading"],
    answer: 1,
    explanation: "Linear scaling of the radius causes the area of the symbol to grow quadratically relative to value changes. This exaggerates larger values because humans perceive the symbol's area, not its radius."
  },
  {
    id: 118,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which type of isoline represents lines of equal water depth?",
    options: ["Isobaths", "Isohyets", "Isobars", "Isotherms"],
    answer: 0,
    explanation: "Isobaths are lines representing equal depth below a water surface. Isohyets connect rainfall; Isobars connect atmospheric pressure; Isotherms connect temperature."
  },
  {
    id: 119,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "What is the primary visual difference between conformal and equal-area map projections?",
    options: ["Conformal projections preserve distances; equal-area projections preserve angles", "Conformal projections preserve local shapes and angles; equal-area projections preserve area proportions", "Conformal projections are always flat; equal-area are always conic", "Conformal projections show no distortion anywhere"],
    answer: 1,
    explanation: "A projection cannot be both conformal and equal-area. Conformal projections preserve local shapes and angles, while equal-area projections maintain proportional area relationships across the map."
  },
  {
    id: 120,
    domain: "cartography",
    domainLabel: "Cartography",
    text: "Which color model is primarily used for designing maps intended for commercial offset printing?",
    options: ["RGB (Red, Green, Blue)", "CMYK (Cyan, Magenta, Yellow, Key/Black)", "HSV (Hue, Saturation, Value)", "HEX hexadecimals"],
    answer: 1,
    explanation: "CMYK is the standard subtractive color model for physical ink printing, whereas RGB is the additive color model for digital screen displays."
  },

  // ── SPATIAL ANALYSIS (121-145) ─────────────────────────────────────────────────
  {
    id: 121,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In spatial analysis, which interpolation method assumes that the variable being mapped has a continuous spatial trend that can be modeled by a mathematical function (e.g., polynomial)?",
    options: ["Inverse Distance Weighting (IDW)", "Spline", "Trend Surface Analysis", "Nearest Neighbor"],
    answer: 2,
    explanation: "Trend Surface Analysis is a global interpolator that uses polynomial regression equations to fit a smooth mathematical surface through all control points."
  },
  {
    id: 122,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "What type of analysis calculates the straight-line distance from each cell in a raster grid to the nearest source feature?",
    options: ["Cost Distance", "Euclidean Distance", "Network Impedance", "Manhattan Distance"],
    answer: 1,
    explanation: "Euclidean distance measures straight-line distance from every cell to the closest source, represented by the hypotenuse of a right triangle."
  },
  {
    id: 123,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which tool would you use to find the single center point of a point pattern that minimizes total Euclidean distance to all other points?",
    options: ["Mean Center", "Median Center", "Central Feature", "Standard Distance"],
    answer: 1,
    explanation: "The Median Center is the location that minimizes the sum of straight-line distances to all points in the dataset (also known as the Fermat-Weber point)."
  },
  {
    id: 124,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In raster suitability modeling, what does a 'fuzzy overlay' account for that a standard binary overlay does not?",
    options: ["The storage format of the input rasters", "Possibility of membership in a set on a continuous scale from 0 to 1, rather than strict true/false classes", "The projection system of the input maps", "Incorrect coordinate alignments"],
    answer: 1,
    explanation: "Fuzzy logic allows values to range between 0 (not member) and 1 (full member), modeling gradual transitions and uncertainties in suitability rather than hard yes/no criteria."
  },
  {
    id: 125,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "When conducting a point pattern analysis, what is the significance of a high Nearest Neighbor Ratio (greater than 1)?",
    options: ["The points exhibit a highly clustered spatial pattern", "The points exhibit a dispersed or regular spatial pattern", "The points are randomly distributed", "The coordinate system is offset"],
    answer: 1,
    explanation: "An Average Nearest Neighbor ratio greater than 1 indicates that the observed average distance between points is greater than expected under random distribution, showing a dispersed or regular pattern."
  },
  {
    id: 126,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which GIS operation creates a polygon representing areas that can be reached along a road network within a 10-minute drive?",
    options: ["Euclidean Buffer", "Service Area Network Analysis", "Shortest Path Routing", "Kernel Density Zone"],
    answer: 1,
    explanation: "Service Area analysis solves network accessibility along routing segments, determining lines or polygons reachable within a designated cost limit (e.g. 10 minutes of travel time)."
  },
  {
    id: 127,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which interpolation method is a deterministic, local interpolator that assumes closer points have a stronger influence on the predicted value than farther points, weighted solely by distance?",
    options: ["Kriging", "Inverse Distance Weighting (IDW)", "Polynomial Regression", "Spline"],
    answer: 1,
    explanation: "IDW calculates predictions based solely on a mathematical function of inverse distance, with no geological or statistical models of autocorrelation involved."
  },
  {
    id: 128,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which operations are classified as 'local operations' in map algebra?",
    options: ["Operations that calculate values using adjacent cells within a moving window", "Operations that compute cell values on a cell-by-cell basis across multiple raster layers", "Operations that aggregate data within zones", "Operations that calculate statistics for the entire raster"],
    answer: 1,
    explanation: "Local operations combine cell values across multiple aligned raster layers for each individual cell position independently (e.g. adding two rasters together)."
  },
  {
    id: 129,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "What does a high positive value of Moran's I indicate?",
    options: ["High spatial dispersion of dissimilar values", "Spatial clustering of similar values (high values near high, low near low)", "Completely random spatial distribution", "Data errors in the attribute table"],
    answer: 1,
    explanation: "A positive Moran's I indicates positive spatial autocorrelation: similar values are located near each other in space, suggesting spatial clustering."
  },
  {
    id: 130,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In watershed analysis, what is a 'sink' in a digital elevation model (DEM)?",
    options: ["The highest peak in the raster surface", "An area of incorrect or low elevation cells surrounded by higher values, which traps artificial water flow", "The outlet where water drains from the map", "A reservoir layer"],
    answer: 1,
    explanation: "Sinks are depressions in DEMs where water cannot flow out. Sinks must be filled before flow direction and flow accumulation models are run to ensure continuous drainage networks."
  },
  {
    id: 131,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which spatial statistic identifies local high-value spatial clusters (hot spots) using a weighted distance matrix?",
    options: ["Global Moran's I", "Getis-Ord Gi*", "Ripley's K", "Standard Deviational Ellipse"],
    answer: 1,
    explanation: "Getis-Ord Gi* evaluates local features relative to their neighboring values, pinpointing statistically significant hot spots (clusters of high values) and cold spots (clusters of low values)."
  },
  {
    id: 132,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which type of raster operation evaluates cells within a specified neighborhood (e.g., a 3x3 moving window) to calculate output values?",
    options: ["Local operation", "Focal operation", "Zonal operation", "Global operation"],
    answer: 1,
    explanation: "Focal (or neighborhood) operations calculate cell values based on the input values of surrounding cells within a defined shape or kernel moving across the grid."
  },
  {
    id: 133,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "When interpolating elevation points, what is the main advantage of using a Spline method?",
    options: ["It produces a surface that passes exactly through all input sample values and is mathematically smooth", "It provides statistical error estimates", "It works only with categorical data", "It restricts output values to the minimum and maximum inputs"],
    answer: 0,
    explanation: "Spline is a deterministic, exact interpolator that fits a flexible surface through the sample points, creating smooth curves that can extend beyond the range of input values."
  },
  {
    id: 134,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In network routing, Dijkstra's algorithm is primarily used to:",
    options: ["Determine the most visually balanced map layout", "Find the shortest path between a source node and all other destination nodes in a weighted graph", "Create a polygon index", "Convert vector coordinates to raster pixels"],
    answer: 1,
    explanation: "Dijkstra's algorithm is a fundamental graph search method that calculates the minimum path (lowest cumulative impedance) between network nodes."
  },
  {
    id: 135,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "What does the Zonal Statistics tool accomplish in GIS?",
    options: ["It reprojects a raster to a different UTM zone", "It calculates statistical values (mean, sum, max, etc.) for a raster within zones defined by another vector or raster layer", "It counts the total number of polygons in a shapefile", "It isolates watershed boundaries"],
    answer: 1,
    explanation: "Zonal statistics aggregates values from a value raster within defined zones (e.g. land use polygons or watershed basins) from another dataset."
  },
  {
    id: 136,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which spatial operation combines input features from two layers and preserves only the geometries that overlap in both?",
    options: ["Union", "Intersect", "Clip", "Erase"],
    answer: 1,
    explanation: "Intersect performs a spatial overlay, outputting a new feature class containing only the parts of features that overlap in both input datasets, along with attributes from both."
  },
  {
    id: 137,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In remote sensing, what does the 'spectral signature' of an object describe?",
    options: ["The name of the sensor satellite that captured it", "How it reflects and absorbs electromagnetic radiation across different wavelengths", "Its exact geographic coordinate footprint", "The file compression algorithm used on the image"],
    answer: 1,
    explanation: "Spectral signatures plot reflectance against wavelength. Different materials (like water, vegetation, soil) have distinct profiles, allowing features to be identified via multi-spectral band comparison."
  },
  {
    id: 138,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which type of analysis uses points of known coordinates and values to build a continuous mathematical surface?",
    options: ["Overlay Analysis", "Spatial Interpolation", "Network Analysis", "Buffer Analysis"],
    answer: 1,
    explanation: "Spatial interpolation uses sample measurements at discrete locations to predict values for all unsampled cells on a continuous raster surface."
  },
  {
    id: 139,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "What is the primary difference between a simple Euclidean buffer and a geodesic buffer?",
    options: ["Geodesic buffers are calculated on a flat coordinate system; Euclidean buffers account for earth curvature", "Euclidean buffers are calculated on a flat plane; geodesic buffers account for ellipsoidal earth shape, making them accurate over large distances", "Geodesic buffers only work on raster grids", "Euclidean buffers require 3D coordinate inputs"],
    answer: 1,
    explanation: "Euclidean buffers assume a flat cartesian coordinate plane and distort over large areas. Geodesic buffers follow the curved ellipsoidal model of the earth, maintaining accurate distance boundaries globally."
  },
  {
    id: 140,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which statistic measures spatial dispersion by drawing a polygon representing the directional bias and distribution of points?",
    options: ["Mean Center", "Standard Deviational Ellipse", "Ripley's K function", "Local Moran's I"],
    answer: 1,
    explanation: "A Standard Deviational Ellipse calculates the spatial trend of a point set, revealing directional distribution, dispersion, and orientation patterns."
  },
  {
    id: 141,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In GIS routing, a 'one-way restriction' on a line feature is represented in network datasets as an attribute of:",
    options: ["Nodes", "Edges", "Turns", "Junctions"],
    answer: 1,
    explanation: "Edges represent road segments. Directional travel restrictions (like one-way roads) are stored as edge attributes that block routing algorithms from traversing them in the illegal direction."
  },
  {
    id: 142,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which raster overlay method multiplies cell values of input layers together, where a cell value of 0 acts as a constraint?",
    options: ["Weighted Overlay", "Arithmetic Multiplicative Overlay (Binary constraints)", "Fuzzy Union", "Additive overlay"],
    answer: 1,
    explanation: "In binary suitability models, multiplying rasters composed of 1s (suitable) and 0s (unsuitable) ensures that if any layer is unsuitable (0), the output cell becomes 0, filtering out unsuitable locations."
  },
  {
    id: 143,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "In terrain analysis, which DEM-derived measure calculates the second derivative of elevation, representing the rate of change of slope?",
    options: ["Aspect", "Slope", "Curvature", "Hillshade"],
    answer: 2,
    explanation: "Curvature is the second derivative of the elevation surface (rate of change of slope). It helps analyze geomorphological profiles, defining ridges, valleys, and surface water runoff dynamics."
  },
  {
    id: 144,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "Which remote sensing band combination is typically used to generate a false-color infrared image to evaluate vegetation health?",
    options: ["Red, Green, Blue", "Near-Infrared, Red, Green", "Shortwave-Infrared, Red, Blue", "Thermal-Infrared, Green, Blue"],
    answer: 1,
    explanation: "False-color infrared composites assign Near-Infrared to the red channel, Red to the green channel, and Green to the blue channel, highlighting highly reflective green vegetation as bright red."
  },
  {
    id: 145,
    domain: "spatial-analysis",
    domainLabel: "Spatial Analysis",
    text: "What is the term for the spatial analysis phenomenon where boundaries of features appear to skew statistics due to lack of neighboring data outside the study area?",
    options: ["Scale effect", "Edge effect", "Zoning effect", "MAUP"],
    answer: 1,
    explanation: "The edge effect occurs when analyzing spatial points or boundaries near the edge of a study region, since the lack of recorded data outside the border skews density and neighborhood calculations."
  },

  // ── DATA MANAGEMENT (146-165) ──────────────────────────────────────────────────
  {
    id: 146,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which database coordinate reference system storage method defines the boundaries, projection, and linear unit of coordinates?",
    options: ["SQL constraint schema", "Spatial Reference Identifier (SRID)", "Metadata XML template", "Attribute domain definition"],
    answer: 1,
    explanation: "The Spatial Reference Identifier (SRID) links spatial geometry values in a database to their corresponding coordinate system parameters in tables like spatial_ref_sys."
  },
  {
    id: 147,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which file format is a plain text, open-standard format for simple vector geographic data representation, widely used in web development?",
    options: ["Shapefile", "GeoPackage", "GeoJSON", "DWG"],
    answer: 2,
    explanation: "GeoJSON is a lightweight, human-readable file format based on JSON (JavaScript Object Notation), representing points, lines, polygons, and their non-spatial attributes."
  },
  {
    id: 148,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is the primary coordinate datum for the Global Positioning System (GPS)?",
    options: ["NAD27", "ED50", "WGS 84", "NAD83"],
    answer: 2,
    explanation: "WGS 84 (World Geodetic System 1984) is the global ellipsoidal datum developed for GPS, matching coordinate systems worldwide."
  },
  {
    id: 149,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "In database theory, what is a primary key?",
    options: ["A key that unlocks spatial files", "A column or set of columns that uniquely identifies each row in a database table", "An index used to speed up queries", "A foreign key linked to another schema"],
    answer: 1,
    explanation: "A primary key enforces unique constraints on a column, preventing duplicate records and enabling relational tables to link together."
  },
  {
    id: 150,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What type of compression is used by MRFID (MrSID) image formats, allowing rapid viewing of massive rasters by reading only required resolution levels?",
    options: ["Lossless zip compression", "Wavelet compression", "LZW pixel reduction", "JPEG quantization"],
    answer: 1,
    explanation: "MrSID (Multiresolution Seamless Image Database) utilizes wavelet compression technology to compress massive imagery while allowing selective decompression at different zoom scales."
  },
  {
    id: 151,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is the difference between geographic coordinate systems (GCS) and projected coordinate systems (PCS)?",
    options: ["GCS are in meters; PCS are in feet", "GCS represent coordinates on a 3D spherical model (lat/long); PCS project those coordinates onto a flat 2D plane (X/Y)", "PCS are older than GCS datums", "GCS use conformal projections"],
    answer: 1,
    explanation: "A GCS defines coordinates on a three-dimensional model of the earth (using degrees of latitude and longitude). A PCS converts those spherical coordinates to a flat surface using map projections (using linear units like meters or feet)."
  },
  {
    id: 152,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which OGC standard file extension contains SQLite databases storing vector features, tile matrices, and metadata tables?",
    options: [".geojson", ".kml", ".gpkg", ".shp"],
    answer: 2,
    explanation: "GeoPackage (.gpkg) is an open, SQLite-based container that holds vector data, raster tiles, and attributes in a single file format."
  },
  {
    id: 153,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What does the 'lineage' section of a geospatial metadata file record?",
    options: ["The pricing and licensing terms of the dataset", "The history of data sources, processing steps, transformations, and coordinate changes applied to the data", "The contact details of the database administrator", "The spatial boundary coordinates"],
    answer: 1,
    explanation: "Metadata lineage documents the history and source materials used to construct a dataset, including the processing methods applied, facilitating transparency and reproduction."
  },
  {
    id: 154,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which geospatial data index divides coordinate space into nested grid cells, widely used by databases to index geometric shapes?",
    options: ["B-Tree Index", "Quadtree or R-Tree Index", "Hash Index", "Serial key index"],
    answer: 1,
    explanation: "R-Trees and Quadtrees group spatial features by boundary coordinates in hierarchical trees, allowing spatial queries (like bounding box overlaps) to search specific branches instead of entire datasets."
  },
  {
    id: 155,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is the role of the ellipsoid in coordinate reference systems?",
    options: ["To represent local mountain heights", "To mathematically approximate the three-dimensional, flattened shape of the earth at sea level", "To determine satellite orbit paths", "To measure atmospheric pressure"],
    answer: 1,
    explanation: "An ellipsoid is a smooth mathematical sphere approximation that provides the base geometry for calculating geodetic coordinate grids (latitudes and longitudes)."
  },
  {
    id: 156,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is a 'foreign key' in a relational database?",
    options: ["A primary key from an external database server", "An attribute column in a table that references the primary key of another table to establish a link between them", "An encrypted access token", "An index for spatial coordinates"],
    answer: 1,
    explanation: "Foreign keys enforce referential integrity between tables, linking child records to their corresponding parent records in associated tables."
  },
  {
    id: 157,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is the spatial data resolution of a raster grid?",
    options: ["The number of layers in the file", "The ground size represented by each individual pixel (cell size)", "The coordinate accuracy of cell corners", "The maximum elevation range"],
    answer: 1,
    explanation: "Raster spatial resolution is determined by cell size. A 10m resolution means each pixel represents a 10x10 meter square area on the ground."
  },
  {
    id: 158,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which vector file component stores attribute data in the ESRI Shapefile format?",
    options: [".shp", ".shx", ".dbf", ".prj"],
    answer: 2,
    explanation: "A shapefile requires multiple files: .shp stores geometries, .shx stores spatial index, and .dbf stores attribute data in dBase format."
  },
  {
    id: 159,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "In database design, what does 'data redundancy' lead to?",
    options: ["Faster query performance", "Wasted storage space, database size bloat, and inconsistencies when data is updated in one location but not another", "Automatic backups", "Improved spatial query accuracy"],
    answer: 1,
    explanation: "Redundancy (storing duplicate information across different tables) causes database bloat and leads to update anomalies where conflicting data variants exist."
  },
  {
    id: 160,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which coordinate reference system is designed to minimize projection distortion within a single, narrow state region in the US?",
    options: ["UTM (Universal Transverse Mercator)", "SPCS (State Plane Coordinate System)", "WGS 84 Geographic", "Mercator"],
    answer: 1,
    explanation: "The State Plane Coordinate System (SPCS) divides US states into small zones with customized local projections (Lambert Conformal Conic or Transverse Mercator) to limit distortion to less than 1 part in 10,000."
  },
  {
    id: 161,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What is a TIN (Triangulated Irregular Network) data model?",
    options: ["A raster grid for elevation values", "A vector structure representing a continuous surface using a network of non-overlapping, irregular triangles", "A database system for topology rules", "An image file format for terrain models"],
    answer: 1,
    explanation: "TINs model terrain using elevation points (vertices) connected by edges into a mesh of triangles, allowing detailed relief mapping with fewer data points than dense rasters."
  },
  {
    id: 162,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What does the term 'metadata' mean?",
    options: ["Compressed spatial data files", "Data about data — documentation describing the content, quality, source, and structure of a dataset", "Relational database tables", "Web map coordinate systems"],
    answer: 1,
    explanation: "Metadata is structured documentation that informs users about a dataset's origin, coordinate systems, attribute fields, constraints, and lineage."
  },
  {
    id: 163,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "Which GPS method uses two receivers (base and rover) measuring carrier phase signal wavelengths to resolve coordinates with sub-centimeter accuracy?",
    options: ["Differential GPS (DGPS)", "Real-Time Kinematic (RTK) GPS", "Standard Trilateration", "Assisted GPS (A-GPS)"],
    answer: 1,
    explanation: "RTK (Real-Time Kinematic) is an advanced geodetic GPS method that resolves carrier phase measurements to deliver centimeter-level coordinates in real-time."
  },
  {
    id: 164,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "What type of database structure organizes tables into relations linked by shared identifier columns?",
    options: ["Hierarchical Database Management System (DBMS)", "Relational Database Management System (RDBMS)", "Object-oriented DBMS", "NoSQL DBMS"],
    answer: 1,
    explanation: "An RDBMS models data in tables (relations) with columns (attributes) and rows (tuples), linking them together using shared keys."
  },
  {
    id: 165,
    domain: "data-management",
    domainLabel: "Data Management",
    text: "In database design, the process of structuring fields and tables to minimize redundancy and dependency is called:",
    options: ["Spatial indexing", "Normalization", "Reclassification", "Topology validation"],
    answer: 1,
    explanation: "Normalization is the systematic design process of organizing data tables in relational databases to reduce redundant fields and prevent modification errors."
  },

  // ── GIS DESIGN & IMPLEMENTATION (166-185) ─────────────────────────────────────
  {
    id: 166,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which type of GIS service allows users to view, pan, and zoom maps on a web client, but does not allow downloading or editing feature geometries?",
    options: ["WFS (Web Feature Service)", "WMS (Web Map Service)", "WCS (Web Coverage Service)", "WPS (Web Processing Service)"],
    answer: 1,
    explanation: "WMS delivers pre-rendered map images (JPEG, PNG) representing GIS layers, allowing display without exposing raw vector geometries."
  },
  {
    id: 167,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "In an enterprise GIS database, what does a SDE (Spatial Database Engine) schema bridge?",
    options: ["Desktop GIS applications and raw raster files", "Relational databases (RDBMS) and GIS software, enabling spatial data types to be managed directly inside SQL databases", "GPS devices and field map files", "Web servers and cloud storage buckets"],
    answer: 1,
    explanation: "SDE schemas manage spatial datatypes, coordinates, and versioned tables within relational databases (like SQL Server or Oracle), translating desktop GIS queries to database operations."
  },
  {
    id: 168,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which phase of the GIS System Development Life Cycle (SDLC) defines user workflows, required datasets, and hardware specifications?",
    options: ["Feasibility study", "System requirements analysis and design", "Implementation and deployment", "Maintenance and support"],
    answer: 1,
    explanation: "The system requirements and design phase translates organizational needs into explicit hardware, software, dataset, and architectural specifications."
  },
  {
    id: 169,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "In database versioning, what is the 'Reconcile' process?",
    options: ["Merging multiple databases together", "Comparing edit changes in a child version against the parent version to identify conflicts before merging", "Backing up edit files", "Recalculating spatial indices"],
    answer: 1,
    explanation: "Reconciling compares edits in a child branch with changes made in the parent branch. If conflicts exist (e.g. edits to the same feature), they are flagged for review."
  },
  {
    id: 170,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which web service standard delivers geospatial raster data (such as DEMs or satellite imagery) as raw grid cell values?",
    options: ["WMS", "WFS", "WCS (Web Coverage Service)", "WPS"],
    answer: 2,
    explanation: "WCS delivers raw raster cell values (coverage data) rather than visual pictures, allowing clients to run spatial analysis models on the retrieved data."
  },
  {
    id: 171,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What does the term 'interoperability' mean in GIS system design?",
    options: ["The processor speed of the server", "The ability of diverse GIS software and databases to share data, services, and file formats using open standards", "The coordinate accuracy of boundaries", "Enforcing strict access permissions"],
    answer: 1,
    explanation: "Interoperability is the capacity of different GIS packages and databases to exchange information seamlessly, supported by standard protocols like those from the OGC."
  },
  {
    id: 172,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What type of topology rule prevents cadastre parcels from leaving open spaces between shared boundaries?",
    options: ["Must not overlap", "Must not have gaps", "Must be inside", "Must connect at endpoints"],
    answer: 1,
    explanation: "A 'Must not have gaps' rule validates that adjacent polygons share boundaries exactly, preventing sliver polygons or vacant spaces from creating mapping errors."
  },
  {
    id: 173,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "In database design, what is a relational join?",
    options: ["Combining geometries of two layers based on location", "Linking two attribute tables together based on a common key column, extending attribute columns temporarily", "Merging two files into a single folder", "Connecting vertices in a line feature"],
    answer: 1,
    explanation: "A join links columns from one table to another based on matching key values, allowing queries across related tables."
  },
  {
    id: 174,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which database component restricts attribute entries to a fixed dropdown list or specific numeric range?",
    options: ["Spatial index", "Attribute domain", "Primary key constraint", "Metadata lineage"],
    answer: 1,
    explanation: "Domains enforce data integrity at the database level by restricting entries in a field to a predefined list (Coded Value Domain) or range (Range Domain)."
  },
  {
    id: 175,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What is the primary role of a metadata clearinghouse or catalog service in Spatial Data Infrastructures (SDI)?",
    options: ["To store all physical shapefiles on a single server", "To provide a searchable portal where users can search, find, and link to datasets published by different organizations", "To reproject vector files automatically", "To encrypt database schemas"],
    answer: 1,
    explanation: "Metadata catalogs (using CSW standard) enable distributed publishers to register data records in a central index, helping users discover geospatial resources."
  },
  {
    id: 176,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which system design pattern distributes GIS processing, rendering, and logic across client browsers using JavaScript APIs (e.g., Leaflet or Mapbox GL)?",
    options: ["Server-side rendering (Thin Client)", "Client-side rendering (Fat Client)", "Mainframe terminal architecture", "Stand-alone Desktop architecture"],
    answer: 1,
    explanation: "Client-side rendering downloads vector tiles or GeoJSON datasets to the client device, using local browser GPU/CPU power to style, render, and filter layers."
  },
  {
    id: 177,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which OGC standard defines processes for executing spatial analysis operations (like buffer or overlay) on a remote web server?",
    options: ["WFS", "WCS", "WPS (Web Processing Service)", "WMTS"],
    answer: 2,
    explanation: "WPS defines standard web interfaces for executing geoprocessing algorithms on remote servers, letting clients request analytical operations and receive results."
  },
  {
    id: 178,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What is the purpose of a 'logical data model' in the GIS database design phase?",
    options: ["To list the server folder directory paths", "To define the structured tables, fields, types, and primary-foreign key relationships, independently of specific database software", "To establish database backup schedules", "To define layer symbology"],
    answer: 1,
    explanation: "The logical model models the logical entities and relations in detail, representing table structures and rules before physical implementation on a specific software platform."
  },
  {
    id: 179,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "In database versioning, what is the 'Post' process?",
    options: ["Deleting edits from child branches", "Merging reconciled changes from a child edit session into the target parent version", "Running topology validation", "Exporting database logs"],
    answer: 1,
    explanation: "Posting is the final transaction in versioned databases, applying reconciled changes from the editor's branch into the master database version (usually 'Default')."
  },
  {
    id: 180,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "When building a web map that needs to load massive base datasets (like satellite maps) instantly, which technique is most effective?",
    options: ["Querying WFS vector geometries on every zoom change", "Web Map Tile Service (WMTS) delivering pre-rendered, cached image tiles matching a standard grid hierarchy", "Sending zipped Shapefiles over email", "Loading raw elevation rasters directly"],
    answer: 1,
    explanation: "WMTS (Web Map Tile Service) serves pre-generated cache tiles, eliminating server-side rendering delays and accelerating client load times."
  },
  {
    id: 181,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "In geodatabase designs, which relationship class type automatically moves or deletes related rows in a child table when a feature in the parent table is moved or deleted?",
    options: ["Simple relationship class", "Composite relationship class", "Foreign key constraint join", "One-to-many link"],
    answer: 1,
    explanation: "Composite relationship classes model parent-child structures (like a building parent and room children), enforcing cascade deletes and synchronized moves."
  },
  {
    id: 182,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which open standard is used to exchange styling and symbology specifications for map layers, widely supported by GeoServer and QGIS?",
    options: ["KML", "SLD (Styled Layer Descriptor)", "CSS", "JSON-LD"],
    answer: 1,
    explanation: "SLD (Styled Layer Descriptor) is an XML-based formatting standard used to define the visual styling of maps rendered by WMS servers."
  },
  {
    id: 183,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What does the 'geometry type restriction' enforce in GIS database layers?",
    options: ["A layer can only contain either points, lines, or polygons, but not a mixture in the same feature class", "Files must not exceed 2 GB", "Attribute field names must be unique", "Coordinate units must be meters"],
    answer: 0,
    explanation: "Standard enterprise GIS database design enforces strict geometry restrictions per layer, so a single feature class holds only one geometric type (e.g. all points or all polygons)."
  },
  {
    id: 184,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "Which model maps the geospatial coordination framework between municipal, state, and federal agencies in the US?",
    options: ["NSDI (National Spatial Data Infrastructure)", "SDI-Europe", "OGC Web Services schema", "USGS Survey model"],
    answer: 0,
    explanation: "The NSDI coordinates geospatial data sharing, standards, and metadata access across multiple administrative levels in the United States."
  },
  {
    id: 185,
    domain: "gis-design",
    domainLabel: "GIS Design",
    text: "What is the primary benefit of versioned editing in enterprise geodatabases?",
    options: ["It compresses data file sizes", "It allows multiple editors to work concurrently on the database in their own isolated workspaces without locks blocking edits", "It automates map formatting", "It prevents databases from growing beyond 10GB"],
    answer: 1,
    explanation: "Versioning allows database editors to work concurrently on their own branches (versions) of the geodatabase, resolving conflict changes upon merging."
  },

  // ── PROGRAMMING & AUTOMATION (186-195) ────────────────────────────────────────
  {
    id: 186,
    domain: "programming",
    domainLabel: "Programming",
    text: "In Python programming with ArcPy, which object allows you to read and write attribute data inside a geodatabase table iteratively?",
    options: ["arcpy.Describe()", "arcpy.da.SearchCursor or InsertCursor / UpdateCursor", "arcpy.ListFields()", "arcpy.SpatialReference()"],
    answer: 1,
    explanation: "The data access (arcpy.da) cursors provide high-performance iteration over records, supporting read operations (SearchCursor) and edit operations (UpdateCursor / InsertCursor)."
  },
  {
    id: 187,
    domain: "programming",
    domainLabel: "Programming",
    text: "Which standard Python library is used to perform mathematical operations on multi-dimensional arrays, widely integrated with raster processing tools like Rasterio?",
    options: ["NumPy", "Pandas", "Shapely", "Fiona"],
    answer: 0,
    explanation: "NumPy is the core scientific computing library in Python, modeling raster matrices as high-performance arrays for grid computations."
  },
  {
    id: 188,
    domain: "programming",
    domainLabel: "Programming",
    text: "Which GDAL command-line tool is used to warp or reproject a raster dataset to a new coordinate system?",
    options: ["gdalinfo", "gdal_translate", "gdalwarp", "gdal_merge"],
    answer: 2,
    explanation: "gdalwarp is the raster image warping and reprojection tool, supporting datum transformations, resampling methods, and cropping."
  },
  {
    id: 189,
    domain: "programming",
    domainLabel: "Programming",
    text: "In Javascript web mapping, which library is an open-source, mobile-friendly interactive mapping tool that is lightweight and widely preferred over heavy web mapping applications?",
    options: ["Leaflet", "OpenLayers", "Mapbox GL JS", "CesiumJS"],
    answer: 0,
    explanation: "Leaflet is a highly popular, lightweight JavaScript library for displaying tiled maps and vector layers on mobile-friendly websites."
  },
  {
    id: 190,
    domain: "programming",
    domainLabel: "Programming",
    text: "In PostGIS, which SQL command returns the geometric intersection (common area) between two geometries?",
    options: ["ST_Contains(a, b)", "ST_Intersection(a, b)", "ST_Union(a, b)", "ST_Overlap(a, b)"],
    answer: 1,
    explanation: "ST_Intersection(geomA, geomB) returns a geometry representing the point, line, or polygon regions that overlap in both geometries."
  },
  {
    id: 191,
    domain: "programming",
    domainLabel: "Programming",
    text: "Which Python package reads and writes vector GIS file formats by providing bindings to the OGR library?",
    options: ["Shapely", "Fiona", "Rasterio", "PyProj"],
    answer: 1,
    explanation: "Fiona reads and writes geographic vector files (Shapefiles, GeoJSON, etc.) using OGR under the hood, outputting data as standard Python dictionaries."
  },
  {
    id: 192,
    domain: "programming",
    domainLabel: "Programming",
    text: "What does the Shapely library in Python provide?",
    options: ["File reading and writing drivers", "Manipulation and analysis of planar geometric objects, including area, bounds, buffer, and intersection calculations", "Coordinate transformations using PROJ", "Raster pixel math arrays"],
    answer: 1,
    explanation: "Shapely is dedicated to planar geometry manipulations and spatial operations, operating independently of file system reading or writing formats."
  },
  {
    id: 193,
    domain: "programming",
    domainLabel: "Programming",
    text: "In web mapping, what does a CORS (Cross-Origin Resource Sharing) error indicate?",
    options: ["The browser has a database connection issue", "The web server blocks requests coming from a different domain or port than the server domain, requiring specific headers to resolve", "The map projection is incorrect", "The file format is unsupported"],
    answer: 1,
    explanation: "CORS is a browser security mechanism that blocks scripts on one web page from requesting resources from another domain unless the server explicitly sends headers permitting origin access."
  },
  {
    id: 194,
    domain: "programming",
    domainLabel: "Programming",
    text: "Which standard data format represents attributes and geometries inside a single, standard JSON file?",
    options: ["Shapefile XML", "GeoJSON", "GeoPackage", "KML schema"],
    answer: 1,
    explanation: "GeoJSON translates vector geometry (Point, LineString, Polygon, MultiPoint, etc.) and attribute properties into a single, clean JSON structure."
  },
  {
    id: 195,
    domain: "programming",
    domainLabel: "Programming",
    text: "In SQL databases, which spatial database extension provides geographic object support for PostgreSQL?",
    options: ["SpatiaLite", "PostGIS", "MySQL Spatial", "Oracle Spatial"],
    answer: 1,
    explanation: "PostGIS extends the PostgreSQL database engine, adding spatial object support, spatial indexing, and spatial SQL analysis functions."
  },

  // ── GIS ETHICS, LAW & PROFESSIONALISM (196-200) ────────────────────────────────
  {
    id: 196,
    domain: "ethics",
    domainLabel: "Ethics & Law",
    text: "According to the GISCI Code of Ethics, if a GIS professional discovers that a client's project may cause significant environmental harm or violate safety codes, the professional should:",
    options: ["Complete the project anyway to honor contract agreements", "Advise the client, and if necessary, report the concern to authorities or refuse to complete the task if violations continue", "Charge additional fees for safety adjustments", "Keep the information confidential without action"],
    answer: 1,
    explanation: "The Code of Ethics states that a GIS professional's primary obligation is to the public health, safety, and welfare, requiring action if significant harm is discovered."
  },
  {
    id: 197,
    domain: "ethics",
    domainLabel: "Ethics & Law",
    text: "In GIS data licensing, what does 'Creative Commons BY' (CC-BY) require of users?",
    options: ["Users can only use the data for non-commercial projects", "Users must provide attribution to the original author when redistributing or using the data", "Users cannot modify the geometries", "Users must pay licensing fees"],
    answer: 1,
    explanation: "The CC-BY license permits sharing, reuse, and modification of data for any purpose, commercial or non-commercial, provided appropriate credit (attribution) is given."
  },
  {
    id: 198,
    domain: "ethics",
    domainLabel: "Ethics & Law",
    text: "Which concept protects individual identities when publishing detailed point maps (e.g., medical cases) by aggregating them into density grids or shifting point coordinates?",
    options: ["Spatial anonymization or geographic masking", "Topology verification", "Datum transformation", "Raster reclassification"],
    answer: 0,
    explanation: "Geographic masking (or spatial anonymization) shifts point locations or aggregates them to prevent re-identification of individuals on public maps, protecting privacy."
  },
  {
    id: 199,
    domain: "ethics",
    domainLabel: "Ethics & Law",
    text: "Under the GISCI Rules of Conduct, which of the following is considered an infraction?",
    options: ["Using open-source software instead of commercial software", "Plagiarizing another professional's maps, scripts, or data without attribution", "Reprojecting coordinates to a local system", "Publishing metadata files publicly"],
    answer: 1,
    explanation: "Rules of Conduct prohibit plagiarism and misrepresentation of work, requiring GIS professionals to give honest credit to original authors."
  },
  {
    id: 200,
    domain: "ethics",
    domainLabel: "Ethics & Law",
    text: "What does the Freedom of Information Act (FOIA) generally mandate for GIS data held by public government entities in the US?",
    options: ["The data must be deleted after 5 years", "The public has the right to request and access records, including geospatial data, unless it falls under specific exemptions (e.g., national security or privacy)", "Government data must be sold for market rates", "Only licensed GISPs can request access"],
    answer: 1,
    explanation: "FOIA mandates that public records must be accessible to citizens upon request, except in cases where exemptions like individual privacy, security, or proprietary data apply."
  }
];

const merged = [...QUESTIONS, ...newQuestions];

const fileContent = `export const QUESTIONS = ${JSON.stringify(merged, null, 2)};
`;

fs.writeFileSync(path.resolve('./src/pages/gispQuestions.js'), fileContent);
console.log('Successfully written 200 questions to gispQuestions.js');
