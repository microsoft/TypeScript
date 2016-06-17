// @allowJs: true
// @filename: memberoftag3.js
// @out: dummy104.js
/** @module terrain
    @example
        var terrain = require('terrain'),
            forest = new terrain.Forest(),
            tree = new forest.Tree();
*/

/** @class */
exports.Forest = function(){}
var Forest = exports.Forest;

/**
    @class
    @memberof module:terrain
*/
Forest.prototype.Tree = function() {
    /** A leaf */
    this.leaf = 1;
}