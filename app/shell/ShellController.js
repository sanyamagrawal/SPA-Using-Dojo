/*
    Shell Class . This is the Overview of the entire shell . A shell is always required by the App .
    An app can have multiple shells. But the vice versa is not true.
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/ShellView.html"
], function(declare, WidgetBase, TemplatedMixin, template) {

    return declare([WidgetBase, TemplatedMixin], {

        baseClass : "dojoSPA",

        templateString : template,

    });

});