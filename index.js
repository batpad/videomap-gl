(function() {
    'use strict';
    var PANDORA_API_URL = 'https://pad.ma/api/';
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuamF5YiIsImEiOiJjaWcwcHc1dGIwZXBudHJrd2t5YjI3Z3VyIn0.j_6dWw8HvH5RtZrMBqbP1Q';
    window.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
        center: [-76.54335737228394, 39.18579907229748], // starting position
        zoom: 16 // starting zoom
    });


    map.on('style.load', function () {
        // getPlaces().done(function(result) {
        //     console.log('result', result);
        //     if (result.items.length === 0) {
        //         return;
        //     }
        //     var testPlace = result.items[0];

        // }).fail(function(err) {
        //     console.log('error', err);
        // });
        var videoSource = new mapboxgl.VideoSource({
            'urls': [
                // "big-buck-bunny_trailer.webm"
                // 'https://video970.pad.ma/WX/240p1.webm'
                "https://upload.wikimedia.org/wikipedia/commons/c/c0/Big_Buck_Bunny_4K.webm"
            ],
           'coordinates': [
               [-76.54335737228394, 39.18579907229748],
               [-76.52803659439087, 39.1838364847587],
               [-76.5295386314392, 39.17683392507606],
               [-76.54520273208618, 39.17876344106642]
           ]
        });
        map.addSource('video', videoSource);
        map.addLayer({
            "id": "videoLayer",
            "type": "raster",
            "source": "video"
        });

    });

    function getVideosAtPlace(place) {

    }

    function getPlaces() {
        var bbox = map.getBounds();
        var lat1 = bbox._sw.lat;
        var lat2 = bbox._ne.lat;
        var lng1 = bbox._sw.lng;
        var lng2 = bbox._ne.lng;
        var query = {
            "itemsQuery" : { "conditions" : [  ],
            "operator" : "&"
            },
            "keys" : [
                "id",
                "name",
                "alternativeNames",
                "geoname",
                "countryCode",
                "type",
                "lat",
                "lng",
                "south",
                "west",
                "north",
                "east",
                "area",
                "editable"
            ],
            "query" : { "conditions" :
                [
                    {
                        "key" : "lat",
                        "operator" : "=",
                        "value" : [18.943990139710515,18.97207667416573]
                    },
                    {
                        "key" : "lng",
                        "operator" : "=",
                        "value" : [72.76294111743164,72.88825392260742]
                    }
                ],
                "operator" : "&"
            },
            "range" : [ 0, 20],
            "sort" : [
                {
                    "key" : "area",
                    "operator" : "-"
            }]
        };
        return callPadma('findPlaces', query);
    }

    function callPadma(action, params) {
        console.log('called', PANDORA_API_URL);
        var data = {
            'action': action,
            'data': JSON.stringify(params)
        };
        return $.ajax({
            'url': PANDORA_API_URL,
            'data': data,
            'type': 'POST',
            'dataType': 'json'
        });
        // return $.post(PANDORA_API_URL, data);
    }

})();
