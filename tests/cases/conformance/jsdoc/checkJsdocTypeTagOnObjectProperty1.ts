// @allowJS: true
// @suppressOutputPathCheck: true
// @strictNullChecks: true

// @filename: 0.js
// @ts-check
var lol = "hello Lol"
const obj = {
  /** @type {string|undefined} */
  foo: undefined,
  /** @type {string|undefined} */
  bar: "42",
  /** @type {function(number): number} */
  method1(n1) {
      return n1 + 42;
  },
  /** @type {string} */
  lol,
  /** @type {number} */
  ['b' + 'ar1']: 42,
  /** @type {function(number): number} */
  arrowFunc: (num) => num + 42
}
obj.foo = 'string'
obj.lol
obj.bar = undefined;
var k = obj.method1(0);
obj.bar1 = "42";
obj.arrowFunc(0);