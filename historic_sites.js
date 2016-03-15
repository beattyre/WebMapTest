var map;

function initmap() {
  map = new L.map('map');
  // Add basemap from OSM
  var osmHot = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map Data @ <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>';
  var osm = new L.tileLayer(osmHot, {
    minZoom: 15,
    maxZoom: 18,
    attribution: osmAttributes
  });

  map.setView(new L.LatLng(37.499, -79.875), 17);
  map.addLayer(osm);
};
initmap();

$.getJSON("https://rawgit.com/beattyre/WebMapTest/gh-pages/TestPoints.geojson", function(data) {
  L.geoJson(data, {
  onEachFeature: function(feature, layer){
    layer.bindPopup("<b>Stop Number: </b>" + feature.properties.Stop_No +
        "<br><b>Location Name: </b>" + feature.properties.name)
  }
  }).addTo(map);
});

var sidebar = L.control.sidebar('sidebar', {
  position: 'right'
});

map.addControl(sidebar);
setTimeout(function(){
  sidebar.show();
}, 500);
