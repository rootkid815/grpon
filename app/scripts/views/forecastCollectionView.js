/**
 * ForecastCollectionView
 *
 * Show a list of forecast info from a collection
 *
 */
'use strict';
define(['views/baseView', 'templates/forecast', 'moment'], function (BaseView, forecastTemplate, moment) {
    
    var ForecastCollectionView = BaseView.extend({
        attributes: {
            id: 'weatherWidgetForecast'
        },

        initialize: function(){
            this.bindTo(this.model, 'reset', this.render);
            this.bindTo(this.model, 'error', this.handleError);
        },

        // TODO: show loading symbol
        render: function () {
            var locals = {
                collection: this.model.models,
                moment: moment
            };
            BaseView.prototype.render.call(this, {
                template: forecastTemplate( locals )
            });
        },

        // TODO: improve forecast error handling
        handleError: function( error ){
            BaseView.prototype.render.call(this, {
                template: 'Error loading forecast :( (' + error.message + ')'
            });
        }
    });

    return ForecastCollectionView;
});
