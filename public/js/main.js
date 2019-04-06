var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-84.063085, 39.780713]),
      zoom: 15
    })
  });
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([-74.006,40.7127])
    ),  // Cordinates of New York's Town Hall
  });
  var vectorSource = new ol.source.Vector({
    features: [marker]
  });
  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  map.addLayer(markerVectorLayer);

var socket = io();
socket.on("new precise tweet", function(msg) {
    //console.log(msg.data);
    console.log("New tweet from: long: " + msg.data[0] + " lat: " + msg.data[1]);
    var marker2 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([msg.data[0], msg.data[1]])
        ),
    });
    vectorSource.addFeature(marker2);
});

socket.on("new loose tweet", function(msg) {
    //console.log(msg.data);
    console.log("New tweet within area sw-long: " + msg.data[0][0][0] + " sw-lat: " + msg.data[0][0][1] + " ne-long: " + msg.data[0][1][0] + " ne-lat: " + msg.data[0][1][1]);
    let geodata = [((msg.data[0][0][0] + msg.data[0][1][0]) / 2), ((msg.data[0][0][1] + msg.data[0][1][1]) / 2)];
    console.log("Area midpoint: long: " + geodata[0] + " lat: " + geodata[1]);
    var marker2 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([geodata[0], geodata[1]])
        ),
    });
    vectorSource.addFeature(marker2);
});