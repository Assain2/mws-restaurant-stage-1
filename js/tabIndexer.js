let mapTabIndex = function() {
  $("document").ready(function() {
    var mapFooter = document.getElementsByClassName('leaflet-control-attribution');
    var mapLinks = mapFooter[0].children;
    for (var i = 0; i < mapLinks.length; i++){
      mapLinks[i].tabIndex = -1;
    }

    var mapElem = document.getElementById('map');
    mapElem.tabIndex = -1;
  });
};
