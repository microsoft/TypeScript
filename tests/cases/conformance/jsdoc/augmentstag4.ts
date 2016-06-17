// @allowJs: true
// @filename: augmentstag4.js
// @out: dummy19.js
// used to test jsdoc/augments module directly

/**
 * @constructor
 * @classdesc Base class
 */
var Base = function() {
    /** member */
    this.test1 = "base";
    /** another member */
    this.test2 = null;
    /**
     * explicitly named member
     * @function Base#test3
     */
    this.test3 = function() {};
};

/**
 * @constructor
 * @extends Base
 * @classdesc Extension of Base
 */
var Derived = function() {
    this.test1 = "derived";
};
