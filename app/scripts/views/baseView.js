/**
 * BaseView
 *
 * A very basic base view. Please feel free to enrich it.
 *
 * Based on view management patterns:
 * - http://stackoverflow.com/questions/8348805/pattern-to-manage-views-in-backbone
 * -> Answer by roberkules
 * - https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
 * -> Comments by Johnny Oshika
 */
'use strict';
define(['backbone'], function (Backbone) {
    var BaseView = Backbone.View.extend({
        bindings: [],
        
        render: function (params) {
            params || (params = {});

            if (params.template) {
                $(this.el).empty().append(params.template);
            }

            return this;
        },

        bindTo: function (model, ev, callback) {
            model.bind(ev, callback, this);
            this.bindings.push({ model: model, ev: ev, callback: callback });
            return this;
        },

        unbindFromAll: function () {
            _.each(this.bindings, function (binding) {
                binding.model.unbind(binding.ev, binding.callback);
            });
            this.bindings = [];
            return this;
        },

        add: function( view ) {
            this.views || (this.views = []);
            this.views.push(view);
            return this;
        },

        remove: function(){
            // dispose any sub-views
            _.each(this.views || [], function(view) {
                view.remove();
            });

            // if the inheriting class defines a custom on-remove method, call it!
            _.isFunction(this.onRemove) && this.onRemove();

            // unbind all events
            this.unbindFromAll();
            this.off();

            $(this.el).unbind().empty().remove();

            Backbone.View.prototype.remove.call(this);
        }
    });

    return BaseView;
});
