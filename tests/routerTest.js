define([
    'intern!object',
    'intern/chai!assert',
    'app/base/Router'
], function(registerSuite, assert, Router) {

    var router;

    registerSuite({
        name: "Router Test's",

        "Test For Router Constructor": {

            "Router Called With No Argument Passed": function() {
                router = new Router();
                assert.typeOf(router.routes, 'undefined', "When Routes Object is not Send as a parameter the routes property should be undefined");
            },

            "Router Called With Routes Argument Not Passed": function() {
                router = new Router({
                    "scope": "this"
                });
                assert.typeOf(router.routes, 'undefined');
            },

            "Router Call With No Routes": function() {
                var routes = {};

                router = new Router({
                    routes: routes
                });

                assert.strictEqual(router.routes.length, 0, "When Noting Is Passed Routes length Should be 0");
            },

            "Test For Router Constructor With 1 Route Passed": function() {
                var routes = {
                        "Test1": "Controller"
                    },
                    keys;

                router = new Router({
                    routes: routes
                });

                keys = Object.keys(router.routes);
                assert.strictEqual(keys.length, 1, "When Noting Is Passed Routes length Should be 1");
            }
        },

        "Test For Adding Routes/initRoute": {
            "init Method Without arguments": function() {
                var routes = {},
                    keys;

                router = new Router({
                    routes: routes
                });

                routes = {
                    "name": "place"
                };

                router.initRoute(routes);
                keys = Object.keys(router.routes);
                assert.strictEqual(keys.length, 1, "When Noting Is Passed Routes length Should be 1");

            }
        }

    });
});