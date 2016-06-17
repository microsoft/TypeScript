// @allowJs: true
// @filename: defaulttag.js
// @out: dummy42.js
/**
    @default
 */
var request = null;

/**
    @default
 */
var response = 'ok';

/**
    @default
 */
var rcode = 200;

/**
    @default
 */
var rvalid = true;

/**
    @default
 */
var rerrored = false;

/**
    @default the parent window
 */
var win = getParentWindow();

/**
    @default
 */
var header = getHeaders(request);

/**
    @default
 */
var obj = {valueA: 'a', valueB: false, valueC: 7};

/**
 * @default
 */
var multilineObject = {
    valueA : 'a',
    valueB : false,
    valueC : 7
};

/** @default */
var arr = ['foo', true, 19];

/**
 * @default
 * @type {string}
 */
var defaultWithType = 'a';
