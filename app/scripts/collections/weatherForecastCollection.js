/**
 * WeatherForecastCollection
 * Access the forecast data for a weather location
 */
'use strict';
define(['backbone', 'models/forecastEntryModel'], function (Backbone, ForecastEntryModel) {

    var WeatherForecastCollection = Backbone.Collection.extend({
        model: ForecastEntryModel
    });

    return WeatherForecastCollection;

});