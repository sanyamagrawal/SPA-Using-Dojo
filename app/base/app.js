define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dojo/Deferred",
    "dojo/io-query",

    "./RouterConfig",
], function(declare, lang, when, Deferred, ioquery, router) {


    var App = declare(null, {

        //Location Where App will get attached
        appContainer: document.body,

        //Which Controller is currently being shown in the View.
        // Type Parent Controller
        currentViewController: null,

        //Which Path (URL) is currently being rendered in UI
        currentViewPath: null,

        //HTML Element that will hold the DOM Node genereated from the Contollers
        viewControllerDomNode: null,

        //The First Page to Show to the User. Either Take it from param or from defaultPath
        defaultPath: "aboutme",

        constructor: function() {
            console.log("Reached Constructor");
        },

        //App Initialization To Being Here.
        initialize: function() {
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");

            //initialize The Navigation Bar
            when(this.initializeShell(), function(vc) {
                this.appContainer.appendChild(vc.domNode);
                this.initAppEvent();
                this.instantiateClass("aboutme");
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

            //Once the Shell has been Instantiate we can then query to find the dom Container
            this.viewControllerDomNode = document.querySelector(".domContainer");

            window.addEventListener("click", function(event) {
                // current browser path with query params
                if (event.which !== 1 && event.target.tagName !== "A") {
                    return;
                }
                var path = window.location.pathname + window.location.search || "";
                this.clickRoute(path);

            }.bind(this));

            window.addEventListener("popstate", function(event) {
                console.log(event);
                //back Button Clicked . Restore the Previous State
            });
        },

        //When the use clicks on a A tag then we need to route to that page
        // Here we need to make path params as object and extract parts of the URL
        clickRoute: function(path) {

            var pathWithParam,
                beforePath = "/app/",
                pathKey,
                pathParams,
                params;

            if (path && path.indexOf(beforePath) === 0) {
                pathWithParam = path.substring(beforePath.length);
            }

            pathWithParam = pathWithParam.split("?");
            pathKey = pathWithParam[0];
            pathParams = pathWithParam[1];
            params = pathParams ? lang.mixin({}, ioquery.queryToObject(pathParams)) : {};
            this.instantiateClass(pathKey, params);
        },

        //Responsible for getting The view Controller, Instantiating the View Controller and saving it in Histroy API
        instantiateClass: function(pathKey, options) {
            this.destroyViewAndClass();
            var controllerPath = this.getControllerPathFromKey(pathKey);
            when(this.instantiateViewAndClass(controllerPath, options), this.setupHistory.bind(this, pathKey));
        },

        //Given a key get the Controller for the key
        getControllerPathFromKey: function(key) {
            return router.routes[key];
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
            history.pushState(null, null, this.currentViewPath);
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