//// [0.js]
// @ts-check
/**
 * @param {number=} n
 * @param {string} [s]
 */
function foo(n, s) {}

foo();
foo(1);
foo(1, "hi");

//// [0.js]
// @ts-check
/**
 * @param {number=} n
 * @param {string} [s]
 */
function foo(n, s) { }
foo();
foo(1);
foo(1, "hi");
