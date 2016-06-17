// @allowJs: true
// @filename: moduleisconstructor.js
// @out: dummy113.js
/**
 * Describe the module here.
 * @module mymodule/config
 */

/**
 * Create a new configuration.
 *
 * @classdesc Describe the class here.
 * @class
 * @alias module:mymodule/config
 * @param {string} id
 */
function Config(id) {
   /** Document me. */
   this.id = id;
}

/**
 * Get the configuration ID.
 *
 * @return {string} The configuration ID.
 */
Config.prototype.getId = function() {
    return this.id;
}

module.exports = Config;
