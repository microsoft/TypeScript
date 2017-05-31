//// [0.js]
// @ts-check
var lol;
const obj = {
  /** @type {string|undefined} */
  bar: 42,
  /** @type {function(number): number} */
  method1(n1) {
      return "42";
  },
  /** @type {function(number): number} */
  method2: (n1) => "lol",
  /** @type {string} */
  lol
}
lol = "string"
/** @type {string} */
var s = obj.method1(0);

//// [0.js]
// @ts-check
var lol;
var obj = {
    /** @type {string|undefined} */
    bar: 42,
    /** @type {function(number): number} */
    method1: function (n1) {
        return "42";
    },
    /** @type {function(number): number} */
    method2: function (n1) { return "lol"; },
    /** @type {string} */
    lol: lol
};
lol = "string";
/** @type {string} */
var s = obj.method1(0);
