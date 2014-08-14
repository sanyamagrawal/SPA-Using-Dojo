define([
    "dojo/_base/declare",
    "dojo/when",
    "dojo/Deferred"
], function(declare, when, Deferred) {


    var App = declare(null, {

        //Location Where App will get attached
        appContainer: document.body,

        //Which Controller is currently being shown in the View.
        currentViewController : null,

        //HTML Element that will hold the DOM Node genereated from the Contollers
        viewControllerContainer : null,

        constructor: function() {
            console.log("Reached Constructor");
        },

        initialize: function() {
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");

            //initialize The Navigation Bar
            when(this.initializeShell(), function(vc) {
                this.appContainer.appendChild(vc.domNode);
                this.initAppEvent();
            }.bind(this));
        },

        initializeShell: function() {
            var def = new Deferred(),
                controllerVC;
            require(["shell/ShellController"], function(Controller) {
                controllerVC = new Controller();
                this.currentViewController = controllerVC;
                def.resolve(controllerVC);
            }.bind(this));
            return def;
        },

        //used to Keep Track of the the links clicked for Histroy API . Need To Figure out the best way
        initAppEvent: function() {
            window.addEventListener("click", function(event){
                //Histrory API Will come here .
                //debugger;
            });
        },

        //Instantiate a View Controller and Render the DOM Node to the Shell
        instantiateViewAndClass: function() {

        },

        //Destroy the View Controller and Remove the DOM Node from the Shell
        destroyViewAndClass: function() {
            if (this.currentViewController) {
                this.currentViewController.destroyRecursive();
            }
            return;
        }

    });

    return new App();
});