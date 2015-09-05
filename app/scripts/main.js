/*global require*/
'use strict';

/*
 * Main Application code
 *
 * We draw the world map where one can click to obtain a weather forecast for a particular location.
 *
 * TODO:
 * # - Don't expect the initial code to work! First, find & fix our intentional mistakes left in scripts.
 * - When clicking on the map, request current weather forecast for this location and display basic infos in a widget
 * - Show usage of Backbone.Collection: for instance, request a 3h weather forecast
 * - Show usage of React/JSX by building up the same features using React components instead of Backbone views.
 * - Write a few unit tests.
 */
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        mapbox: {
            exports: 'L'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        jade: '../bower_components/jade/jade',
        react: '../bower_components/react/react',
        mapbox: '../bower_components/mapbox.js/mapbox'
    }
});

require([
    'views/mapView',
    'views/weatherWidgetView',
    'views/titleView',
    'mapbox'
], function main(MapView, WeatherWidgetView, TitleView) {
    var mapView = new MapView();

    mapView
        .on('mapClick', function (event) {
            var weatherWidget = new WeatherWidgetView({latlng: event.latlng});
            this.openPopup(weatherWidget, event.latlng);
        });

    mapView.render();
    document.body.appendChild(mapView.el);

    mapView.drawMap();
    mapView.on('mapReady', function(){
       mapView.panTo(52.513583, 13.395357); // that's Groupon Berlin! 
    });

    var titleView = new TitleView({el: '#footer'});
    titleView.render();
});
