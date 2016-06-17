// @allowJs: true
// @filename: borrowstag2.js
// @out: dummy24.js
/** @namespace
    @borrows rtrim
*/
var str = {
    rtrim: util.rtrim
};

/** @namespace
    @borrows rtrim
*/
var util = {
    rtrim: rtrim
};

/**
    Remove whitespace from the right side of a string.
    @param {string} str
 */
function rtrim(str) {
}
