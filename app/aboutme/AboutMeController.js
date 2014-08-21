define([
    "dojo/_base/declare",
    "base/ParentController",
    "dojo/text!./templates/AboutMeView.html"
], function (declare, ParentController, template) {
    return declare([ParentController], {

        templateString : template

    });
});