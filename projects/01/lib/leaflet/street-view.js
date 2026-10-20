
function onMapClick(e) {
  

      // console.log(e.target);
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);
  
    var streetViewLink = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + lat + ',' + lng;
  
    L.popup()
        .setLatLng(e.latlng)
        .setContent(`<a href='${streetViewLink}' target='_blank'>View in Street View</a>`)
        .openOn(map);
    // Construct Street View link
  
    // Open Street View link in a new window
    // window.open(streetViewLink);
  }
  
  map.on('click', onMapClick);
    // Create the legend control
  
    let panorama;
  
    function initialize() {
      panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
          position: { lat: 37.86926, lng: -122.254811 },
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        },
      );
    }
  
  window.initialize = initialize;
  
  