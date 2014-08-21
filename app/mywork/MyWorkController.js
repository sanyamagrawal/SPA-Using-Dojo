define([
    "dojo/_base/declare",
    "base/ParentController",
    "dojo/text!./templates/MyWorkView.html"
], function (declare, ParentController, template) {
    return declare([ParentController], {

        templateString : template

    });
});