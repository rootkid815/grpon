/**
 * WeatherLocationModel
 *
 * Access weather forecast for a particular location
 *
 * TODO:
 * - request weather location from the OpenWeatherMap API (documentation here: http://openweathermap.org/current)
 * - you can use the provided API key
 *
 */
define(['backbone'], function (Backbone) {
    var openWeatherApiKey = 'c1dd1cf3dd68a9dedfa059420781c48c';

    var WeatherLocationModel = Backbone.Model.extend({
        initialize: function (latlng) {

        }
    });

    return WeatherLocationModel;
});
