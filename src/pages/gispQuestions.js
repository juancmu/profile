export const QUESTIONS = [
  {
    "id": 1,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map projection is most appropriate for preserving area relationships when mapping large continental regions?",
    "options": [
      "Mercator projection",
      "Albers Equal-Area Conic projection",
      "Robinson projection",
      "Stereographic projection"
    ],
    "answer": 1,
    "explanation": "The Albers Equal-Area Conic projection preserves area across the map. It is widely used for mapping continents and countries where accurate area comparison is critical, such as the standard USGS projection for the contiguous United States.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Equal_Earth_projection_SW.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 2,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "A choropleth map is best used when the data being visualized is:",
    "options": [
      "Precise point locations with exact coordinates",
      "Aggregated, normalized data for enumeration units (e.g., per capita)",
      "Continuous surface data such as temperature",
      "Linear features such as roads or rivers"
    ],
    "answer": 1,
    "explanation": "Choropleth maps represent statistical data aggregated by geographic areas. Normalization (e.g., per capita, per square km) is essential to avoid misleading representations caused by area size differences.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q2"
  },
  {
    "id": 3,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What is the primary purpose of a map scale bar versus a representative fraction (RF)?",
    "options": [
      "Scale bars show true north; RF shows magnetic declination",
      "A scale bar remains accurate when the map is resized; RF becomes incorrect",
      "RF is used for large-scale maps; scale bars only for small-scale maps",
      "Scale bars apply only to projected maps"
    ],
    "answer": 1,
    "explanation": "A graphic scale bar resizes proportionally with the map, so it remains accurate even when the map is printed at different sizes. A representative fraction (e.g., 1:24,000) becomes incorrect if the map is reproduced at a different scale.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/World_Map_1689.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 4,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "When mapping point data where symbol size represents a quantitative variable, what symbol scaling method is perceptually most accurate?",
    "options": [
      "Linear scaling (radius proportional to value)",
      "Logarithmic scaling for all datasets",
      "Area scaling (area proportional to value \u2014 Flannery correction)",
      "Absolute scaling using fixed sizes"
    ],
    "answer": 2,
    "explanation": "When circles represent quantities, the symbol area (not radius) should be proportional to the data value. Flannery proposed a perceptual correction because humans systematically underestimate the size of larger circles.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Claudius_Ptolemy-_The_World.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 5,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "In cartographic design, what is the purpose of visual hierarchy?",
    "options": [
      "To ensure all map elements are displayed at the same visual prominence",
      "To organize map elements so the most important information draws the reader's attention first",
      "To rank coordinate reference systems by accuracy",
      "To define the order of layers in a GIS table of contents"
    ],
    "answer": 1,
    "explanation": "Visual hierarchy guides the map reader's eye by making the most important elements visually dominant through size, contrast, and placement, while supporting elements are visually subordinate.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q5"
  },
  {
    "id": 6,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which classification method divides data into classes with equal statistical spread (standard deviation units)?",
    "options": [
      "Natural breaks (Jenks)",
      "Quantile classification",
      "Standard deviation classification",
      "Equal interval classification"
    ],
    "answer": 2,
    "explanation": "Standard deviation classification places class breaks at intervals of one standard deviation from the mean, making it ideal for showing how values deviate from average \u2014 useful for normally distributed data.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q6"
  },
  {
    "id": 7,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Bivariate choropleth maps display:",
    "options": [
      "A single variable using two color ramps simultaneously",
      "Two variables simultaneously using a combined color matrix",
      "Population data only, using two contrast colors",
      "Historical and current data on the same map"
    ],
    "answer": 1,
    "explanation": "Bivariate choropleth maps encode two different variables at once by combining two color ramps into a matrix, allowing spatial correlation between the variables to be visually identified.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q7"
  },
  {
    "id": 8,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which type of map is most appropriate for displaying the flow of people or goods between locations?",
    "options": [
      "Isoline map",
      "Dot density map",
      "Flow (desire line) map",
      "Cartogram"
    ],
    "answer": 2,
    "explanation": "Flow maps (desire line maps) use lines of varying width or direction to show movement between origin and destination points, making them ideal for migration, trade, or commuter flow data.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q8"
  },
  {
    "id": 9,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "A dasymetric map differs from a choropleth map primarily because:",
    "options": [
      "Dasymetric maps use 3D extrusion while choropleth maps are flat",
      "Dasymetric maps redistribute data within enumeration units based on ancillary information about where phenomena actually occur",
      "Choropleth maps require point data while dasymetric maps require polygon data",
      "Dasymetric maps only display categorical data"
    ],
    "answer": 1,
    "explanation": "Dasymetric mapping uses ancillary data (e.g., land use, building footprints) to redistribute values within census units more realistically, rather than assuming uniform distribution across the whole polygon.",
    "image": "https://camo.githubusercontent.com/0406a5340047ae7d100324bc35eaddad77cc6d24285e96b8a31606701b4eafb5/68747470733a2f2f7777772e6570612e676f762f73697465732f64656661756c742f66696c65732f323031352d30372f646173796d65747269635f373238783231302e6a7067"
  },
  {
    "id": 10,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Natural breaks (Jenks) classification is designed to:",
    "options": [
      "Create classes of exactly equal width across the data range",
      "Ensure an equal number of observations in each class",
      "Minimize within-class variance and maximize between-class variance",
      "Apply standard deviation intervals to normally distributed data"
    ],
    "answer": 2,
    "explanation": "Natural breaks (Jenks) identifies class boundaries at points of greatest difference in the data distribution, minimizing the variance within classes and maximizing the variance between classes.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q10"
  },
  {
    "id": 11,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "On a map at 1:50,000 scale, a distance of 5 cm represents what ground distance?",
    "options": [
      "500 m",
      "2.5 km",
      "5 km",
      "250 m"
    ],
    "answer": 1,
    "explanation": "At 1:50,000, every 1 cm on the map equals 50,000 cm (500 m) on the ground. Therefore 5 cm = 5 \u00d7 500 m = 2,500 m = 2.5 km.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q11"
  },
  {
    "id": 12,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map element indicates the angular difference between true north and magnetic north?",
    "options": [
      "Graticule",
      "Declination diagram",
      "Legend",
      "Neat line"
    ],
    "answer": 1,
    "explanation": "A declination diagram (also called magnetic declination indicator) shows the relationship between true (geographic) north, magnetic north, and sometimes grid north \u2014 essential for accurate compass navigation.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q12"
  },
  {
    "id": 13,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Isohyets are isolines that connect points of equal:",
    "options": [
      "Elevation",
      "Barometric pressure",
      "Rainfall amount",
      "Temperature"
    ],
    "answer": 2,
    "explanation": "Isohyets connect points receiving equal amounts of precipitation. Contours connect equal elevation; isobars connect equal pressure; isotherms connect equal temperature.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q13"
  },
  {
    "id": 14,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "When designing a map for colorblind users, which color pair should generally be avoided?",
    "options": [
      "Blue and orange",
      "Red and green",
      "Purple and yellow",
      "Teal and brown"
    ],
    "answer": 1,
    "explanation": "Red-green color combinations are problematic for the most common form of color vision deficiency (deuteranopia/protanopia). Blue-orange or purple-yellow combinations are typically safer alternatives.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q14"
  },
  {
    "id": 15,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "The Robinson projection is best described as:",
    "options": [
      "An equal-area projection used for thematic world maps",
      "A conformal projection preserving local shapes",
      "A compromise projection that minimizes overall distortion without preserving any single property exactly",
      "A cylindrical equidistant projection"
    ],
    "answer": 2,
    "explanation": "The Robinson projection is a compromise projection that does not preserve area, shape, or distance exactly but minimizes overall visual distortion. It was widely used by National Geographic for world maps.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q15"
  },
  {
    "id": 16,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which of the following is a cartographic generalization operation?",
    "options": [
      "Spatial join",
      "Topology validation",
      "Simplification of polygon boundaries",
      "Reclassification of raster values"
    ],
    "answer": 2,
    "explanation": "Cartographic generalization operations include simplification (reducing vertex complexity), aggregation, typification, and displacement \u2014 used to adapt geographic data for display at smaller scales.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q16"
  },
  {
    "id": 17,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "A map that uses dot symbols where each dot represents a fixed quantity of a phenomenon is called a:",
    "options": [
      "Proportional symbol map",
      "Dot density map",
      "Choropleth map",
      "Isopleth map"
    ],
    "answer": 1,
    "explanation": "Dot density maps place dots within enumeration units, with each dot representing a fixed quantity (e.g., 1 dot = 1,000 people). The density of dots gives a visual impression of geographic concentration.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q17"
  },
  {
    "id": 18,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "In web mapping, tile pyramids store pre-rendered map images at different zoom levels. What is the standard tile size?",
    "options": [
      "128\u00d7128 pixels",
      "256\u00d7256 pixels",
      "512\u00d7512 pixels",
      "1024\u00d71024 pixels"
    ],
    "answer": 1,
    "explanation": "The web mapping tile standard (used by OpenStreetMap, Google Maps, Mapbox, etc.) uses 256\u00d7256 pixel tiles. Some modern implementations use 512\u00d7512 tiles for higher-resolution displays.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q18"
  },
  {
    "id": 19,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map type is most appropriate for showing relative density of phenomena (e.g., population) without administrative boundaries?",
    "options": [
      "Choropleth",
      "Heatmap (kernel density)",
      "Proportional symbol",
      "Dot density"
    ],
    "answer": 1,
    "explanation": "Heatmaps generated by kernel density estimation show smooth continuous density surfaces without being constrained by administrative boundaries, making them ideal for showing geographic concentration patterns.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q19"
  },
  {
    "id": 20,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "The Mercator projection greatly exaggerates the size of landmasses near the poles because it:",
    "options": [
      "Uses a conic projection surface that spreads meridians",
      "Preserves angles (conformal), causing area to increase away from the equator",
      "Is an azimuthal projection centered on the North Pole",
      "Compresses the tropics to fit the map on a standard page"
    ],
    "answer": 1,
    "explanation": "Mercator is a conformal (angle-preserving) cylindrical projection. To preserve local angles, both horizontal and vertical scales must expand equally with latitude, causing area distortion that grows dramatically near the poles.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q20"
  },
  {
    "id": 21,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "A GIS analyst needs to identify all parcels within 500 meters of a river centerline that are also classified as agricultural land. Which sequence of operations is most efficient?",
    "options": [
      "Clip the river layer, then perform a spatial join",
      "Buffer the river by 500m, then intersect with agricultural parcels",
      "Select by attribute for agricultural land, then calculate distance",
      "Merge all layers, then apply a definition query"
    ],
    "answer": 1,
    "explanation": "Buffering the river creates a polygon representing the 500m zone, and intersecting with the agricultural parcels layer efficiently identifies all parcels meeting both criteria.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q21"
  },
  {
    "id": 22,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Moran's I is a statistical measure used in GIS to assess:",
    "options": [
      "The accuracy of GPS coordinates compared to ground truth",
      "Spatial autocorrelation \u2014 whether similar values cluster in space",
      "The density of features per unit area",
      "Raster surface curvature and slope direction"
    ],
    "answer": 1,
    "explanation": "Moran's I is a measure of spatial autocorrelation. A value near +1 indicates clustering of similar values, near -1 indicates dispersion, and near 0 suggests random spatial distribution.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Snow-cholera-map.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 23,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Kriging differs from Inverse Distance Weighting (IDW) interpolation primarily because:",
    "options": [
      "Kriging only works with raster data while IDW works with vectors",
      "Kriging uses statistical models of spatial autocorrelation (semivariograms) and provides error estimates",
      "IDW is more computationally intensive",
      "Kriging assigns equal weight to all sample points"
    ],
    "answer": 1,
    "explanation": "Kriging is a geostatistical interpolation method using semivariograms to model spatial autocorrelation. Unlike IDW, it provides estimates of uncertainty (prediction variance).",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Snow-cholera-map.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 24,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In network analysis, what does 'impedance' refer to?",
    "options": [
      "The visual complexity of the network map",
      "The resistance or cost associated with traversing a network element",
      "The number of nodes in a transportation network",
      "The coordinate accuracy of network vertices"
    ],
    "answer": 1,
    "explanation": "Impedance in network analysis is the cost (time, distance, toll, etc.) of traversing a network edge. Route-finding algorithms minimize total impedance to identify optimal paths.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Allelic_Heterogeneity-Locus_Heterogeneity.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 25,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "A hydrologist uses a DEM to delineate a watershed. Which GIS operation is performed first?",
    "options": [
      "Aspect and hillshade calculation",
      "Flow direction followed by flow accumulation analysis",
      "Euclidean distance and cost-surface analysis",
      "Supervised classification of elevation bands"
    ],
    "answer": 1,
    "explanation": "Watershed delineation requires first calculating a flow direction raster (D8 algorithm) to determine how water flows across the surface, then using flow accumulation to identify cells draining through the pour point.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q25"
  },
  {
    "id": 26,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "The Modifiable Areal Unit Problem (MAUP) describes:",
    "options": [
      "Inaccuracies when converting between raster and vector formats",
      "The fact that statistical results change when the same data is aggregated into different areal units",
      "Errors in GPS measurements caused by atmospheric interference",
      "The inability of GIS software to handle very large datasets"
    ],
    "answer": 1,
    "explanation": "MAUP refers to how spatial statistical results can vary significantly depending on the arbitrary choice of areal units (scale effect) and how those units are drawn (zoning effect).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q26"
  },
  {
    "id": 27,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which of the following best describes a Thiessen (Voronoi) polygon?",
    "options": [
      "A polygon derived from raster pixel aggregation",
      "An area where every location is closer to its seed point than to any other seed point",
      "A polygon created by buffering a set of input points",
      "A convex hull enclosing all input points"
    ],
    "answer": 1,
    "explanation": "Thiessen polygons partition space such that every location within a polygon is closer to that polygon's seed point than to any other \u2014 widely used for service area assignment and rainfall estimation.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q27"
  },
  {
    "id": 28,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "When performing a site suitability analysis using weighted overlay, what is the primary purpose of reclassifying input rasters before combining them?",
    "options": [
      "To reduce file sizes for faster processing",
      "To convert all input layers to a common scale so they can be meaningfully combined",
      "To change the coordinate reference system of each layer",
      "To remove NoData cells from each input raster"
    ],
    "answer": 1,
    "explanation": "Reclassification converts each input raster to a common suitability scale (e.g., 1\u20139), making layers with different measurement units and value ranges comparable before combining.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q28"
  },
  {
    "id": 29,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Tobler's First Law of Geography states:",
    "options": [
      "All geographic phenomena follow a normal distribution",
      "Everything is related to everything else, but near things are more related than distant things",
      "The accuracy of spatial data degrades with increasing scale",
      "Geographic patterns always reflect underlying physical processes"
    ],
    "answer": 1,
    "explanation": "Tobler's First Law (1970) is the foundation of spatial autocorrelation and geostatistics: nearby places tend to be more similar than distant places, justifying distance-weighted analysis methods.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q29"
  },
  {
    "id": 30,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which spatial operation returns the geometry that exists in one input layer but NOT in a second input layer?",
    "options": [
      "Union",
      "Intersect",
      "Difference (Erase)",
      "Dissolve"
    ],
    "answer": 2,
    "explanation": "The Difference (or Erase) operation subtracts the geometry of one layer from another, returning only the portions of the first layer that do not overlap with the second layer.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q30"
  },
  {
    "id": 31,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Kernel Density Estimation (KDE) in GIS is used to:",
    "options": [
      "Classify raster pixels into discrete categories",
      "Create a smooth, continuous surface estimating the density of point events",
      "Calculate the shortest path between two points",
      "Determine flow direction across a terrain surface"
    ],
    "answer": 1,
    "explanation": "KDE places a kernel (smooth function) over each point event and sums the contributions to create a continuous density surface, useful for visualizing crime hotspots, wildlife sightings, or accident locations.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q31"
  },
  {
    "id": 32,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "The Local Indicators of Spatial Association (LISA) statistic identifies:",
    "options": [
      "The overall degree of spatial autocorrelation across the entire study area",
      "Specific locations that are statistically significant clusters or outliers",
      "The optimal bandwidth for kernel density estimation",
      "The appropriate number of classes for choropleth classification"
    ],
    "answer": 1,
    "explanation": "LISA statistics (e.g., Local Moran's I) decompose global autocorrelation into local contributions, identifying specific locations of high-high clusters, low-low clusters, and spatial outliers (high-low or low-high).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q32"
  },
  {
    "id": 33,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "A cost-surface analysis in GIS accounts for which factor that a simple Euclidean distance does not?",
    "options": [
      "The color of the background raster",
      "Variable resistance to movement based on surface characteristics (slope, land cover, etc.)",
      "The coordinate reference system of the input data",
      "The number of features in the input layer"
    ],
    "answer": 1,
    "explanation": "Cost-surface analysis uses a friction raster where cell values represent the cost of traversal. Unlike Euclidean distance (straight-line), it routes paths around obstacles and prefers low-cost routes through terrain.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q33"
  },
  {
    "id": 34,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Getis-Ord Gi* is used to identify:",
    "options": [
      "Overall spatial autocorrelation across a study region",
      "Statistically significant hot spots and cold spots based on concentration of high or low values",
      "The interpolated value at an unsampled location",
      "Edge effects in point pattern analysis"
    ],
    "answer": 1,
    "explanation": "Getis-Ord Gi* (hot spot analysis) identifies statistically significant spatial clusters of high values (hot spots) and low values (cold spots), accounting for the spatial arrangement of neighbors.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q34"
  },
  {
    "id": 35,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "The quadrat analysis method in point pattern analysis compares observed point distributions to:",
    "options": [
      "A kernel density surface",
      "A randomly generated Poisson distribution",
      "The convex hull of the study area",
      "The Delaunay triangulation of the point set"
    ],
    "answer": 1,
    "explanation": "Quadrat analysis overlays a grid on point data, counts points per cell, and uses a chi-square test to compare observed counts against what would be expected under a completely spatially random (Poisson) process.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q35"
  },
  {
    "id": 36,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which DEM-derived product shows the direction each cell faces (N, NE, E, SE, S, SW, W, NW)?",
    "options": [
      "Slope",
      "Aspect",
      "Hillshade",
      "Curvature"
    ],
    "answer": 1,
    "explanation": "Aspect is derived from a DEM and indicates the compass direction that the slope faces. It ranges from 0\u00b0 to 360\u00b0 and is critical for solar radiation modeling, vegetation analysis, and snow melt studies.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q36"
  },
  {
    "id": 37,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In raster analysis, which mathematical operation is used to calculate slope from a DEM?",
    "options": [
      "Zonal statistics",
      "Focal statistics using the rate of elevation change over distance",
      "Global statistics across all cells",
      "Map algebra using cell value subtraction"
    ],
    "answer": 1,
    "explanation": "Slope is calculated using focal statistics \u2014 specifically the maximum rate of elevation change from each cell to its neighbors. The standard algorithm (Horn) uses a 3\u00d73 moving window to compute the rise/run in all directions.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q37"
  },
  {
    "id": 38,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "The output of a Union overlay operation contains:",
    "options": [
      "Only features that appear in both input layers",
      "All features from both input layers, with attributes from both where they overlap",
      "Only features exclusive to the first input layer",
      "Only the boundary of the combined extent of both layers"
    ],
    "answer": 1,
    "explanation": "Union combines all features from both input layers. Overlapping areas receive attributes from both layers; non-overlapping areas retain their original attributes with null values for the absent layer's fields.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q38"
  },
  {
    "id": 39,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which index is commonly used to assess vegetation health using remote sensing imagery?",
    "options": [
      "NDWI (Normalized Difference Water Index)",
      "NDVI (Normalized Difference Vegetation Index)",
      "SAVI (Soil-Adjusted Vegetation Index) only",
      "EVI (Enhanced Vegetation Index) only"
    ],
    "answer": 1,
    "explanation": "NDVI = (NIR \u2212 Red) / (NIR + Red) is the most widely used spectral index for assessing vegetation density and health. Values range from -1 to +1, with high positive values indicating dense green vegetation.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q39"
  },
  {
    "id": 40,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In a viewshed analysis, what does the output raster represent?",
    "options": [
      "The slope of terrain visible from an observer point",
      "Areas that are visible from a specified observer location based on terrain elevation",
      "The distance from each cell to the nearest observer point",
      "The optimal path between an observer and a target location"
    ],
    "answer": 1,
    "explanation": "A viewshed analysis identifies which cells in a DEM can be 'seen' from an observer point, accounting for terrain blocking the line of sight. It is used in telecommunications tower siting, military planning, and scenic assessment.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q40"
  },
  {
    "id": 41,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Ripley's K function in spatial statistics is used to evaluate:",
    "options": [
      "The strength of correlation between two attribute variables",
      "Point pattern clustering or regularity across multiple spatial scales",
      "The accuracy of an interpolated surface at cross-validation points",
      "The optimal number of classes for a choropleth map"
    ],
    "answer": 1,
    "explanation": "Ripley's K function (and its transformation, the L function) analyzes point patterns across a range of distances, showing whether points are clustered, randomly distributed, or regularly spaced at different scales.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q41"
  },
  {
    "id": 42,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "A semivariogram in geostatistics plots:",
    "options": [
      "The cumulative frequency distribution of attribute values",
      "Semivariance (half the average squared difference between pairs of values) as a function of separation distance",
      "The correlation coefficient between two spatial variables",
      "The spatial distribution of interpolation errors"
    ],
    "answer": 1,
    "explanation": "A semivariogram shows how spatial autocorrelation decreases with distance. Key parameters include the nugget (y-intercept), range (distance at which data become uncorrelated), and sill (maximum variance).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q42"
  },
  {
    "id": 43,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which spatial relationship is tested when performing a 'Select by Location' in GIS with the rule 'Intersect'?",
    "options": [
      "Features whose centroids fall within the selection layer",
      "Features that share any geometry (point, line, or area) with the selection layer",
      "Features completely contained within the selection layer",
      "Features within a specified distance of the selection layer"
    ],
    "answer": 1,
    "explanation": "The Intersect spatial relationship selects features that share any part of their geometry with the selection layer \u2014 including touching at a boundary, overlapping partially, or being completely inside.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q43"
  },
  {
    "id": 44,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Terrain ruggedness index (TRI) is calculated using a DEM to measure:",
    "options": [
      "The average elevation of a region",
      "The mean absolute difference in elevation between a cell and its neighbors",
      "The direction water flows across a landscape",
      "The density of drainage channels per unit area"
    ],
    "answer": 1,
    "explanation": "TRI (Riley et al. 1999) measures the absolute difference in elevation between a focal cell and its neighbors, quantifying terrain heterogeneity. High values indicate rugged, dissected terrain; low values indicate flat terrain.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q44"
  },
  {
    "id": 45,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What does the 'dissolve' operation accomplish in vector GIS?",
    "options": [
      "Splits features at intersection boundaries",
      "Merges adjacent or overlapping features that share a common attribute value",
      "Clips features to the extent of a boundary layer",
      "Converts polygon features to point centroids"
    ],
    "answer": 1,
    "explanation": "Dissolve merges features that share the same value in a specified attribute field, removing internal boundaries between them. It is commonly used to aggregate census tracts into counties, or parcels into land use zones.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q45"
  },
  {
    "id": 46,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "When converting a raster DEM to vector contours, which factor most critically affects the accuracy of the output?",
    "options": [
      "The coordinate reference system of the DEM",
      "The color ramp applied to the raster",
      "The spatial resolution (cell size) of the raster",
      "The file format of the input raster"
    ],
    "answer": 2,
    "explanation": "The spatial resolution (cell size) of the DEM directly determines how precisely elevation transitions can be represented. A coarser resolution produces generalized, less accurate contours.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q46"
  },
  {
    "id": 47,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which datum transformation method is most appropriate when converting coordinates between NAD27 and NAD83?",
    "options": [
      "Simple geographic offset (\u0394X, \u0394Y)",
      "NADCON grid-based transformation",
      "Helmert 7-parameter transformation",
      "Web Mercator reprojection"
    ],
    "answer": 1,
    "explanation": "NADCON (North American Datum Conversion) is the standard NOAA-developed tool for transforming geographic coordinates between NAD 27 and NAD 83 in the United States, using grid shift files from thousands of geodetic control points.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q47"
  },
  {
    "id": 48,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "The ISO 19115 standard pertains to:",
    "options": [
      "Raster data compression algorithms",
      "Metadata standards for geographic information",
      "Topology rules for vector feature datasets",
      "Coordinate reference system definitions"
    ],
    "answer": 1,
    "explanation": "ISO 19115 defines the schema for describing geographic information and services, covering identification, extent, quality, lineage, and other characteristics \u2014 the international metadata standard for GIS.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q48"
  },
  {
    "id": 49,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the primary advantage of storing spatial data in a PostGIS-enabled PostgreSQL database compared to shapefiles?",
    "options": [
      "Shapefiles cannot store polygon geometries",
      "PostGIS supports multi-user concurrent access, SQL queries, and no field name length limits",
      "PostGIS files are smaller because of built-in compression",
      "PostGIS data can only be used with open-source GIS software"
    ],
    "answer": 1,
    "explanation": "PostGIS extends PostgreSQL with spatial data types and functions. Key advantages over shapefiles include multi-user concurrent access, no 2GB file size limit, no 10-character field name restriction, and transactional integrity.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q49"
  },
  {
    "id": 50,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "GPS receivers calculate position through trilateration. What is the minimum number of satellites required for a 3D position fix?",
    "options": [
      "2 satellites",
      "3 satellites",
      "4 satellites",
      "6 satellites"
    ],
    "answer": 2,
    "explanation": "Four satellites are required for a 3D position fix. Three satellites determine X, Y, Z position, and the fourth is needed to solve for receiver clock error \u2014 essential because GPS receivers use inexpensive clocks with significant drift.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q50"
  },
  {
    "id": 51,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the primary purpose of a spatial index in a GIS database?",
    "options": [
      "To ensure topological correctness of feature geometries",
      "To accelerate spatial query performance by pre-organizing features by location",
      "To compress raster data for faster disk storage",
      "To enforce attribute domain constraints on feature classes"
    ],
    "answer": 1,
    "explanation": "Spatial indexes (R-tree, quadtree, grid index) organize features spatially so that the database can quickly locate features in a given area without scanning every record \u2014 dramatically improving query performance on large datasets.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q51"
  },
  {
    "id": 52,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which GPS error source is caused by the satellite signal traveling through the ionosphere and being slowed or refracted?",
    "options": [
      "Multipath error",
      "Dilution of Precision (DOP)",
      "Ionospheric delay",
      "Selective Availability"
    ],
    "answer": 2,
    "explanation": "Ionospheric delay occurs when GPS signals travel through the charged particles in the ionosphere, slowing them and introducing distance errors up to 10m or more. Dual-frequency receivers can largely correct for this.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q52"
  },
  {
    "id": 53,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is Dilution of Precision (DOP) in GPS?",
    "options": [
      "The intentional degradation of GPS signals by the military",
      "A measure of how satellite geometry affects positional accuracy",
      "The time delay caused by the troposphere",
      "The error introduced by receiver clock drift"
    ],
    "answer": 1,
    "explanation": "DOP quantifies the effect of satellite geometry on position accuracy. A high DOP (poor geometry \u2014 satellites clustered together) amplifies range errors; a low DOP (good geometry \u2014 satellites spread out) minimizes their effect.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q53"
  },
  {
    "id": 54,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "In a file geodatabase, what is the maximum recommended file size before performance degrades significantly?",
    "options": [
      "256 MB",
      "1 GB",
      "1 TB",
      "2 GB"
    ],
    "answer": 2,
    "explanation": "File geodatabases can store datasets up to 1 TB in size (configurable). The default maximum size per table is 1 TB, which is a major advantage over shapefiles (2 GB per file component).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q54"
  },
  {
    "id": 55,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which of the following is NOT a valid vector data model component?",
    "options": [
      "Node",
      "Arc",
      "Cell",
      "Polygon"
    ],
    "answer": 2,
    "explanation": "Cells belong to the raster data model, not the vector data model. Vector data models use nodes (vertices at feature endpoints), arcs (lines connecting nodes), and polygons (enclosed areas formed by arcs).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q55"
  },
  {
    "id": 56,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Real Differential GPS (DGPS) corrections improve GPS accuracy by:",
    "options": [
      "Adding more satellites to the constellation",
      "Transmitting real-time corrections from a base station at a known location to a roving receiver",
      "Using dual-frequency receivers to cancel ionospheric delay",
      "Applying a post-processing algorithm to the raw satellite data"
    ],
    "answer": 1,
    "explanation": "DGPS uses a reference receiver at a precisely known location to calculate the difference between its known and GPS-measured positions, then broadcasts that correction to nearby roving receivers for real-time accuracy improvement.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q56"
  },
  {
    "id": 57,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "LiDAR point cloud data is typically stored in which file format?",
    "options": [
      ".shp (Shapefile)",
      "LAS or LAZ format",
      ".tif (GeoTIFF)",
      "GeoJSON"
    ],
    "answer": 1,
    "explanation": "LAS (ASPRS LASer) is the industry-standard binary format for storing airborne LiDAR point cloud data, containing X, Y, Z coordinates plus intensity, return number, classification, and other attributes. LAZ is its compressed variant.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q57"
  },
  {
    "id": 58,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "The Well-Known Text (WKT) representation POLYGON((0 0, 4 0, 4 4, 0 4, 0 0)) describes:",
    "options": [
      "A point at coordinate 0,0",
      "A polyline with 5 vertices",
      "A square polygon with vertices at the corners of a 4-unit square",
      "A multipolygon with four component polygons"
    ],
    "answer": 2,
    "explanation": "WKT POLYGON((0 0, 4 0, 4 4, 0 4, 0 0)) defines a single polygon with five coordinate pairs (the first and last are identical, closing the ring) forming a 4\u00d74 square.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q58"
  },
  {
    "id": 59,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What does the term 'positional accuracy' mean in the context of GIS data quality?",
    "options": [
      "The correctness of attribute values associated with features",
      "How closely the recorded coordinates of a feature match its actual location on the ground",
      "The completeness of the dataset relative to the target universe",
      "The logical consistency of topological relationships between features"
    ],
    "answer": 1,
    "explanation": "Positional accuracy (or spatial accuracy) describes how well the geographic coordinates of features in a dataset correspond to their true positions on the Earth's surface. It is one of five key dimensions of spatial data quality.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q59"
  },
  {
    "id": 60,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which standard format is used for publishing geospatial data as web services with RESTful API access?",
    "options": [
      "Shapefile over FTP",
      "OGC WFS with GML encoding",
      "OGC API \u2014 Features (formerly WFS 3.0)",
      "GeoPackage via HTTP"
    ],
    "answer": 2,
    "explanation": "OGC API \u2014 Features is the modern RESTful replacement for WFS, providing access to geospatial features via standard HTTP methods with JSON/GeoJSON encoding. It is designed for web developer accessibility.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q60"
  },
  {
    "id": 61,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the main purpose of data lineage (provenance) documentation in GIS?",
    "options": [
      "To specify the color scheme used for map output",
      "To record the history of data sources, processing steps, and transformations applied to a dataset",
      "To define topology rules for a geodatabase",
      "To document the hardware specifications of the GIS server"
    ],
    "answer": 1,
    "explanation": "Data lineage documents the origin of data, the processing steps applied, transformations performed, and quality checks conducted \u2014 enabling users to evaluate fitness for purpose and reproduce analytical results.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q61"
  },
  {
    "id": 62,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which EPSG code identifies the WGS 84 geographic coordinate system?",
    "options": [
      "EPSG:3857",
      "EPSG:4326",
      "EPSG:32610",
      "EPSG:26917"
    ],
    "answer": 1,
    "explanation": "EPSG:4326 is the WGS 84 geographic coordinate system (latitude/longitude in decimal degrees). EPSG:3857 is Web Mercator (WGS 84); EPSG:32610 is UTM Zone 10N (WGS 84); EPSG:26917 is UTM Zone 17N (NAD83).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q62"
  },
  {
    "id": 63,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which raster data compression method is lossless and commonly used for GeoTIFF files?",
    "options": [
      "JPEG",
      "LZW (Lempel-Ziv-Welch)",
      "MPEG",
      "Wavelet"
    ],
    "answer": 1,
    "explanation": "LZW is a lossless compression algorithm widely used for GeoTIFF and TIFF files. It reduces file size without any loss of data values, making it suitable for elevation data and thematic rasters where exact values must be preserved.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q63"
  },
  {
    "id": 64,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the purpose of a topology in a GIS geodatabase?",
    "options": [
      "To define the visual symbolization of features",
      "To enforce and validate spatial relationships and connectivity rules between features",
      "To specify the coordinate reference system for a feature class",
      "To compress feature geometry for storage efficiency"
    ],
    "answer": 1,
    "explanation": "Geodatabase topology defines and validates spatial rules such as 'polygons must not overlap,' 'lines must connect at endpoints,' and 'boundaries must be shared' \u2014 ensuring data integrity and enabling network tracing.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q64"
  },
  {
    "id": 65,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "The GeoPackage format (.gpkg) offers which primary advantage over the Shapefile format?",
    "options": [
      "It stores data in a plain text format for human readability",
      "It uses SQLite and can store multiple vector and raster datasets, styles, and metadata in a single file",
      "It is the only format supported by QGIS",
      "It allows field names longer than 64 characters only"
    ],
    "answer": 1,
    "explanation": "GeoPackage is an OGC standard based on SQLite that stores multiple vector layers, raster tiles, spatial indexes, and metadata in a single portable file, overcoming many shapefile limitations (field name length, file count, size).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q65"
  },
  {
    "id": 66,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In geodatabase design, a topology rule enforcing 'polygons must not overlap' is essential for which type of dataset?",
    "options": [
      "Transportation network with turn restrictions",
      "Land use or cadastral parcel dataset",
      "Digital elevation model (DEM) raster",
      "GPS tracking point dataset"
    ],
    "answer": 1,
    "explanation": "Cadastral (parcel) and land use datasets require non-overlapping polygons because each geographic location can only belong to one parcel or land use class. Topology rules enforce this spatial data integrity constraint.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q66"
  },
  {
    "id": 67,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which OGC standard defines a common interface for accessing and querying geospatial features over the web?",
    "options": [
      "WMS (Web Map Service)",
      "WFS (Web Feature Service)",
      "WMTS (Web Map Tile Service)",
      "WCS (Web Coverage Service)"
    ],
    "answer": 1,
    "explanation": "WFS provides an interface for requesting and manipulating geographic feature data (vector data). Unlike WMS which returns map images, WFS returns actual geometry and attribute data that can be queried, filtered, and edited.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q67"
  },
  {
    "id": 68,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In an enterprise GIS with multiple editors, which versioning strategy best supports concurrent editing while maintaining data integrity?",
    "options": [
      "File geodatabase with file locks",
      "Traditional versioning with check-out/check-in workflows",
      "Shapefile replication across workstations",
      "Exporting to CSV for editing"
    ],
    "answer": 1,
    "explanation": "Traditional (ArcSDE-style) versioning allows multiple users to work in named versions of the geodatabase simultaneously. Editors reconcile and post changes to the parent version, with conflict detection and resolution.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q68"
  },
  {
    "id": 69,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "A GIS project requires storing multiple geometry types (points, lines, polygons) for the same real-world feature class. Which design approach is best?",
    "options": [
      "Create separate feature classes for each geometry type and relate them via a common key",
      "Store all geometries in a single shapefile using mixed geometry type",
      "Use a raster dataset to represent all feature types",
      "Merge all features into a single point dataset"
    ],
    "answer": 0,
    "explanation": "Standard geodatabase design does not allow mixed geometry types in a single feature class. Best practice is to create separate feature classes related through a common attribute field, enabling queries across geometry types.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q69"
  },
  {
    "id": 70,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "A utility company needs real-time field data collection including GPS accuracy assessment and offline capability. Which technology is best?",
    "options": [
      "Static PDFs with handwritten field notes",
      "A mobile GIS application (e.g., ArcGIS Field Maps or QField) connected to a hosted feature service",
      "Desktop GIS on a workstation connected via VPN",
      "Google Maps with manual pin drops and CSV export"
    ],
    "answer": 1,
    "explanation": "Modern mobile GIS applications support offline data collection, GPS integration with PDOP/accuracy indicators, and synchronization to enterprise feature services \u2014 the industry standard for field data collection.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q70"
  },
  {
    "id": 71,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In a geodatabase, a 'domain' is used to:",
    "options": [
      "Define the spatial extent of a feature class",
      "Constrain attribute values to a predefined list or range to ensure data integrity",
      "Store topology rules between feature classes",
      "Specify the coordinate system for the entire geodatabase"
    ],
    "answer": 1,
    "explanation": "Attribute domains (coded value domains and range domains) constrain the valid values that can be entered in a field, ensuring data integrity and standardizing data entry across an enterprise GIS.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q71"
  },
  {
    "id": 72,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "A WMS (Web Map Service) returns data to clients as:",
    "options": [
      "Vector features in GeoJSON format",
      "Pre-rendered map images (PNG, JPEG, GIF)",
      "Raw point cloud data in LAS format",
      "Tabular attribute data in CSV format"
    ],
    "answer": 1,
    "explanation": "A WMS renders map images on the server and returns them as images (PNG, JPEG, GIF) to the client. The client cannot query or manipulate individual features \u2014 for that, WFS is needed.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q72"
  },
  {
    "id": 73,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which type of GIS relationship class allows a feature in one table to be related to many features in another?",
    "options": [
      "One-to-one relationship",
      "One-to-many relationship",
      "Simple join",
      "Spatial join only"
    ],
    "answer": 1,
    "explanation": "A one-to-many relationship class links a single record in the origin table (e.g., a fire hydrant) to multiple records in the destination table (e.g., inspection records). This is the most common relationship type in geodatabases.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q73"
  },
  {
    "id": 74,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In enterprise GIS architecture, what is the primary role of a geodatabase replica?",
    "options": [
      "To apply cartographic symbology to datasets",
      "To distribute and synchronize data between connected and disconnected environments",
      "To index features for faster spatial queries",
      "To convert raster data to vector format automatically"
    ],
    "answer": 1,
    "explanation": "Geodatabase replication allows a full or partial copy of a geodatabase to be distributed to another location (e.g., a field office or mobile device). Changes can be synchronized bidirectionally when connectivity is available.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q74"
  },
  {
    "id": 75,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which principle of GIS database normalization eliminates data redundancy by storing each piece of information only once?",
    "options": [
      "Spatial indexing",
      "Third Normal Form (3NF)",
      "Feature class topology",
      "Geometric network tracing"
    ],
    "answer": 1,
    "explanation": "Third Normal Form (3NF) eliminates transitive dependencies, ensuring each non-key attribute depends only on the primary key. This prevents data redundancy and update anomalies \u2014 a fundamental relational database design principle.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q75"
  },
  {
    "id": 76,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In GIS project design, what does a 'logical data model' define?",
    "options": [
      "The physical file formats and storage locations of each dataset",
      "The entities, attributes, and relationships in the GIS database, independent of any specific software implementation",
      "The cartographic symbolization rules for map output",
      "The network bandwidth requirements for web map services"
    ],
    "answer": 1,
    "explanation": "A logical data model defines the structure of the data \u2014 what entities exist, their attributes, and how they relate to each other \u2014 without specifying implementation details like file formats, database platforms, or storage.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q76"
  },
  {
    "id": 77,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What is the purpose of an OGC CSW (Catalog Service for the Web)?",
    "options": [
      "To render and serve tiled map images",
      "To provide a standardized interface for discovering, browsing, and querying geospatial metadata catalogs",
      "To stream real-time GPS data to web mapping applications",
      "To convert between different raster file formats"
    ],
    "answer": 1,
    "explanation": "OGC CSW allows clients to search and retrieve records from geospatial metadata catalogs using standardized queries. It is used by national spatial data infrastructures (e.g., data.gov, inspire.ec.europa.eu) to publish dataset discovery services.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Fig_4.4.svg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 78,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "When designing a GIS for a city's water distribution network, which data structure best supports network tracing (e.g., isolating a broken pipe segment)?",
    "options": [
      "Simple feature class with no topology",
      "Geometric network or utility network with connectivity rules",
      "Standalone polygon feature class",
      "Raster surface with flow direction"
    ],
    "answer": 1,
    "explanation": "Geometric or utility networks model connectivity between features (pipes, valves, hydrants) and enforce connectivity rules. Network tracing operations can then find upstream/downstream features, isolate segments, and trace flow paths.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Snow-cholera-map.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 79,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which metadata standard is mandated for federal GIS data in the United States?",
    "options": [
      "ISO 19115 only",
      "FGDC CSDGM (Content Standard for Digital Geospatial Metadata)",
      "Dublin Core metadata",
      "INSPIRE Directive metadata"
    ],
    "answer": 1,
    "explanation": "The Federal Geographic Data Committee (FGDC) Content Standard for Digital Geospatial Metadata (CSDGM) has been the required metadata standard for U.S. federal agency geospatial data. More recently, agencies have also been encouraged to adopt ISO 19115.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q79"
  },
  {
    "id": 80,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "The NSDI (National Spatial Data Infrastructure) in the United States is coordinated by which organization?",
    "options": [
      "USGS (U.S. Geological Survey)",
      "FGDC (Federal Geographic Data Committee)",
      "NOAA (National Oceanic and Atmospheric Administration)",
      "NGA (National Geospatial-Intelligence Agency)"
    ],
    "answer": 1,
    "explanation": "The FGDC coordinates the development of the NSDI, including standards, data sharing, metadata, and the Geospatial Platform. Executive Order 12906 (1994) established the framework for NSDI coordination through the FGDC.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q80"
  },
  {
    "id": 81,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In GIS system design, which architecture places all processing on the server with a thin client receiving only rendered results?",
    "options": [
      "Client-server architecture with fat client",
      "Server-side rendering (thin client) architecture",
      "Peer-to-peer distributed architecture",
      "Desktop-only standalone architecture"
    ],
    "answer": 1,
    "explanation": "Thin client (server-side rendering) architecture processes all GIS operations on the server and delivers only rendered images or minimal data to the client browser, reducing client hardware requirements and simplifying software distribution.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q81"
  },
  {
    "id": 82,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which OGC specification provides a standard for 3D city models including buildings, bridges, vegetation, and terrain?",
    "options": [
      "CityGML",
      "GML (Geography Markup Language)",
      "KML (Keyhole Markup Language)",
      "IndoorGML"
    ],
    "answer": 0,
    "explanation": "CityGML (City Geography Markup Language) is an OGC standard for representing 3D urban objects at multiple levels of detail (LOD 0\u20134). It supports semantic modeling of buildings, transportation, vegetation, water bodies, and terrain.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q82"
  },
  {
    "id": 83,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "A Spatial Data Infrastructure (SDI) framework includes which core components?",
    "options": [
      "Only GIS software and hardware",
      "Data, metadata, standards, policies, and people/organizations working together to share geospatial data",
      "Only online map services and APIs",
      "Database servers and network hardware only"
    ],
    "answer": 1,
    "explanation": "An SDI comprises five interrelated components: data (the geographic datasets), metadata (data documentation), standards (technical interoperability), policies (governance and access), and people/organizations (producers and users).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q83"
  },
  {
    "id": 84,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which approach is most appropriate for integrating real-time IoT sensor data (e.g., traffic sensors, weather stations) into a GIS?",
    "options": [
      "Manual data entry on a quarterly basis",
      "A streaming data pipeline using protocols such as MQTT or WebSockets feeding a real-time geodatabase or spatiotemporal data store",
      "Shapefile export and batch import monthly",
      "Printing sensor readings and digitizing into GIS"
    ],
    "answer": 1,
    "explanation": "Real-time IoT data integration requires streaming architectures using protocols like MQTT (Message Queuing Telemetry Transport) or WebSockets, feeding into spatiotemporal databases or feature layers that support time-aware visualization and analysis.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q84"
  },
  {
    "id": 85,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What does 'cartographic scale' vs 'analysis scale' mean in GIS project design?",
    "options": [
      "Cartographic scale refers to the map's representative fraction; analysis scale refers to the spatial resolution at which analysis is conducted and patterns are examined",
      "Both terms are synonymous in modern GIS practice",
      "Cartographic scale applies only to paper maps; analysis scale applies only to digital maps",
      "Analysis scale is always finer than cartographic scale"
    ],
    "answer": 0,
    "explanation": "Cartographic (map) scale (e.g., 1:25,000) governs what is visible on the map. Analysis scale refers to the resolution of the data and the spatial extent of patterns being examined \u2014 they may differ significantly in the same project.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q85"
  },
  {
    "id": 86,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In Python GIS development using Shapely, which method returns the area of overlap between two polygon geometries?",
    "options": [
      "polygon_a.union(polygon_b).area",
      "polygon_a.intersection(polygon_b).area",
      "polygon_a.difference(polygon_b).area",
      "polygon_a.symmetric_difference(polygon_b).area"
    ],
    "answer": 1,
    "explanation": "The intersection() method in Shapely returns the geometry that is common to both input geometries. Calling .area on the result gives the area of the overlapping region.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q86"
  },
  {
    "id": 87,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In GDAL/OGR command-line tools, which command converts a shapefile to GeoJSON format?",
    "options": [
      "gdal_translate input.shp output.geojson",
      "ogr2ogr -f GeoJSON output.geojson input.shp",
      "gdalwarp -of GeoJSON input.shp output.geojson",
      "ogrinfo -json input.shp > output.geojson"
    ],
    "answer": 1,
    "explanation": "ogr2ogr is the OGR vector data conversion utility. The -f flag specifies the output format driver. Output file is listed before input file.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q87"
  },
  {
    "id": 88,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In PostGIS, which function calculates the geodetic distance (in meters) between two geometry objects on the WGS 84 ellipsoid?",
    "options": [
      "ST_Distance(geom1, geom2)",
      "ST_DistanceSphere(geom1, geom2)",
      "ST_DistanceSpheroid(geom1, geom2, 'SPHEROID[\"WGS 84\",6378137,298.257]')",
      "ST_Length(ST_MakeLine(geom1, geom2))"
    ],
    "answer": 2,
    "explanation": "ST_DistanceSpheroid calculates the distance between two geometries along the surface of a specified spheroid (ellipsoid), providing the most accurate geodetic distance. ST_DistanceSphere uses a simpler spherical approximation.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q88"
  },
  {
    "id": 89,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which Python library is specifically designed for reading, writing, and analyzing vector geospatial data using a DataFrame interface?",
    "options": [
      "NumPy",
      "GeoPandas",
      "Rasterio",
      "Matplotlib"
    ],
    "answer": 1,
    "explanation": "GeoPandas extends the Pandas DataFrame with a geometry column, enabling spatial operations (overlay, buffer, spatial join, projection) with a familiar tabular interface. It is built on Shapely, Fiona, and PyProj.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q89"
  },
  {
    "id": 90,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "What does the Python library Rasterio primarily provide?",
    "options": [
      "Vector feature editing and topology checking",
      "Reading, writing, and processing geospatial raster data using GDAL under the hood",
      "Network routing and graph analysis",
      "3D point cloud processing"
    ],
    "answer": 1,
    "explanation": "Rasterio is a Python library built on GDAL that provides clean, Pythonic access to raster geospatial data. It reads and writes formats like GeoTIFF, supports windowed reading, and integrates with NumPy arrays.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q90"
  },
  {
    "id": 91,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In ArcPy (ArcGIS Python API), which function is used to run a geoprocessing tool programmatically?",
    "options": [
      "arcpy.da.SearchCursor()",
      "arcpy.Buffer_analysis()",
      "arcpy.mapping.MapDocument()",
      "arcpy.Describe()"
    ],
    "answer": 1,
    "explanation": "ArcPy geoprocessing tools follow the pattern arcpy.ToolName_toolboxAlias(). For example, arcpy.Buffer_analysis(input, output, distance) runs the Buffer tool from the Analysis toolbox. The suffix indicates the toolbox.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q91"
  },
  {
    "id": 92,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "What is a GIS model builder / workflow automation tool used for?",
    "options": [
      "Creating cartographic symbols for map output",
      "Visually constructing and automating sequences of geoprocessing operations as a reusable workflow",
      "Importing GPS data from field devices",
      "Managing user permissions in an enterprise geodatabase"
    ],
    "answer": 1,
    "explanation": "Model Builder (ESRI) and similar graphical workflow tools allow users to chain geoprocessing tools visually, creating reusable and documentable workflows. Models can be parameterized, shared, and automated via scheduling.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q92"
  },
  {
    "id": 93,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In Python, which library provides tools for reading and writing PROJ projection definitions and transforming coordinates between coordinate reference systems?",
    "options": [
      "Shapely",
      "Fiona",
      "PyProj",
      "GDAL only"
    ],
    "answer": 2,
    "explanation": "PyProj is a Python interface to the PROJ library, providing coordinate reference system definitions and the ability to transform coordinates between any two defined CRS \u2014 essential for reprojection in Python GIS workflows.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q93"
  },
  {
    "id": 94,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "What does REST stand for in the context of GIS web services?",
    "options": [
      "Raster Encoding and Spatial Transfer",
      "Representational State Transfer",
      "Remote Environmental Sensor Technology",
      "Real-time Elevation and Surface Topology"
    ],
    "answer": 1,
    "explanation": "REST (Representational State Transfer) is an architectural style for web services where resources are accessed via standard HTTP methods (GET, POST, PUT, DELETE) with stateless communication \u2014 the basis for most modern GIS web APIs.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q94"
  },
  {
    "id": 95,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which data exchange format is most commonly used for transmitting vector geospatial data in web mapping applications?",
    "options": [
      "Shapefile",
      "GeoJSON",
      "GeoPackage",
      "GML (Geography Markup Language)"
    ],
    "answer": 1,
    "explanation": "GeoJSON is the de facto standard for exchanging vector geospatial data on the web. It is human-readable, based on JSON, natively supported by web browsers and JavaScript libraries (Leaflet, Mapbox GL), and supported by most GIS platforms.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q95"
  },
  {
    "id": 96,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "GISP certification is administered by which organization?",
    "options": [
      "ESRI (Environmental Systems Research Institute)",
      "URISA (Urban and Regional Information Systems Association) through the GIS Certification Institute (GISCI)",
      "USGS (U.S. Geological Survey)",
      "AAG (American Association of Geographers)"
    ],
    "answer": 1,
    "explanation": "The GIS Certification Institute (GISCI) is a program of URISA and administers the GISP certification program, including application review, exam administration, and the maintenance of the GISP credential.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q96"
  },
  {
    "id": 97,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "Which U.S. legislation governs the public availability of federal government geospatial data and generally requires it to be freely available without restriction?",
    "options": [
      "HIPAA (Health Insurance Portability and Accountability Act)",
      "The OMB Circular A-16 and Open Data policy (OMB M-13-13)",
      "The Digital Millennium Copyright Act",
      "The Patriot Act"
    ],
    "answer": 1,
    "explanation": "OMB Circular A-16 coordinates federal geospatial data sharing, while the Open Data policy (M-13-13) requires federal agencies to publish government data as open, machine-readable, and freely available by default.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q97"
  },
  {
    "id": 98,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "A GIS professional is asked to map sensitive locations (e.g., domestic violence shelters) for an internal planning report. What is the primary ethical concern?",
    "options": [
      "The projection system used for the map",
      "The risk that publishing or sharing the map could compromise the safety of the shelter occupants",
      "The color scheme used in the visualization",
      "The file format chosen for data storage"
    ],
    "answer": 1,
    "explanation": "Mapping sensitive locations raises significant privacy and safety concerns. The GIS professional must consider who will access the data, how it will be secured, and whether geographic precision is necessary \u2014 applying the principle of 'do no harm.'",
    "image": "https://placehold.co/600x400?text=Visual+for+Q98"
  },
  {
    "id": 99,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "The concept of 'geographic privacy' in GIS ethics relates to:",
    "options": [
      "Encrypting GIS database files on the server",
      "The right of individuals to control the collection, use, and disclosure of location information about them",
      "Restricting access to topographic map data",
      "The accuracy of coordinate transformation methods"
    ],
    "answer": 1,
    "explanation": "Geographic privacy concerns grow as GPS, smartphones, and surveillance technologies enable precise tracking of individuals. GIS professionals must consider privacy implications when collecting, storing, analyzing, or publishing location data.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q99"
  },
  {
    "id": 100,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "According to the GISCI Code of Ethics, a GIS professional's primary obligation is to:",
    "options": [
      "Maximize the commercial value of GIS products",
      "Serve the public interest, uphold professional integrity, and advance the profession",
      "Promote a specific GIS software platform",
      "Generate revenue for their employing organization"
    ],
    "answer": 1,
    "explanation": "The GISCI Code of Ethics requires GIS professionals to prioritize the public interest, maintain honest and accurate work, respect confidentiality, advance knowledge and skills, and support the integrity of the profession.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q100"
  },
  {
    "id": 101,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map projection preserves local shapes and angles but distorts areas significantly near the poles?",
    "options": [
      "Lambert Equal-Area",
      "Mercator",
      "Gall-Peters",
      "Sinusoidal"
    ],
    "answer": 1,
    "explanation": "The Mercator projection is a conformal cylindrical projection. It preserves local angles and shapes (conformality) at the expense of severe area distortion at high latitudes.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q101"
  },
  {
    "id": 102,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What is the scale factor at the central meridian of any Universal Transverse Mercator (UTM) zone?",
    "options": [
      "1.0000",
      "0.9996",
      "0.9900",
      "1.0004"
    ],
    "answer": 1,
    "explanation": "To reduce overall distortion across the zone, a scale factor of 0.9996 is applied to the central meridian of each UTM zone.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q102"
  },
  {
    "id": 103,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which visual variable is best suited for representing nominal (categorical) data on a map?",
    "options": [
      "Value",
      "Size",
      "Color Hue",
      "Texture density"
    ],
    "answer": 2,
    "explanation": "Color Hue (different colors like red, blue, green) is the most effective visual variable for displaying categorical/nominal differences because it does not imply order or quantity.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q103"
  },
  {
    "id": 104,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "A cartogram is a map projection style where geographic size is scaled proportional to:",
    "options": [
      "Topological connectivity",
      "An attribute value (e.g., population or GDP)",
      "Geodetic distance from the center",
      "True ellipsoidal surface area"
    ],
    "answer": 1,
    "explanation": "In a cartogram, the thematic variable (such as population) replaces the land area or distance, distorting the map geometry to reflect the statistical value.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q104"
  },
  {
    "id": 105,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which classification method is most appropriate when you want to emphasize data extremes and outliers?",
    "options": [
      "Equal Interval",
      "Standard Deviation",
      "Quantile",
      "Natural Breaks (Jenks)"
    ],
    "answer": 1,
    "explanation": "Standard Deviation classification displays classes based on statistical variance from the mean, highlighting outliers that lie several standard deviations away.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q105"
  },
  {
    "id": 106,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What does a scale of 1:24,000 represent for a standard USGS quadrangle map?",
    "options": [
      "1 inch on the map equals 24,000 feet on the ground",
      "1 unit on the map equals 24,000 of the same units on the ground",
      "1 centimeter on the map equals 24 kilometers on the ground",
      "1 foot on the map equals 24,000 meters on the ground"
    ],
    "answer": 1,
    "explanation": "A representative fraction (RF) scale like 1:24,000 is unitless: 1 unit (inch, cm, etc.) on the map represents 24,000 of that same unit on the ground.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q106"
  },
  {
    "id": 107,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map projection is characterized by straight rhumb lines, making it highly valuable for marine navigation?",
    "options": [
      "Mercator",
      "Gnomonic",
      "Azimuthal Equidistant",
      "Albers Conic"
    ],
    "answer": 0,
    "explanation": "On a Mercator projection, any straight line represents a line of constant compass bearing (rhumb line), which makes it simple for navigators to plot courses.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q107"
  },
  {
    "id": 108,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which cartographic generalization process involves combining multiple distinct point symbols into a single polygon cluster at small scales?",
    "options": [
      "Simplification",
      "Aggregation",
      "Displacement",
      "Refinement"
    ],
    "answer": 1,
    "explanation": "Aggregation is the process of joining multiple close features into a single higher-order feature (such as multiple point buildings into a single urban area polygon).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q108"
  },
  {
    "id": 109,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "A diverging color ramp is most appropriate for visualizing which of the following datasets?",
    "options": [
      "Population density",
      "Mean temperature anomalies (deviation from long-term average)",
      "Soil classification types",
      "Total annual rainfall amounts"
    ],
    "answer": 1,
    "explanation": "Diverging color ramps use two contrasting hues that highlight deviations in positive and negative directions from a critical midpoint value (such as average temperature).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q109"
  },
  {
    "id": 110,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "In GIS map labeling, what does an 'annotation' class provide that dynamic labels do not?",
    "options": [
      "Automatic coordinate projection",
      "Individual control over the placement, size, and styling of each text element",
      "Smaller file sizes and database footprint",
      "Instant update based on attribute values"
    ],
    "answer": 1,
    "explanation": "Annotation layers store individual text features, allowing cartographers to manually position, style, and edit individual labels without depending on dynamic placement rules.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q110"
  },
  {
    "id": 111,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which coordinate grid lines on a map represent lines of constant latitude?",
    "options": [
      "Meridians",
      "Parallels",
      "Great Circles",
      "Rhumb Lines"
    ],
    "answer": 1,
    "explanation": "Parallels are horizontal grid lines representing constant latitude, running parallel to the Equator. Meridians represent constant longitude.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q111"
  },
  {
    "id": 112,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What type of map projection is formed by projecting the earth's surface onto a flat plane tangent at a single point?",
    "options": [
      "Cylindrical",
      "Conic",
      "Azimuthal",
      "Transverse"
    ],
    "answer": 2,
    "explanation": "Azimuthal (or planar) projections project geographic data onto a flat plane tangent or secant to the Earth's surface, preserving directions from the center point.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q112"
  },
  {
    "id": 113,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Why is normalizing data (e.g., dividing population by area) essential for choropleth maps?",
    "options": [
      "To speed up rendering in GIS software",
      "To prevent large-area polygons from dominating the visual layout and misrepresenting density",
      "To convert data to decimal degrees",
      "To match the projection coordinate system"
    ],
    "answer": 1,
    "explanation": "Without normalization, larger areas are visually exaggerated and raw counts fail to represent the actual spatial density or rate, leading to incorrect interpretations.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q113"
  },
  {
    "id": 114,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What visual effect is achieved by using a hillshade raster behind a terrain map?",
    "options": [
      "Calculating true aspect angles",
      "Simulating the light and shadow on a surface to create a 3D illusion of relief",
      "Delineating stream channels",
      "Determining slope percentages"
    ],
    "answer": 1,
    "explanation": "Hillshading calculates hypothetical illumination of a surface from a specified sun angle, creating shadows that give the user a clear visual perception of terrain relief.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q114"
  },
  {
    "id": 115,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which map projection is commonly used by Google Maps and most modern web mapping services?",
    "options": [
      "WGS 84 Geographic (EPSG:4326)",
      "Web Mercator (EPSG:3857)",
      "UTM Zone 10N",
      "Robinson compromises"
    ],
    "answer": 1,
    "explanation": "Web Mercator (EPSG:3857) is the standard projection for web maps because it preserves angles and directions locally, and projects the earth onto a clean square raster grid.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q115"
  },
  {
    "id": 116,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What characterizes a 'large-scale' map compared to a 'small-scale' map?",
    "options": [
      "It covers a very large geographic area with minimal detail",
      "It has a larger representative fraction (e.g., 1:5,000) and displays a small area with high detail",
      "It applies only to regional maps",
      "It has a smaller representative fraction (e.g., 1:1,000,000)"
    ],
    "answer": 1,
    "explanation": "A large-scale map has a larger fraction value (like 1/1,000 is larger than 1/1,000,000). It covers a small area but reveals much more detail and features.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q116"
  },
  {
    "id": 117,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "On a map showing points with varying sizes, which symbol scaling method scales symbol radius linearly with the data value?",
    "options": [
      "Perceptual scaling",
      "Mathematical radius scaling (causes area to grow quadratically)",
      "Apparent magnitude scaling",
      "Range grading"
    ],
    "answer": 1,
    "explanation": "Linear scaling of the radius causes the area of the symbol to grow quadratically relative to value changes. This exaggerates larger values because humans perceive the symbol's area, not its radius.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q117"
  },
  {
    "id": 118,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which type of isoline represents lines of equal water depth?",
    "options": [
      "Isobaths",
      "Isohyets",
      "Isobars",
      "Isotherms"
    ],
    "answer": 0,
    "explanation": "Isobaths are lines representing equal depth below a water surface. Isohyets connect rainfall; Isobars connect atmospheric pressure; Isotherms connect temperature.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q118"
  },
  {
    "id": 119,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "What is the primary visual difference between conformal and equal-area map projections?",
    "options": [
      "Conformal projections preserve distances; equal-area projections preserve angles",
      "Conformal projections preserve local shapes and angles; equal-area projections preserve area proportions",
      "Conformal projections are always flat; equal-area are always conic",
      "Conformal projections show no distortion anywhere"
    ],
    "answer": 1,
    "explanation": "A projection cannot be both conformal and equal-area. Conformal projections preserve local shapes and angles, while equal-area projections maintain proportional area relationships across the map.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q119"
  },
  {
    "id": 120,
    "domain": "cartography",
    "domainLabel": "Cartography",
    "text": "Which color model is primarily used for designing maps intended for commercial offset printing?",
    "options": [
      "RGB (Red, Green, Blue)",
      "CMYK (Cyan, Magenta, Yellow, Key/Black)",
      "HSV (Hue, Saturation, Value)",
      "HEX hexadecimals"
    ],
    "answer": 1,
    "explanation": "CMYK is the standard subtractive color model for physical ink printing, whereas RGB is the additive color model for digital screen displays.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q120"
  },
  {
    "id": 121,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In spatial analysis, which interpolation method assumes that the variable being mapped has a continuous spatial trend that can be modeled by a mathematical function (e.g., polynomial)?",
    "options": [
      "Inverse Distance Weighting (IDW)",
      "Spline",
      "Trend Surface Analysis",
      "Nearest Neighbor"
    ],
    "answer": 2,
    "explanation": "Trend Surface Analysis is a global interpolator that uses polynomial regression equations to fit a smooth mathematical surface through all control points.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q121"
  },
  {
    "id": 122,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What type of analysis calculates the straight-line distance from each cell in a raster grid to the nearest source feature?",
    "options": [
      "Cost Distance",
      "Euclidean Distance",
      "Network Impedance",
      "Manhattan Distance"
    ],
    "answer": 1,
    "explanation": "Euclidean distance measures straight-line distance from every cell to the closest source, represented by the hypotenuse of a right triangle.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q122"
  },
  {
    "id": 123,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which tool would you use to find the single center point of a point pattern that minimizes total Euclidean distance to all other points?",
    "options": [
      "Mean Center",
      "Median Center",
      "Central Feature",
      "Standard Distance"
    ],
    "answer": 1,
    "explanation": "The Median Center is the location that minimizes the sum of straight-line distances to all points in the dataset (also known as the Fermat-Weber point).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q123"
  },
  {
    "id": 124,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In raster suitability modeling, what does a 'fuzzy overlay' account for that a standard binary overlay does not?",
    "options": [
      "The storage format of the input rasters",
      "Possibility of membership in a set on a continuous scale from 0 to 1, rather than strict true/false classes",
      "The projection system of the input maps",
      "Incorrect coordinate alignments"
    ],
    "answer": 1,
    "explanation": "Fuzzy logic allows values to range between 0 (not member) and 1 (full member), modeling gradual transitions and uncertainties in suitability rather than hard yes/no criteria.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q124"
  },
  {
    "id": 125,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "When conducting a point pattern analysis, what is the significance of a high Nearest Neighbor Ratio (greater than 1)?",
    "options": [
      "The points exhibit a highly clustered spatial pattern",
      "The points exhibit a dispersed or regular spatial pattern",
      "The points are randomly distributed",
      "The coordinate system is offset"
    ],
    "answer": 1,
    "explanation": "An Average Nearest Neighbor ratio greater than 1 indicates that the observed average distance between points is greater than expected under random distribution, showing a dispersed or regular pattern.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q125"
  },
  {
    "id": 126,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which GIS operation creates a polygon representing areas that can be reached along a road network within a 10-minute drive?",
    "options": [
      "Euclidean Buffer",
      "Service Area Network Analysis",
      "Shortest Path Routing",
      "Kernel Density Zone"
    ],
    "answer": 1,
    "explanation": "Service Area analysis solves network accessibility along routing segments, determining lines or polygons reachable within a designated cost limit (e.g. 10 minutes of travel time).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q126"
  },
  {
    "id": 127,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which interpolation method is a deterministic, local interpolator that assumes closer points have a stronger influence on the predicted value than farther points, weighted solely by distance?",
    "options": [
      "Kriging",
      "Inverse Distance Weighting (IDW)",
      "Polynomial Regression",
      "Spline"
    ],
    "answer": 1,
    "explanation": "IDW calculates predictions based solely on a mathematical function of inverse distance, with no geological or statistical models of autocorrelation involved.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q127"
  },
  {
    "id": 128,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which operations are classified as 'local operations' in map algebra?",
    "options": [
      "Operations that calculate values using adjacent cells within a moving window",
      "Operations that compute cell values on a cell-by-cell basis across multiple raster layers",
      "Operations that aggregate data within zones",
      "Operations that calculate statistics for the entire raster"
    ],
    "answer": 1,
    "explanation": "Local operations combine cell values across multiple aligned raster layers for each individual cell position independently (e.g. adding two rasters together).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q128"
  },
  {
    "id": 129,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What does a high positive value of Moran's I indicate?",
    "options": [
      "High spatial dispersion of dissimilar values",
      "Spatial clustering of similar values (high values near high, low near low)",
      "Completely random spatial distribution",
      "Data errors in the attribute table"
    ],
    "answer": 1,
    "explanation": "A positive Moran's I indicates positive spatial autocorrelation: similar values are located near each other in space, suggesting spatial clustering.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q129"
  },
  {
    "id": 130,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In watershed analysis, what is a 'sink' in a digital elevation model (DEM)?",
    "options": [
      "The highest peak in the raster surface",
      "An area of incorrect or low elevation cells surrounded by higher values, which traps artificial water flow",
      "The outlet where water drains from the map",
      "A reservoir layer"
    ],
    "answer": 1,
    "explanation": "Sinks are depressions in DEMs where water cannot flow out. Sinks must be filled before flow direction and flow accumulation models are run to ensure continuous drainage networks.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q130"
  },
  {
    "id": 131,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which spatial statistic identifies local high-value spatial clusters (hot spots) using a weighted distance matrix?",
    "options": [
      "Global Moran's I",
      "Getis-Ord Gi*",
      "Ripley's K",
      "Standard Deviational Ellipse"
    ],
    "answer": 1,
    "explanation": "Getis-Ord Gi* evaluates local features relative to their neighboring values, pinpointing statistically significant hot spots (clusters of high values) and cold spots (clusters of low values).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q131"
  },
  {
    "id": 132,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which type of raster operation evaluates cells within a specified neighborhood (e.g., a 3x3 moving window) to calculate output values?",
    "options": [
      "Local operation",
      "Focal operation",
      "Zonal operation",
      "Global operation"
    ],
    "answer": 1,
    "explanation": "Focal (or neighborhood) operations calculate cell values based on the input values of surrounding cells within a defined shape or kernel moving across the grid.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q132"
  },
  {
    "id": 133,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "When interpolating elevation points, what is the main advantage of using a Spline method?",
    "options": [
      "It produces a surface that passes exactly through all input sample values and is mathematically smooth",
      "It provides statistical error estimates",
      "It works only with categorical data",
      "It restricts output values to the minimum and maximum inputs"
    ],
    "answer": 0,
    "explanation": "Spline is a deterministic, exact interpolator that fits a flexible surface through the sample points, creating smooth curves that can extend beyond the range of input values.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Snow-cholera-map.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 134,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In network routing, Dijkstra's algorithm is primarily used to:",
    "options": [
      "Determine the most visually balanced map layout",
      "Find the shortest path between a source node and all other destination nodes in a weighted graph",
      "Create a polygon index",
      "Convert vector coordinates to raster pixels"
    ],
    "answer": 1,
    "explanation": "Dijkstra's algorithm is a fundamental graph search method that calculates the minimum path (lowest cumulative impedance) between network nodes.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q134"
  },
  {
    "id": 135,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What does the Zonal Statistics tool accomplish in GIS?",
    "options": [
      "It reprojects a raster to a different UTM zone",
      "It calculates statistical values (mean, sum, max, etc.) for a raster within zones defined by another vector or raster layer",
      "It counts the total number of polygons in a shapefile",
      "It isolates watershed boundaries"
    ],
    "answer": 1,
    "explanation": "Zonal statistics aggregates values from a value raster within defined zones (e.g. land use polygons or watershed basins) from another dataset.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q135"
  },
  {
    "id": 136,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which spatial operation combines input features from two layers and preserves only the geometries that overlap in both?",
    "options": [
      "Union",
      "Intersect",
      "Clip",
      "Erase"
    ],
    "answer": 1,
    "explanation": "Intersect performs a spatial overlay, outputting a new feature class containing only the parts of features that overlap in both input datasets, along with attributes from both.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q136"
  },
  {
    "id": 137,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In remote sensing, what does the 'spectral signature' of an object describe?",
    "options": [
      "The name of the sensor satellite that captured it",
      "How it reflects and absorbs electromagnetic radiation across different wavelengths",
      "Its exact geographic coordinate footprint",
      "The file compression algorithm used on the image"
    ],
    "answer": 1,
    "explanation": "Spectral signatures plot reflectance against wavelength. Different materials (like water, vegetation, soil) have distinct profiles, allowing features to be identified via multi-spectral band comparison.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q137"
  },
  {
    "id": 138,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which type of analysis uses points of known coordinates and values to build a continuous mathematical surface?",
    "options": [
      "Overlay Analysis",
      "Spatial Interpolation",
      "Network Analysis",
      "Buffer Analysis"
    ],
    "answer": 1,
    "explanation": "Spatial interpolation uses sample measurements at discrete locations to predict values for all unsampled cells on a continuous raster surface.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q138"
  },
  {
    "id": 139,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What is the primary difference between a simple Euclidean buffer and a geodesic buffer?",
    "options": [
      "Geodesic buffers are calculated on a flat coordinate system; Euclidean buffers account for earth curvature",
      "Euclidean buffers are calculated on a flat plane; geodesic buffers account for ellipsoidal earth shape, making them accurate over large distances",
      "Geodesic buffers only work on raster grids",
      "Euclidean buffers require 3D coordinate inputs"
    ],
    "answer": 1,
    "explanation": "Euclidean buffers assume a flat cartesian coordinate plane and distort over large areas. Geodesic buffers follow the curved ellipsoidal model of the earth, maintaining accurate distance boundaries globally.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q139"
  },
  {
    "id": 140,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which statistic measures spatial dispersion by drawing a polygon representing the directional bias and distribution of points?",
    "options": [
      "Mean Center",
      "Standard Deviational Ellipse",
      "Ripley's K function",
      "Local Moran's I"
    ],
    "answer": 1,
    "explanation": "A Standard Deviational Ellipse calculates the spatial trend of a point set, revealing directional distribution, dispersion, and orientation patterns.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q140"
  },
  {
    "id": 141,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In GIS routing, a 'one-way restriction' on a line feature is represented in network datasets as an attribute of:",
    "options": [
      "Nodes",
      "Edges",
      "Turns",
      "Junctions"
    ],
    "answer": 1,
    "explanation": "Edges represent road segments. Directional travel restrictions (like one-way roads) are stored as edge attributes that block routing algorithms from traversing them in the illegal direction.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q141"
  },
  {
    "id": 142,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which raster overlay method multiplies cell values of input layers together, where a cell value of 0 acts as a constraint?",
    "options": [
      "Weighted Overlay",
      "Arithmetic Multiplicative Overlay (Binary constraints)",
      "Fuzzy Union",
      "Additive overlay"
    ],
    "answer": 1,
    "explanation": "In binary suitability models, multiplying rasters composed of 1s (suitable) and 0s (unsuitable) ensures that if any layer is unsuitable (0), the output cell becomes 0, filtering out unsuitable locations.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q142"
  },
  {
    "id": 143,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "In terrain analysis, which DEM-derived measure calculates the second derivative of elevation, representing the rate of change of slope?",
    "options": [
      "Aspect",
      "Slope",
      "Curvature",
      "Hillshade"
    ],
    "answer": 2,
    "explanation": "Curvature is the second derivative of the elevation surface (rate of change of slope). It helps analyze geomorphological profiles, defining ridges, valleys, and surface water runoff dynamics.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q143"
  },
  {
    "id": 144,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "Which remote sensing band combination is typically used to generate a false-color infrared image to evaluate vegetation health?",
    "options": [
      "Red, Green, Blue",
      "Near-Infrared, Red, Green",
      "Shortwave-Infrared, Red, Blue",
      "Thermal-Infrared, Green, Blue"
    ],
    "answer": 1,
    "explanation": "False-color infrared composites assign Near-Infrared to the red channel, Red to the green channel, and Green to the blue channel, highlighting highly reflective green vegetation as bright red.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q144"
  },
  {
    "id": 145,
    "domain": "spatial-analysis",
    "domainLabel": "Spatial Analysis",
    "text": "What is the term for the spatial analysis phenomenon where boundaries of features appear to skew statistics due to lack of neighboring data outside the study area?",
    "options": [
      "Scale effect",
      "Edge effect",
      "Zoning effect",
      "MAUP"
    ],
    "answer": 1,
    "explanation": "The edge effect occurs when analyzing spatial points or boundaries near the edge of a study region, since the lack of recorded data outside the border skews density and neighborhood calculations.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q145"
  },
  {
    "id": 146,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which database coordinate reference system storage method defines the boundaries, projection, and linear unit of coordinates?",
    "options": [
      "SQL constraint schema",
      "Spatial Reference Identifier (SRID)",
      "Metadata XML template",
      "Attribute domain definition"
    ],
    "answer": 1,
    "explanation": "The Spatial Reference Identifier (SRID) links spatial geometry values in a database to their corresponding coordinate system parameters in tables like spatial_ref_sys.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q146"
  },
  {
    "id": 147,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which file format is a plain text, open-standard format for simple vector geographic data representation, widely used in web development?",
    "options": [
      "Shapefile",
      "GeoPackage",
      "GeoJSON",
      "DWG"
    ],
    "answer": 2,
    "explanation": "GeoJSON is a lightweight, human-readable file format based on JSON (JavaScript Object Notation), representing points, lines, polygons, and their non-spatial attributes.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q147"
  },
  {
    "id": 148,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the primary coordinate datum for the Global Positioning System (GPS)?",
    "options": [
      "NAD27",
      "ED50",
      "WGS 84",
      "NAD83"
    ],
    "answer": 2,
    "explanation": "WGS 84 (World Geodetic System 1984) is the global ellipsoidal datum developed for GPS, matching coordinate systems worldwide.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q148"
  },
  {
    "id": 149,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "In database theory, what is a primary key?",
    "options": [
      "A key that unlocks spatial files",
      "A column or set of columns that uniquely identifies each row in a database table",
      "An index used to speed up queries",
      "A foreign key linked to another schema"
    ],
    "answer": 1,
    "explanation": "A primary key enforces unique constraints on a column, preventing duplicate records and enabling relational tables to link together.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q149"
  },
  {
    "id": 150,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What type of compression is used by MRFID (MrSID) image formats, allowing rapid viewing of massive rasters by reading only required resolution levels?",
    "options": [
      "Lossless zip compression",
      "Wavelet compression",
      "LZW pixel reduction",
      "JPEG quantization"
    ],
    "answer": 1,
    "explanation": "MrSID (Multiresolution Seamless Image Database) utilizes wavelet compression technology to compress massive imagery while allowing selective decompression at different zoom scales.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q150"
  },
  {
    "id": 151,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the difference between geographic coordinate systems (GCS) and projected coordinate systems (PCS)?",
    "options": [
      "GCS are in meters; PCS are in feet",
      "GCS represent coordinates on a 3D spherical model (lat/long); PCS project those coordinates onto a flat 2D plane (X/Y)",
      "PCS are older than GCS datums",
      "GCS use conformal projections"
    ],
    "answer": 1,
    "explanation": "A GCS defines coordinates on a three-dimensional model of the earth (using degrees of latitude and longitude). A PCS converts those spherical coordinates to a flat surface using map projections (using linear units like meters or feet).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q151"
  },
  {
    "id": 152,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which OGC standard file extension contains SQLite databases storing vector features, tile matrices, and metadata tables?",
    "options": [
      ".geojson",
      ".kml",
      ".gpkg",
      ".shp"
    ],
    "answer": 2,
    "explanation": "GeoPackage (.gpkg) is an open, SQLite-based container that holds vector data, raster tiles, and attributes in a single file format.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q152"
  },
  {
    "id": 153,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What does the 'lineage' section of a geospatial metadata file record?",
    "options": [
      "The pricing and licensing terms of the dataset",
      "The history of data sources, processing steps, transformations, and coordinate changes applied to the data",
      "The contact details of the database administrator",
      "The spatial boundary coordinates"
    ],
    "answer": 1,
    "explanation": "Metadata lineage documents the history and source materials used to construct a dataset, including the processing methods applied, facilitating transparency and reproduction.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q153"
  },
  {
    "id": 154,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which geospatial data index divides coordinate space into nested grid cells, widely used by databases to index geometric shapes?",
    "options": [
      "B-Tree Index",
      "Quadtree or R-Tree Index",
      "Hash Index",
      "Serial key index"
    ],
    "answer": 1,
    "explanation": "R-Trees and Quadtrees group spatial features by boundary coordinates in hierarchical trees, allowing spatial queries (like bounding box overlaps) to search specific branches instead of entire datasets.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q154"
  },
  {
    "id": 155,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the role of the ellipsoid in coordinate reference systems?",
    "options": [
      "To represent local mountain heights",
      "To mathematically approximate the three-dimensional, flattened shape of the earth at sea level",
      "To determine satellite orbit paths",
      "To measure atmospheric pressure"
    ],
    "answer": 1,
    "explanation": "An ellipsoid is a smooth mathematical sphere approximation that provides the base geometry for calculating geodetic coordinate grids (latitudes and longitudes).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q155"
  },
  {
    "id": 156,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is a 'foreign key' in a relational database?",
    "options": [
      "A primary key from an external database server",
      "An attribute column in a table that references the primary key of another table to establish a link between them",
      "An encrypted access token",
      "An index for spatial coordinates"
    ],
    "answer": 1,
    "explanation": "Foreign keys enforce referential integrity between tables, linking child records to their corresponding parent records in associated tables.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q156"
  },
  {
    "id": 157,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is the spatial data resolution of a raster grid?",
    "options": [
      "The number of layers in the file",
      "The ground size represented by each individual pixel (cell size)",
      "The coordinate accuracy of cell corners",
      "The maximum elevation range"
    ],
    "answer": 1,
    "explanation": "Raster spatial resolution is determined by cell size. A 10m resolution means each pixel represents a 10x10 meter square area on the ground.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q157"
  },
  {
    "id": 158,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which vector file component stores attribute data in the ESRI Shapefile format?",
    "options": [
      ".shp",
      ".shx",
      ".dbf",
      ".prj"
    ],
    "answer": 2,
    "explanation": "A shapefile requires multiple files: .shp stores geometries, .shx stores spatial index, and .dbf stores attribute data in dBase format.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q158"
  },
  {
    "id": 159,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "In database design, what does 'data redundancy' lead to?",
    "options": [
      "Faster query performance",
      "Wasted storage space, database size bloat, and inconsistencies when data is updated in one location but not another",
      "Automatic backups",
      "Improved spatial query accuracy"
    ],
    "answer": 1,
    "explanation": "Redundancy (storing duplicate information across different tables) causes database bloat and leads to update anomalies where conflicting data variants exist.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q159"
  },
  {
    "id": 160,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which coordinate reference system is designed to minimize projection distortion within a single, narrow state region in the US?",
    "options": [
      "UTM (Universal Transverse Mercator)",
      "SPCS (State Plane Coordinate System)",
      "WGS 84 Geographic",
      "Mercator"
    ],
    "answer": 1,
    "explanation": "The State Plane Coordinate System (SPCS) divides US states into small zones with customized local projections (Lambert Conformal Conic or Transverse Mercator) to limit distortion to less than 1 part in 10,000.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q160"
  },
  {
    "id": 161,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What is a TIN (Triangulated Irregular Network) data model?",
    "options": [
      "A raster grid for elevation values",
      "A vector structure representing a continuous surface using a network of non-overlapping, irregular triangles",
      "A database system for topology rules",
      "An image file format for terrain models"
    ],
    "answer": 1,
    "explanation": "TINs model terrain using elevation points (vertices) connected by edges into a mesh of triangles, allowing detailed relief mapping with fewer data points than dense rasters.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q161"
  },
  {
    "id": 162,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What does the term 'metadata' mean?",
    "options": [
      "Compressed spatial data files",
      "Data about data \u2014 documentation describing the content, quality, source, and structure of a dataset",
      "Relational database tables",
      "Web map coordinate systems"
    ],
    "answer": 1,
    "explanation": "Metadata is structured documentation that informs users about a dataset's origin, coordinate systems, attribute fields, constraints, and lineage.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q162"
  },
  {
    "id": 163,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "Which GPS method uses two receivers (base and rover) measuring carrier phase signal wavelengths to resolve coordinates with sub-centimeter accuracy?",
    "options": [
      "Differential GPS (DGPS)",
      "Real-Time Kinematic (RTK) GPS",
      "Standard Trilateration",
      "Assisted GPS (A-GPS)"
    ],
    "answer": 1,
    "explanation": "RTK (Real-Time Kinematic) is an advanced geodetic GPS method that resolves carrier phase measurements to deliver centimeter-level coordinates in real-time.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q163"
  },
  {
    "id": 164,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "What type of database structure organizes tables into relations linked by shared identifier columns?",
    "options": [
      "Hierarchical Database Management System (DBMS)",
      "Relational Database Management System (RDBMS)",
      "Object-oriented DBMS",
      "NoSQL DBMS"
    ],
    "answer": 1,
    "explanation": "An RDBMS models data in tables (relations) with columns (attributes) and rows (tuples), linking them together using shared keys.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q164"
  },
  {
    "id": 165,
    "domain": "data-management",
    "domainLabel": "Data Management",
    "text": "In database design, the process of structuring fields and tables to minimize redundancy and dependency is called:",
    "options": [
      "Spatial indexing",
      "Normalization",
      "Reclassification",
      "Topology validation"
    ],
    "answer": 1,
    "explanation": "Normalization is the systematic design process of organizing data tables in relational databases to reduce redundant fields and prevent modification errors.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q165"
  },
  {
    "id": 166,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which type of GIS service allows users to view, pan, and zoom maps on a web client, but does not allow downloading or editing feature geometries?",
    "options": [
      "WFS (Web Feature Service)",
      "WMS (Web Map Service)",
      "WCS (Web Coverage Service)",
      "WPS (Web Processing Service)"
    ],
    "answer": 1,
    "explanation": "WMS delivers pre-rendered map images (JPEG, PNG) representing GIS layers, allowing display without exposing raw vector geometries.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q166"
  },
  {
    "id": 167,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In an enterprise GIS database, what does a SDE (Spatial Database Engine) schema bridge?",
    "options": [
      "Desktop GIS applications and raw raster files",
      "Relational databases (RDBMS) and GIS software, enabling spatial data types to be managed directly inside SQL databases",
      "GPS devices and field map files",
      "Web servers and cloud storage buckets"
    ],
    "answer": 1,
    "explanation": "SDE schemas manage spatial datatypes, coordinates, and versioned tables within relational databases (like SQL Server or Oracle), translating desktop GIS queries to database operations.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q167"
  },
  {
    "id": 168,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which phase of the GIS System Development Life Cycle (SDLC) defines user workflows, required datasets, and hardware specifications?",
    "options": [
      "Feasibility study",
      "System requirements analysis and design",
      "Implementation and deployment",
      "Maintenance and support"
    ],
    "answer": 1,
    "explanation": "The system requirements and design phase translates organizational needs into explicit hardware, software, dataset, and architectural specifications.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q168"
  },
  {
    "id": 169,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In database versioning, what is the 'Reconcile' process?",
    "options": [
      "Merging multiple databases together",
      "Comparing edit changes in a child version against the parent version to identify conflicts before merging",
      "Backing up edit files",
      "Recalculating spatial indices"
    ],
    "answer": 1,
    "explanation": "Reconciling compares edits in a child branch with changes made in the parent branch. If conflicts exist (e.g. edits to the same feature), they are flagged for review.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q169"
  },
  {
    "id": 170,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which web service standard delivers geospatial raster data (such as DEMs or satellite imagery) as raw grid cell values?",
    "options": [
      "WMS",
      "WFS",
      "WCS (Web Coverage Service)",
      "WPS"
    ],
    "answer": 2,
    "explanation": "WCS delivers raw raster cell values (coverage data) rather than visual pictures, allowing clients to run spatial analysis models on the retrieved data.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q170"
  },
  {
    "id": 171,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What does the term 'interoperability' mean in GIS system design?",
    "options": [
      "The processor speed of the server",
      "The ability of diverse GIS software and databases to share data, services, and file formats using open standards",
      "The coordinate accuracy of boundaries",
      "Enforcing strict access permissions"
    ],
    "answer": 1,
    "explanation": "Interoperability is the capacity of different GIS packages and databases to exchange information seamlessly, supported by standard protocols like those from the OGC.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q171"
  },
  {
    "id": 172,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What type of topology rule prevents cadastre parcels from leaving open spaces between shared boundaries?",
    "options": [
      "Must not overlap",
      "Must not have gaps",
      "Must be inside",
      "Must connect at endpoints"
    ],
    "answer": 1,
    "explanation": "A 'Must not have gaps' rule validates that adjacent polygons share boundaries exactly, preventing sliver polygons or vacant spaces from creating mapping errors.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q172"
  },
  {
    "id": 173,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In database design, what is a relational join?",
    "options": [
      "Combining geometries of two layers based on location",
      "Linking two attribute tables together based on a common key column, extending attribute columns temporarily",
      "Merging two files into a single folder",
      "Connecting vertices in a line feature"
    ],
    "answer": 1,
    "explanation": "A join links columns from one table to another based on matching key values, allowing queries across related tables.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q173"
  },
  {
    "id": 174,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which database component restricts attribute entries to a fixed dropdown list or specific numeric range?",
    "options": [
      "Spatial index",
      "Attribute domain",
      "Primary key constraint",
      "Metadata lineage"
    ],
    "answer": 1,
    "explanation": "Domains enforce data integrity at the database level by restricting entries in a field to a predefined list (Coded Value Domain) or range (Range Domain).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q174"
  },
  {
    "id": 175,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What is the primary role of a metadata clearinghouse or catalog service in Spatial Data Infrastructures (SDI)?",
    "options": [
      "To store all physical shapefiles on a single server",
      "To provide a searchable portal where users can search, find, and link to datasets published by different organizations",
      "To reproject vector files automatically",
      "To encrypt database schemas"
    ],
    "answer": 1,
    "explanation": "Metadata catalogs (using CSW standard) enable distributed publishers to register data records in a central index, helping users discover geospatial resources.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q175"
  },
  {
    "id": 176,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which system design pattern distributes GIS processing, rendering, and logic across client browsers using JavaScript APIs (e.g., Leaflet or Mapbox GL)?",
    "options": [
      "Server-side rendering (Thin Client)",
      "Client-side rendering (Fat Client)",
      "Mainframe terminal architecture",
      "Stand-alone Desktop architecture"
    ],
    "answer": 1,
    "explanation": "Client-side rendering downloads vector tiles or GeoJSON datasets to the client device, using local browser GPU/CPU power to style, render, and filter layers.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q176"
  },
  {
    "id": 177,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which OGC standard defines processes for executing spatial analysis operations (like buffer or overlay) on a remote web server?",
    "options": [
      "WFS",
      "WCS",
      "WPS (Web Processing Service)",
      "WMTS"
    ],
    "answer": 2,
    "explanation": "WPS defines standard web interfaces for executing geoprocessing algorithms on remote servers, letting clients request analytical operations and receive results.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q177"
  },
  {
    "id": 178,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What is the purpose of a 'logical data model' in the GIS database design phase?",
    "options": [
      "To list the server folder directory paths",
      "To define the structured tables, fields, types, and primary-foreign key relationships, independently of specific database software",
      "To establish database backup schedules",
      "To define layer symbology"
    ],
    "answer": 1,
    "explanation": "The logical model models the logical entities and relations in detail, representing table structures and rules before physical implementation on a specific software platform.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q178"
  },
  {
    "id": 179,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In database versioning, what is the 'Post' process?",
    "options": [
      "Deleting edits from child branches",
      "Merging reconciled changes from a child edit session into the target parent version",
      "Running topology validation",
      "Exporting database logs"
    ],
    "answer": 1,
    "explanation": "Posting is the final transaction in versioned databases, applying reconciled changes from the editor's branch into the master database version (usually 'Default').",
    "image": "https://placehold.co/600x400?text=Visual+for+Q179"
  },
  {
    "id": 180,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "When building a web map that needs to load massive base datasets (like satellite maps) instantly, which technique is most effective?",
    "options": [
      "Querying WFS vector geometries on every zoom change",
      "Web Map Tile Service (WMTS) delivering pre-rendered, cached image tiles matching a standard grid hierarchy",
      "Sending zipped Shapefiles over email",
      "Loading raw elevation rasters directly"
    ],
    "answer": 1,
    "explanation": "WMTS (Web Map Tile Service) serves pre-generated cache tiles, eliminating server-side rendering delays and accelerating client load times.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q180"
  },
  {
    "id": 181,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "In geodatabase designs, which relationship class type automatically moves or deletes related rows in a child table when a feature in the parent table is moved or deleted?",
    "options": [
      "Simple relationship class",
      "Composite relationship class",
      "Foreign key constraint join",
      "One-to-many link"
    ],
    "answer": 1,
    "explanation": "Composite relationship classes model parent-child structures (like a building parent and room children), enforcing cascade deletes and synchronized moves.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q181"
  },
  {
    "id": 182,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which open standard is used to exchange styling and symbology specifications for map layers, widely supported by GeoServer and QGIS?",
    "options": [
      "KML",
      "SLD (Styled Layer Descriptor)",
      "CSS",
      "JSON-LD"
    ],
    "answer": 1,
    "explanation": "SLD (Styled Layer Descriptor) is an XML-based formatting standard used to define the visual styling of maps rendered by WMS servers.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q182"
  },
  {
    "id": 183,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What does the 'geometry type restriction' enforce in GIS database layers?",
    "options": [
      "A layer can only contain either points, lines, or polygons, but not a mixture in the same feature class",
      "Files must not exceed 2 GB",
      "Attribute field names must be unique",
      "Coordinate units must be meters"
    ],
    "answer": 0,
    "explanation": "Standard enterprise GIS database design enforces strict geometry restrictions per layer, so a single feature class holds only one geometric type (e.g. all points or all polygons).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q183"
  },
  {
    "id": 184,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "Which model maps the geospatial coordination framework between municipal, state, and federal agencies in the US?",
    "options": [
      "NSDI (National Spatial Data Infrastructure)",
      "SDI-Europe",
      "OGC Web Services schema",
      "USGS Survey model"
    ],
    "answer": 0,
    "explanation": "The NSDI coordinates geospatial data sharing, standards, and metadata access across multiple administrative levels in the United States.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q184"
  },
  {
    "id": 185,
    "domain": "gis-design",
    "domainLabel": "GIS Design",
    "text": "What is the primary benefit of versioned editing in enterprise geodatabases?",
    "options": [
      "It compresses data file sizes",
      "It allows multiple editors to work concurrently on the database in their own isolated workspaces without locks blocking edits",
      "It automates map formatting",
      "It prevents databases from growing beyond 10GB"
    ],
    "answer": 1,
    "explanation": "Versioning allows database editors to work concurrently on their own branches (versions) of the geodatabase, resolving conflict changes upon merging.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q185"
  },
  {
    "id": 186,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In Python programming with ArcPy, which object allows you to read and write attribute data inside a geodatabase table iteratively?",
    "options": [
      "arcpy.Describe()",
      "arcpy.da.SearchCursor or InsertCursor / UpdateCursor",
      "arcpy.ListFields()",
      "arcpy.SpatialReference()"
    ],
    "answer": 1,
    "explanation": "The data access (arcpy.da) cursors provide high-performance iteration over records, supporting read operations (SearchCursor) and edit operations (UpdateCursor / InsertCursor).",
    "image": "https://placehold.co/600x400?text=Visual+for+Q186"
  },
  {
    "id": 187,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which standard Python library is used to perform mathematical operations on multi-dimensional arrays, widely integrated with raster processing tools like Rasterio?",
    "options": [
      "NumPy",
      "Pandas",
      "Shapely",
      "Fiona"
    ],
    "answer": 0,
    "explanation": "NumPy is the core scientific computing library in Python, modeling raster matrices as high-performance arrays for grid computations.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9a/NumPy_Matplotlib_sin_x_plotted_with_red_dots.svg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=original"
  },
  {
    "id": 188,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which GDAL command-line tool is used to warp or reproject a raster dataset to a new coordinate system?",
    "options": [
      "gdalinfo",
      "gdal_translate",
      "gdalwarp",
      "gdal_merge"
    ],
    "answer": 2,
    "explanation": "gdalwarp is the raster image warping and reprojection tool, supporting datum transformations, resampling methods, and cropping.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q188"
  },
  {
    "id": 189,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In Javascript web mapping, which library is an open-source, mobile-friendly interactive mapping tool that is lightweight and widely preferred over heavy web mapping applications?",
    "options": [
      "Leaflet",
      "OpenLayers",
      "Mapbox GL JS",
      "CesiumJS"
    ],
    "answer": 0,
    "explanation": "Leaflet is a highly popular, lightweight JavaScript library for displaying tiled maps and vector layers on mobile-friendly websites.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q189"
  },
  {
    "id": 190,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In PostGIS, which SQL command returns the geometric intersection (common area) between two geometries?",
    "options": [
      "ST_Contains(a, b)",
      "ST_Intersection(a, b)",
      "ST_Union(a, b)",
      "ST_Overlap(a, b)"
    ],
    "answer": 1,
    "explanation": "ST_Intersection(geomA, geomB) returns a geometry representing the point, line, or polygon regions that overlap in both geometries.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q190"
  },
  {
    "id": 191,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which Python package reads and writes vector GIS file formats by providing bindings to the OGR library?",
    "options": [
      "Shapely",
      "Fiona",
      "Rasterio",
      "PyProj"
    ],
    "answer": 1,
    "explanation": "Fiona reads and writes geographic vector files (Shapefiles, GeoJSON, etc.) using OGR under the hood, outputting data as standard Python dictionaries.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q191"
  },
  {
    "id": 192,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "What does the Shapely library in Python provide?",
    "options": [
      "File reading and writing drivers",
      "Manipulation and analysis of planar geometric objects, including area, bounds, buffer, and intersection calculations",
      "Coordinate transformations using PROJ",
      "Raster pixel math arrays"
    ],
    "answer": 1,
    "explanation": "Shapely is dedicated to planar geometry manipulations and spatial operations, operating independently of file system reading or writing formats.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q192"
  },
  {
    "id": 193,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In web mapping, what does a CORS (Cross-Origin Resource Sharing) error indicate?",
    "options": [
      "The browser has a database connection issue",
      "The web server blocks requests coming from a different domain or port than the server domain, requiring specific headers to resolve",
      "The map projection is incorrect",
      "The file format is unsupported"
    ],
    "answer": 1,
    "explanation": "CORS is a browser security mechanism that blocks scripts on one web page from requesting resources from another domain unless the server explicitly sends headers permitting origin access.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q193"
  },
  {
    "id": 194,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "Which standard data format represents attributes and geometries inside a single, standard JSON file?",
    "options": [
      "Shapefile XML",
      "GeoJSON",
      "GeoPackage",
      "KML schema"
    ],
    "answer": 1,
    "explanation": "GeoJSON translates vector geometry (Point, LineString, Polygon, MultiPoint, etc.) and attribute properties into a single, clean JSON structure.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q194"
  },
  {
    "id": 195,
    "domain": "programming",
    "domainLabel": "Programming",
    "text": "In SQL databases, which spatial database extension provides geographic object support for PostgreSQL?",
    "options": [
      "SpatiaLite",
      "PostGIS",
      "MySQL Spatial",
      "Oracle Spatial"
    ],
    "answer": 1,
    "explanation": "PostGIS extends the PostgreSQL database engine, adding spatial object support, spatial indexing, and spatial SQL analysis functions.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q195"
  },
  {
    "id": 196,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "According to the GISCI Code of Ethics, if a GIS professional discovers that a client's project may cause significant environmental harm or violate safety codes, the professional should:",
    "options": [
      "Complete the project anyway to honor contract agreements",
      "Advise the client, and if necessary, report the concern to authorities or refuse to complete the task if violations continue",
      "Charge additional fees for safety adjustments",
      "Keep the information confidential without action"
    ],
    "answer": 1,
    "explanation": "The Code of Ethics states that a GIS professional's primary obligation is to the public health, safety, and welfare, requiring action if significant harm is discovered.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q196"
  },
  {
    "id": 197,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "In GIS data licensing, what does 'Creative Commons BY' (CC-BY) require of users?",
    "options": [
      "Users can only use the data for non-commercial projects",
      "Users must provide attribution to the original author when redistributing or using the data",
      "Users cannot modify the geometries",
      "Users must pay licensing fees"
    ],
    "answer": 1,
    "explanation": "The CC-BY license permits sharing, reuse, and modification of data for any purpose, commercial or non-commercial, provided appropriate credit (attribution) is given.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q197"
  },
  {
    "id": 198,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "Which concept protects individual identities when publishing detailed point maps (e.g., medical cases) by aggregating them into density grids or shifting point coordinates?",
    "options": [
      "Spatial anonymization or geographic masking",
      "Topology verification",
      "Datum transformation",
      "Raster reclassification"
    ],
    "answer": 0,
    "explanation": "Geographic masking (or spatial anonymization) shifts point locations or aggregates them to prevent re-identification of individuals on public maps, protecting privacy.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q198"
  },
  {
    "id": 199,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "Under the GISCI Rules of Conduct, which of the following is considered an infraction?",
    "options": [
      "Using open-source software instead of commercial software",
      "Plagiarizing another professional's maps, scripts, or data without attribution",
      "Reprojecting coordinates to a local system",
      "Publishing metadata files publicly"
    ],
    "answer": 1,
    "explanation": "Rules of Conduct prohibit plagiarism and misrepresentation of work, requiring GIS professionals to give honest credit to original authors.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q199"
  },
  {
    "id": 200,
    "domain": "ethics",
    "domainLabel": "Ethics & Law",
    "text": "What does the Freedom of Information Act (FOIA) generally mandate for GIS data held by public government entities in the US?",
    "options": [
      "The data must be deleted after 5 years",
      "The public has the right to request and access records, including geospatial data, unless it falls under specific exemptions (e.g., national security or privacy)",
      "Government data must be sold for market rates",
      "Only licensed GISPs can request access"
    ],
    "answer": 1,
    "explanation": "FOIA mandates that public records must be accessible to citizens upon request, except in cases where exemptions like individual privacy, security, or proprietary data apply.",
    "image": "https://placehold.co/600x400?text=Visual+for+Q200"
  }
];
