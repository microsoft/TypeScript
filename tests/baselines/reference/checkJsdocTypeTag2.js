//// [tests/cases/conformance/jsdoc/checkJsdocTypeTag2.ts] ////

//// [0.js]
// @ts-check
/** @type {String} */
var S = true;

/** @type {number} */
var n = "hello";

/** @type {function (number)} */
const x1 = (a) => a + 1;
x1("string");

/** @type {function (number): number} */
const x2 = (a) => a + 1;

/** @type {string} */
var a;
a = x2(0);

/** @type {function (number): number} */
const x3 = (a) => a.concat("hi");
x3(0);

/** @type {function (number): string} */
const x4 = (a) => a + 1;
x4(0);

//// [0.js]
// @ts-check
/** @type {String} */
var S = true;
/** @type {number} */
var n = "hello";
/** @type {function (number)} */
const x1 = (a) => a + 1;
x1("string");
/** @type {function (number): number} */
const x2 = (a) => a + 1;
/** @type {string} */
var a;
a = x2(0);
/** @type {function (number): number} */
const x3 = (a) => a.concat("hi");
x3(0);
/** @type {function (number): string} */
const x4 = (a) => a + 1;
x4(0);
