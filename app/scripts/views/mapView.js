/**
 * MapView
 *
 * Manage interactions with the map created using Mapbox
 */
'use strict';
define(['backbone'], function (Backbone) {
    var mapboxSettings = {
        accessToken: 'pk.eyJ1IjoiZG9kbWNkdW5kIiwiYSI6IjMzOTk2YTJhNTQwZmMyYjNkODMxYjQ3YWIwNDg4Njk0In0._WAla5qWMPDzEAcrPA2ssg',
        map: 'dodmcdund.1d7626bd'
    };

    var MapView = Backbone.View.extend({
        attributes: {
            id: 'mapContainer'
        },

        drawMap: function () {
            this.map = L.mapbox.map(this.attributes.id, mapboxSettings.map, {accessToken: mapboxSettings.accessToken});
            this.map
                .whenReady(this.trigger.bind(this, 'mapReady'))
                .on('mousemove', this.trigger.bind(this, 'mapMouseMove'))
                .on('click', this.trigger.bind(this, 'mapClick'));
        },

        panTo: function (lat, lng, zoom) {
            zoom || (zoom = 2);
            this.map.panTo({lat: lat, lng: lng}).zoomIn(zoom);
        },

        openPopup: function (popupView, latlng) {
            return L.popup().setLatLng(latlng).setContent(popupView.el).openOn(this.map);
        }
    });

    return MapView;
});
