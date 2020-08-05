// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @noEmit: true
// @filename: tripleSlash.js

/// @type {number} - TODO this is still skipped for some reason
var x;

/// Adds one
/// @param {number} n - this is a long,
/// multiline comment
///
/// @return {number}
function add1(n) {
    return n + 1
}

// Should be the same

/**  Adds one
 * @param {number} n - this is a long,
 * multiline comment
 *
 * @return {number}
*/
function add2(n) {
    return n + 1
}

/// I documented this const
const documented = ""


