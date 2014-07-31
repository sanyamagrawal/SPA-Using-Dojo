define([
    "dojo/_base/declare"
], function(declare) {

    var Parent1,
        Parent2,
        Parent3;

    Parent1 = declare(null, {

        constructor: function() {
            console.debug("Parent 1 Constructor");
        },

        module: function() {
            console.log("Parent 1 Module");
            this.inherited(arguments);
        }
    });

    Parent2 = declare(null, {

        constructor: function() {
          console.debug("Parent 2 Constructor");
        },

        module: function() {
          console.log("Parent 2 Module");
          this.inherited(arguments);
        }
    });

    Parent3 = declare(null, {

        constructor: function() {
            console.debug("Parent 3 Constructor");
        },

        module: function() {
            console.log("Parent 3 Module");
            this.inherited(arguments);
        },
    });

    return declare([Parent1, Parent2, Parent3], {

        constructor: function() {
            console.debug("Instance Constructor");
        },

        module: function() {
          console.log("Instance Module");
          this.inherited(arguments);
        }
    });

});