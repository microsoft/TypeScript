// @allowJs: true
// @filename: moduleinner.js
// @out: dummy112.js
/**
* @module my/module
*/
(function() {

/** document fooIn */
fooIn = function() {
};

/** @namespace */
bar = {
    /** document bar.Zop */
    zop: function() {
    }
}

/** @constructor */
exports.Frotz = function() {
    /** document exports.Frotz#quaz */
    this.quaz = 1;
}

}) ();

/** document fooOut
*/
fooOut = function() {
};
