define([
    "dojo/_base/declare",
    "dojo/when",
    "dojo/Deferred",
    "./Router",
    "./RouterConfig"
], function(declare, when, Deferred, Router, routerConfig) {


    var App = declare(null, {

        //Location Where App will get attached
        appContainer: null,

        //Which Controller is currently being shown in the View.
        // Type Parent Controller
        currentViewController: null,

        //Which Path (URL) is currently being rendered in UI
        currentViewPath: null,

        //HTML Element that will hold the DOM Node genereated from the Contollers
        viewControllerDomNode: null,

        //The First Page to Show to the User. Either Take it from param or from defaultPath
        defaultPath: "aboutme",

        /*Since we are destroying our page when the user navigates. We need a way to re-create the previous page.
        so we need to store the states in an array and use it as a means to move backwards
        */
        histroyStack: [],

        /**
         * Instance of router . This will be responsible for app level routing and history management
         * @param {Array} An array of routes on which the router will operate on. See Router.js to know more about the structure of each route
         */
        router: null,

        constructor: function(args) {
            console.log("Reached Constructor");
            this.appContainer = (args && args.rootNode) || document.body;
            this.router = new Router(routerConfig);
        },

        //App Initialization To Being Here.
        initialize: function() {
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");

            //initialize The Navigation Bar
            when(this.initializeShell(), function(vc) {
                this.appContainer.appendChild(vc.domNode);
                this.initAppEvent();
                this.navigateToRoute("aboutme");
            }.bind(this));
        },

        initializeShell: function() {
            var def = new Deferred(),
                controllerVC;
            require(["shell/ShellController"], function(Controller) {
                controllerVC = new Controller();
                def.resolve(controllerVC);
            }.bind(this));
            return def;
        },

        //used to Keep Track of the the links clicked for Histroy API . Need To Figure out the best way
        initAppEvent: function() {

            //Once the Shell has been Instantiate we can then query to find the dom Container
            this.viewControllerDomNode = document.querySelector(".domContainer");

            window.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                // current browser path with query params
                if (event.which !== 1 && event.target.tagName !== "A") {
                    return;
                }
                var path = event.target.pathname + event.target.search || "";
                this.navigateToRoute(path);

                return false;
            }.bind(this));

            window.addEventListener("popstate", function(event) {
                console.log(event);
                //back Button Clicked . Restore the Previous State
            });
        },

        navigateToRoute: function(path) {
            var options = this.router.getConfig(path);
            this.instantiateClass(options);
        },

        //Responsible for getting The view Controller, Instantiating the View Controller and saving it in Histroy API
        instantiateClass: function(options) {
            var pathKey = options.path,
                params = options.params,
                controllerPath;

            this.destroyViewAndClass();
            controllerPath = this.router.getControllerPathFromKey(pathKey);
            when(this.instantiateViewAndClass(controllerPath, params), this.setupHistory.bind(this, pathKey));
        },



        //Instantiate a View Controller and Render the DOM Node to the Shell
        instantiateViewAndClass: function(controllerPath, options) {
            require([controllerPath], function(Controller) {
                var controllerVC = new Controller(options);
                controllerVC.startup();
                this.currentViewController = controllerVC;
                this.viewControllerDomNode.appendChild(controllerVC.domNode);
            }.bind(this));
        },

        //Setup HTML5 histroy related stuff
        setupHistory: function(pathKey) {
            this.currentViewPath = pathKey;
            history.pushState(null, null, "/app/" + this.currentViewPath);
        },

        //Destroy the View Controller and Remove the DOM Node from the Shell
        destroyViewAndClass: function() {
            if (this.currentViewController) {
                this.currentViewController.destroyRecursive();
            }
            this.currentViewController = null;
            return;
        }

    });

    return new App();
});