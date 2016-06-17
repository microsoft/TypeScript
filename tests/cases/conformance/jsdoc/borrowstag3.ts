// @allowJs: true
// @filename: borrowstag3.js
// @out: dummy25.js
'use strict';

/**
 * Remove whitespace from around a string.
 * @param {string} str
 */
function trstr(str) {}

var _util = {
    /** Hidden utility function. */
    'hidden util': function() {}
};

/**
 * @namespace
 * @borrows trstr as trim string
 * @borrows util.hidden util as hidden
 */
var util = {
    hidden: _util['trim string'],
    'trim string': trstr
};
