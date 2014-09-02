define([
    "dojo/_base/declare",
    "base/ParentController",
    "dojo/text!./templates/MyWorkView.html"
], function (declare, ParentController, template) {
    return declare([ParentController], {
    	/**
    	 * DOM Which will be shown in the UI
    	 * @type {String}
    	 */
        templateString : template

    });
});