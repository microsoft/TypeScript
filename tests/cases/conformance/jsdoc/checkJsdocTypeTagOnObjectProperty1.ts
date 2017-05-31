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
  bar: 42,
  /** @type {function(number): number} */
  method1(n1) {
      return n1 + 42;
  },
  /** @type {string} */
  lol
}
obj.foo = 'string'
obj.foo;
obj.lol
obj.bar = undefined;
var k = obj.method1(0);