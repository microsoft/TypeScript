// @allowJs: true
// @filename: alias.js
// @out: dummy2.js
var myObject = (function() {

    /** Give x another name.
        @alias myObject
        @namespace
     */
    var x = {
        /** document me */
        myProperty: 'foo'
    }

    return x;
})();
