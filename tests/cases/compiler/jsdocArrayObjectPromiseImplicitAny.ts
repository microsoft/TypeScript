// @lib: es2015
// @strict: true
// @noImplicitAny: false
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @fileName: jsdocArrayObjectPromiseImplicitAny.js
/** @type {Array} */
var anyArray = [5];

/** @type {Array<number>} */
var numberArray = [5];

/**
 * @param {Array} arr
 * @return {Array}
 */
function returnAnyArray(arr) {
  return arr;
}

/** @type {Promise} */
var anyPromise = Promise.resolve(5);

/** @type {Promise<number>} */
var numberPromise = Promise.resolve(5);

/**
 * @param {Promise} pr
 * @return {Promise}
 */
function returnAnyPromise(pr) {
  return pr;
}

/** @type {Object} */
var anyObject = {valueOf: 1}; // not an error since assigning to any.

/** @type {Object<string, number>} */
var paramedObject = {valueOf: 1};

/**
 * @param {Object} obj
 * @return {Object}
 */
function returnAnyObject(obj) {
  return obj;
}
