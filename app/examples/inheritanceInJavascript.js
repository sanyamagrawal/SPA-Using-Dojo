/* Here I am trying to idenitify how Multiple Inheritance Works IN Dojo when we use dojo/_base/declare

At the end of this file you will find out the answer. For more info on what is declare and how it is benefitting DOJO
please read the following document

http://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html
*/

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


/*Findings : In Multiple Inheritance case ,
Parent Constructor are called first and then child constructur ie. From Left To Right

For any other methods the call is form Right to Left , To chain all these , you need to use Inherited(arguments).
Which is respoisble of calling the parent method with the same name.
arguments in a pesdo like array in Javascript which contains all the arguments passed to the method along
with some additional info like caller etc.
*/