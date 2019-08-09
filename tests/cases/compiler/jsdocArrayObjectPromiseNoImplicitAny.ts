// @lib: es2015
// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @fileName: jsdocArrayObjectPromiseNoImplicitAny.js
/** @type {Array} */
var notAnyArray = [5];

/** @type {Array<number>} */
var numberArray = [5];

/**
 * @param {Array} arr
 * @return {Array}
 */
function returnNotAnyArray(arr) {
  return arr;
}

/** @type {Promise} */
var notAnyPromise = Promise.resolve(5);

/** @type {Promise<number>} */
var numberPromise = Promise.resolve(5);

/**
 * @param {Promise} pr
 * @return {Promise}
 */
function returnNotAnyPromise(pr) {
  return pr;
}

/** @type {Object} */
var notAnyObject = {valueOf: 1}; // error since assigning to Object, not any.

/** @type {Object<string, number>} */
var paramedObject = {valueOf: 1};

/**
 * @param {Object} obj
 * @return {Object}
 */
function returnNotAnyObject(obj) {
  return obj;
}
