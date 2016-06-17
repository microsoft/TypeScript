// @allowJs: true
// @filename: exportstag.js
// @out: dummy58.js
define(function () {
   /**
        A module representing a shirt.
        @exports my/shirt
        @version 1.0
     */
    var shirt = {

        /** A property of the module. */
        color: "black",

        /** @constructor */
        Turtleneck: function(size) {
            /** A property of the class. */
            this.size = size;
        }
    };

    return shirt;
});
