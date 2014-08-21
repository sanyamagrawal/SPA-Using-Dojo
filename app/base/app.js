define([
    "dojo/_base/declare",
    "dojo/when",
    "dojo/Deferred",
    "dojo/on"
], function (declare, when, Deferred, on) {


    var App = declare(null, {

        //Location Where App will get attached
        appContainer: document.body,

        //Which Controller is currently being shown in the View.
        currentViewController: null,

        //HTML Element that will hold the DOM Node genereated from the Contollers
        viewControllerDomNode: null,

        //The First Page to Show to the User. Either Take it from param or from defaultPath
        defaultPath: "aboutme",

        constructor: function () {
            console.log("Reached Constructor");
        },

        initialize: function () {
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");

            //initialize The Navigation Bar
            when(this.initializeShell(), function (vc) {
                this.appContainer.appendChild(vc.domNode);
                this.initAppEvent();
                this.initHomepage();
            }.bind(this));
        },

        initializeShell: function () {
            var def = new Deferred(),
                controllerVC;
            require(["shell/ShellController"], function (Controller) {
                controllerVC = new Controller();
                this.currentViewController = controllerVC;
                def.resolve(controllerVC);
            }.bind(this));
            return def;
        },

        //used to Keep Track of the the links clicked for Histroy API . Need To Figure out the best way
        initAppEvent: function () {

            //Once the Shell has been Instantiate we can then query to find the dom Container
            this.viewControllerDomNode = document.querySelector(".domContainer");

            window.addEventListener("click", function (event) {
                // current browser path with query params
                if(event.which !== 1 && event.target.tagName !== "A") {
                    return;
                }
                var node = event.target,
                    path = window.location.pathname + window.location.search || "";

                //check To See if the Click is an left , anchor click
                history.pushState(null, null, path);
            });

            window.addEventListener("popstate", function (event) {
                console.log(event);
                //back Button Clicked . Restore the Previous State
            });
        },

        initHomepage: function () {
            require(["aboutme/AboutMeController"], function (AboutMeController) {
                var controllerVC = new AboutMeController();
                controllerVC.startup();
                this.viewControllerDomNode.appendChild(controllerVC.domNode);
                history.pushState(null, null, "aboutme");
            }.bind(this));
        },

        setupHistoryClicks: function () {

        },

        //Instantiate a View Controller and Render the DOM Node to the Shell
        instantiateViewAndClass: function () {

        },

        //Destroy the View Controller and Remove the DOM Node from the Shell
        destroyViewAndClass: function () {
            if (this.currentViewController) {
                this.currentViewController.destroyRecursive();
            }
            return;
        }

    });

    return new App();
});