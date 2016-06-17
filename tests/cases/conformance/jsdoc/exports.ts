// @allowJs: true
// @filename: exports.js
// @out: dummy57.js
/**
 * An example of a server-side JavaScript module.
 * @module hello/world
 * @example
 *    var g = require('hello/world').sayHello('Gracie');
 */

/**
 * Generate a greeting.
 * @param {string} [subject="world"] To whom we say hello.
 * @returns {string}
 */
exports.sayHello = function(subject) {
    return 'Hello ' + (subject || 'World');
};

/**
 * Generate a morose farewell.
 * @param {string} [subject="world"] To whom we say goodbye.
 * @returns {string}
 */
module.exports.sayGoodbye = function(subject) {
    return 'Goodbye Cruel ' + (subject || 'World');
};
