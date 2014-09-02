/*

From your link

history.replaceState() operates exactly like history.pushState() except that replaceState() modifies the current history entry instead of creating a new one.

replaceState() is particularly useful when you want to update the state object or URL of the current history entry in response to some user action.

If you want simply want to update history entry, use replaceState() otherwise use pushState(), which will keep the old entry and create a new one. They're similar but both have different effects so it depends on whether or not you want to replace or create new history entries.

Think of it like I'm dealing out a deck of cards by putting one card on top of the other (face up) and you can only take the top card in the pile (i.e. the last card I dealt). Let's say I put a Jack of Hearts on the pile. Now for the next card if I use replaceState, so I take that Jack of Hearts off and put the next card on. The number of cards is the same since we just replaced the top card. If I had used pushState instead, I would've put the next card on top of the Jack of Hearts (so now both exist in the pile and the pile is one card higher).

Swap the cards in the analogy with URLs and that's how the URL history is modified.
*/

define([
    "dojo/_base/lang",
    "dojo/io-query",
], function(lang, ioquery) {

    /**
     * Router Constructor
     * @param {Object} args Takes and argument that is required to Configure the router.
     */
    var Router = function(args) {

        if (!args) {
            return;
        }

        if (!args.routes) {
            return;
        }

        /**
         * An Object of routes on which the Router will operate. Each Route in routes will be of the format.
         *     Key : {String} -  A String that represents/matches the routes.
         *     Value : {ViewController} -  A View Controller which will be called when the handler matches.
         * @type {Array}
         */
        this.routes = {};

        this.initRoute(args.routes);
    };

    Router.prototype = {

        /**
         * Adds a list of Routes to router by interating over it.
         * @param {Array} routes A list of Array Of Routes Object that needs to be added to the router
         */
        
        initRoute: function(routes) {
            if (!routes) {
                return;
            }

            var index = 0,
                keys = Object.keys(routes),
                key;

            for (index; index < keys.length; index++) {
                key = keys[index];
                this.routes[key] = routes[key];
            }
        },

        getConfig: function(path) {
            var options = {};
            options = {
                path: this._getRouterPath(path),
                params: this._parseQueryParams(path),
                controller: this.getControllerPathFromKey(path)
            };

            return options;
        },

        _parseQueryParams: function(path) {
            var pathParts = path.split("?"),
                query = pathParts[1],
                params;

            params = query ? lang.mixin({}, ioquery.queryToObject(query)) : {};
            return params;
        },

        /**
         * Given a URL like
         *
         *     aboutme?name=Sanyam,
         *
         * returns the part without query param, so that we can use it to match the routers.
         * @private
         * @param  {String} path
         * @return {String} path with query path removed
         */
        _getRouterPath: function(path) {
            var beforePath = "/app/";
            if (path && path.indexOf(beforePath) === 0) {
                path = path.substring(beforePath.length);
            }
            return path.split("?")[0];
        },

        
        /**
         * Given a key get the Controller for the key
         * @param  {String} key The matcher path for which the view controller needs to be found out
         * @return {String}     View Controller for the matched String.
         * @private
         */
        getControllerPathFromKey: function(key) {
            return this.routes[key];
        },


    };

    return Router;
});