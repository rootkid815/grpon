/**
 * WeatherWidgetView
 *
 * Display weather forecast for a specific location.
 *
 * Initially there's a basic Jade template and an empty WeatherLocationModel.
 *
 * TODO:
 * # - fill up view with real data coming from the OpenWeatherMap API
 * # - request a background image from the Flickr API (or anything else you find good)
 * - add a vectoriel weather icon
 * - expand the widget with some weather forecast
 *
 */
'use strict';
define(['views/baseView', 'views/forecastCollectionView', 'templates/weatherWidget', 'templates/weatherWidgetError', 'moment'],
    function (BaseView, ForecastCollectionView, weatherWidgetTemplate, weatherWidgetErrorTemplate, moment) {

    var giphyApiKey = 'dc6zaTOxFJmzC';
    var giphyCtn = 0;

    var WeatherWidgetView = BaseView.extend({

        attributes: {
            id: 'weatherWidget'
        },

        events: {
            'click .temperature': 'clickOnTemperature'
        },

        initialize: function(){
            this.bindTo(this.model, 'change', this.render);
            this.bindTo(this.model, 'error', this.handleError);

            // Create forecast subview
            this.add(new ForecastCollectionView({ model: this.model.get('forecast') }));
        },

        render: function () {
            if(this.model.get('ready')){
                var locals = {
                    result: this.model.get('result'),
                    today: moment().format('LLLL')
                };
                BaseView.prototype.render.call(this, {
                    template: weatherWidgetTemplate( locals )
                });

                // Add subview...
                this.$el.find('.forecast').append(this.views[0].el).hide();

                return;
            }

            // Loading...
            // TODO: Move to a template...
            BaseView.prototype.render.call(this, {
                template: $('<img>').attr('src', 'images/loading.gif')
            });
        },

        handleError: function( error ){
            var url = [
                'http://api.giphy.com/v1/gifs/search?q=fail+cat&limit=1&api_key=', giphyApiKey,
                '&offset=', giphyCtn
            ].join('');

            giphyCtn++;

            $.getJSON(url, function( result ){
                var locals = {
                    error: error,
                    bgImage: result.data[0].images.downsized.url
                };
                BaseView.prototype.render.call(this, {
                    template: weatherWidgetErrorTemplate( locals )
                });
            }.bind(this));
        },

        clickOnTemperature: function() {
            this.$el.find('.forecast').show();
            this.model.loadForecast();
        }
    });

    return WeatherWidgetView;
});
