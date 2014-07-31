define([
    "dojo/_base/declare",
    "examples/inheritanceInJavascript"
], function(declare, InheritanceInJavascript) {


    var App = declare(null, {

        //Location Where App will get attached
        applicationNode: document.body,

        constructor: function() {
            console.log("Reached Constructor");
            this.ss = new InheritanceInJavascript();
        },

        initialize: function() {
            this.getController();
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");
            this.ss.module();

        },

        getController: function() {
            var controllerVC;
            require(["shell/ShellController"], function(Controller) {
                controllerVC = new Controller();
                this.applicationNode.appendChild(controllerVC.domNode);
            }.bind(this));
        },

        destroyController : function() {

        }

    });

    return new App();
});