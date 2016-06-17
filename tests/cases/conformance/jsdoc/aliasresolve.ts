// @allowJs: true
// @filename: aliasresolve.js
// @out: dummy8.js
/**
 * @namespace
 */
var A = {};

(function(ns) {
    /**
     * @namespace
     * @alias A.F
     */
    var f = {};

    /**
     * @return {String}
     */
    f.method = function(){};

    ns.F = f;
})(A);