// @allowJS: true
// @suppressOutputPathCheck: true
// @strictNullChecks: true

// @filename: 0.js
// @ts-check
const obj = {
  /** @type {string|undefined} */
  foo: undefined,
  /** @type {string|undefined} */
  bar: 42,
  /** @type {function(number): number} */
  method1(n1) {
      return (n1 + 42).toString()
  },
  /** @type {string} */
  lol
}
var lol = "string"
obj.foo = 5
