/* All Controller Which are Template Based .Should Inherit from Parent Controller . This file contains methods
and classes common to all Controllers. This is equivalent to _.extend Controllers in Backbone.js
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
], function (declare, WidgetBase, TemplatedMixin) {

    return declare([WidgetBase, TemplatedMixin]);
});