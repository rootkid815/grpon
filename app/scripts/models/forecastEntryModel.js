/**
 * ForecastEntryModel
 * Weather forecast info for a single point in time
 */
'use strict';
define(['backbone'], function (Backbone) {

    var ForecastEntryModel = Backbone.Model.extend({

        defaults: {
            dt: null,
            main: null,
            weather: null,
            clouds: null,
            wind: null,
            sys: null,
            dt_txt: null
        }

    });

    return ForecastEntryModel;

});