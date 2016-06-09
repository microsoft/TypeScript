/**
 * Module dependencies.
 */

var Base = require('mocha').reporters.Base;

/**
 * Expose `None`.
 */

exports = module.exports = None;

/**
 * Initialize a new `None` test reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function None(runner) {
  Base.call(this);
}

/**
 * Inherit from `Base.prototype`.
 */
None.prototype.__proto__ = Base.prototype;
