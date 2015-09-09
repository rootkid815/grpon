/**
 * WeatherLocationModel
 *
 * Access weather forecast for a particular location
 *
 * TODO:
 * # - request weather location from the OpenWeatherMap API (documentation here: http://openweathermap.org/current)
 * # - you can use the provided API key
 *
 */
'use strict';
define(['backbone', 'collections/weatherForecastCollection'], function (Backbone, WeatherForecastCollection) {
    var openWeatherApiKey = 'c1dd1cf3dd68a9dedfa059420781c48c';
    var flickrApiKey = '1e259f4da92817dde9a75e32e7ea5d02';

    var WeatherLocationModel = Backbone.Model.extend({

        weatherXHR: null,
        flickrXHR: null,
        forecastXHR: null,

        defaults: {
            ready: false,
            result: null,
            forecast: new WeatherForecastCollection()
        },

        abort: function() {
            ['weatherXHR', 'flickrXHR', 'forecastXHR'].forEach(function(xhrName){
                this[xhrName] && this[xhrName].abort() && (this[xhrName] = null);
            }.bind(this));
        },

        reset: function ( options ) {
            options || (options = {});
            this.abort();
            this.attributes.ready = false;
            this.attributes.result = null;
            this.attributes.forecast.reset();
            !options.silent && this.trigger('change');
        },

        update: function( latlng ) {
            this.reset();

            var weatherUrl = [
                'http://api.openweathermap.org/data/2.5/weather?type=like&units=metric&lat=', latlng.lat,
                '&lon=', latlng.lng,'&APPID=', openWeatherApiKey
            ].join('');

            this.weatherXHR = $.getJSON(weatherUrl, function( weatherResult ){
                if(weatherResult.cod === 200){

                    // Get flickr bg image
                    var flickrUrl = [
                        'https://api.flickr.com/services/rest/?method=flickr.photos.search&content_type=1',
                        '&text=', weatherResult.name, '&accuracy=1&per_page=1&format=json&nojsoncallback=1&api_key=', flickrApiKey
                    ].join('');

                    this.flickrXHR = $.getJSON(flickrUrl, function( flickrResult ){

                        if(flickrResult.stat === 'ok' && flickrResult.photos.photo.length > 0){
                            weatherResult.bgImage = [
                                'https://farm', flickrResult.photos.photo[0].farm,
                                '.staticflickr.com/', flickrResult.photos.photo[0].server,
                                '/', flickrResult.photos.photo[0].id,
                                '_', flickrResult.photos.photo[0].secret, '_m.jpg'
                            ].join('');
                        } else {
                            weatherResult.bgImage = 'images/cities/berlin.jpg';
                        }

                        this.set({
                            ready: true,
                            result: weatherResult
                        });
                    }.bind(this));

                } else {
                    this.trigger('error', weatherResult);
                }
            }.bind(this));
        },

        loadForecast: function() {

            // do nothing if no weather data is given...
            if(!this.attributes.ready) {
                return;
            }

            var forecastUrl = [
                'http://api.openweathermap.org/data/2.5/forecast?units=metric&id=',
                this.attributes.result.id,'&APPID=', openWeatherApiKey
            ].join('');

            this.forecastXHR = $.getJSON(forecastUrl, function(forecastResult){
                if(forecastResult.cod === '200'){
                    this.attributes.forecast.reset(forecastResult.list);
                } else {
                    this.attributes.forecast.trigger('error', forecastResult);
                }
            }.bind(this));
        }
    });

    return WeatherLocationModel;
});
