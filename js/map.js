var mapContainer = document.querySelector('#map');

if (mapContainer) {

    ymaps.ready(init);
    var myMap, myPlacemark;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.939631, 30.323055],
            zoom: 14,
            controls: ["zoomControl"]
        });

        myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
            hintContent: 'Мы тут!'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-map-marker.svg',
            iconImageSize: [36, 36],
            iconImageOffset: [-18, -18]
        });

        myMap.geoObjects.add(myPlacemark);

        myMap.behaviors.disable('scrollZoom');
    }

}
