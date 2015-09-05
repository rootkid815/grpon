/**
 * WeatherWidgetView
 *
 * Display weather forecast for a specific location.
 *
 * Initially there's a basic Jade template and an empty WeatherLocationModel.
 *
 * TODO:
 * - fill up view with real data coming from the OpenWeatherMap API
 * - request a background image from the Flickr API (or anything else you find good)
 * - add a vectoriel weather icon
 * - expand the widget with some weather forecast
 *
 */
define(['views/baseView', 'templates/weatherWidget'], function (BaseView, weatherWidgetTemplate) {
    var WeatherWidgetView = BaseView.extend({
        attributes: {
            id: 'weatherWidget'
        },

        events: {
            'click .temperature': 'clickOnTemperature'
        },

        render: function () {
            BaseView.prototype.render.apply(this, {template: weatherWidgetTemplate});
        },

        clickOnTemperature: function() {
            console.log('clickOnTemperature');
        }
    });

    return WeatherWidgetView;
});
