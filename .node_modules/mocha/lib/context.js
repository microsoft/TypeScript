'use strict';
/**
 * @module Context
 */
/**
 * Expose `Context`.
 */

module.exports = Context;

/**
 * Initialize a new `Context`.
 *
 * @api private
 */
function Context () {}

/**
 * Set or get the context `Runnable` to `runnable`.
 *
 * @api private
 * @param {Runnable} runnable
 * @return {Context} context
 */
Context.prototype.runnable = function (runnable) {
  if (!arguments.length) {
    return this._runnable;
  }
  this.test = this._runnable = runnable;
  return this;
};

/**
 * Set or get test timeout `ms`.
 *
 * @api private
 * @param {number} ms
 * @return {Context} self
 */
Context.prototype.timeout = function (ms) {
  if (!arguments.length) {
    return this.runnable().timeout();
  }
  this.runnable().timeout(ms);
  return this;
};

/**
 * Set test timeout `enabled`.
 *
 * @api private
 * @param {boolean} enabled
 * @return {Context} self
 */
Context.prototype.enableTimeouts = function (enabled) {
  if (!arguments.length) {
    return this.runnable().enableTimeouts();
  }
  this.runnable().enableTimeouts(enabled);
  return this;
};

/**
 * Set or get test slowness threshold `ms`.
 *
 * @api private
 * @param {number} ms
 * @return {Context} self
 */
Context.prototype.slow = function (ms) {
  if (!arguments.length) {
    return this.runnable().slow();
  }
  this.runnable().slow(ms);
  return this;
};

/**
 * Mark a test as skipped.
 *
 * @api private
 * @throws Pending
 */
Context.prototype.skip = function () {
  this.runnable().skip();
};

/**
 * Set or get a number of allowed retries on failed tests
 *
 * @api private
 * @param {number} n
 * @return {Context} self
 */
Context.prototype.retries = function (n) {
  if (!arguments.length) {
    return this.runnable().retries();
  }
  this.runnable().retries(n);
  return this;
};
