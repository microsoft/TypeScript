// @allowJs: true
// @filename: enumtag2.js
// @out: dummy49.js
/** @module my/enums */

/**
 * Enum for quad-state values.
 * @enum {number}
 * @memberof module:my/enums
 */
var QuadState = exports.QuadState = {
    /** true */
    TRUE: 1,
    FALSE: -1,
    MAYBE: 0,
    UNKNOWN: -99
};

/**
 * Enum for penta-state values.
 * @enum {number}
 */
exports.PentaState =
/**
 * Enum for penta-state values, BUT SHOUTIER.
 * @enum {number}
 */
exports.PENTASTATE = {
    /** true */
    TRUE: 1,
    FALSE: -1,
    MAYBE: 0,
    UNKNOWN: -99,
    DONTCARE: 99
};
