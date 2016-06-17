// @allowJs: true
// @filename: exportstag2.js
// @out: dummy59.js
define(
    ["my/buttons"],
    function () {
       /**
            A module representing a coat.
            @exports my/coat
            @requires my/buttons
            @version 1.0
         */
        var myModule = function(wool) {
            /** document me */
            this.wool = wool;
        }

        return myModule;

    }
);
