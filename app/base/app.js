define([
    "dojo/_base/declare"
], function(declare) {

    var App = declare(null, {

        constructor : function() {
            console.log("Reached Constructor");
        },

        render: function() {
            console.log("Application Inilization To begin Now!! Fasten Your Seat Belt");
        }

    });

    return new App();
});