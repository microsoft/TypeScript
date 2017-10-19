//// [0.js]
// @ts-check
/**
 * @param {number=} n
 * @param {string} [s]
 */
var x = function foo(n, s) {}
var y;
/**
 * @param {boolean!} b
 */
y = function bar(b) {}

/**
 * @param {string} s
 */
var one = function (s) { }, two = function (untyped) { };


//// [0.js]
// @ts-check
/**
 * @param {number=} n
 * @param {string} [s]
 */
var x = function foo(n, s) { };
var y;
/**
 * @param {boolean!} b
 */
y = function bar(b) { };
/**
 * @param {string} s
 */
var one = function (s) { }, two = function (untyped) { };
