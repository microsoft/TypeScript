// @allowJS: true
// @suppressOutputPathCheck: true

// @filename: 0.js
// @ts-check
/** @type {*} */
var anyT = 2;

/** @type {?} */
var anyT1 = 2;
anyT1 = "hi";

/** @type {Function} */
const x = (a) => a + 1;
x(1);

/** @type {function} */
const y = (a) => a + 1;
x(1);

/** @type {function (number)} */
const x1 = (a) => a + 1;
x1(0);

/** @type {function (number): number} */
const x2 = (a) => a + 1;
x2(0);