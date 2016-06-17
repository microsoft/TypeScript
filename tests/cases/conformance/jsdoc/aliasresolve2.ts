// @allowJs: true
// @filename: aliasresolve2.js
// @out: dummy9.js
/**
 * @namespace
 */
var A = {};

/**
 * @namespace
 * @alias A.F
 */
var f = {};

(function(ns) {
    /**
     * @return {String}
     */
    f.method = function(){};

    ns.F = f;
})(A);