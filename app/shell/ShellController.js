define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/_WidgetBase"
], function(declare, domConstruct, WidgetBase) {

    return declare([WidgetBase], {

        value: 1,

        baseClass : "dojoSPA",

        constructor: function() {
            console.log("Reached ShellController" + this.value++);
            this.inherited(arguments);
        },

        postscript: function() {
            console.log("Reach Postscript" + this.value++);
            this.inherited(arguments);
        },

        postMixInProperties: function() {
            console.log("Reached Post Mixin In Properties" + this.value++);
            this.inherited(arguments);
        },

        buildRendering: function() {
            console.log("Reached BuildRendering" + this.value++);
            this.domNode = domConstruct.create("button", {innerHTML: "push me"});
            this.inherited(arguments);
        },

        postCreate: function() {
            console.log("Reached Post Create" + this.value++);
            this.inherited(arguments);
        },

        startup: function() {
            console.log("Reached Startup" + this.value++);
            this.inherited(arguments);
        },

        destroy: function() {
            console.log("Reached destroy" + this.value++);
            this.inherited(arguments);
        }

    });

});