/**
 * TitleView
 *
 * Very basic view inheriting BaseView
 */
'use strict';
define(['views/baseView', 'templates/title'], function (BaseView, titleTemplate) {
    var TitleView = BaseView.extend({
        render: function () {
            BaseView.prototype.render.call(this, {template: titleTemplate});
        }
    });

    return TitleView;
});
