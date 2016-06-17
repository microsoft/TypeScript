// @allowJs: true
// @filename: variationtag.js
// @out: dummy180.js
/**
 * @constructor
 */
someObject = function() {}

/**
 * @constructor
 * @variation 2
 */
someObject = function() {}

/**
 * @constructor
 * @variation (3)
 */
someObject = function() {};

/**
 * @memberof someObject(2)
 */
someMethod = function() {}
