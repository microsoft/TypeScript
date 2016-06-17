// @allowJs: true
// @filename: exportstag7.js
// @out: dummy64.js
'use strict';

/** @exports my/shirt */
var myShirt = exports;

/** A property of the module. */
myShirt.color = 'black';

/** @constructor */
myShirt.Turtleneck = function(size) {
    /** A property of the class. */
    this.size = size;
};

/** Iron the turtleneck. */
myShirt.Turtleneck.prototype.iron = function() {};
