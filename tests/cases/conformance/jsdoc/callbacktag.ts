// @allowJs: true
// @filename: callbacktag.js
// @out: dummy26.js
/**
 * @param {requestResponseCallback} cb
 */
function makeSpecialRequest(cb) {
}

/**
 * @param {wrongTypeCallback} cb
 */
function makeExtraSpecialRequest(cb) {
}

/**
 * @callback requestResponseCallback
 * @param {number} responseCode
 * @param {string} responseText
 */

/**
 * @callback {(object|string)} wrongTypeCallback
 */