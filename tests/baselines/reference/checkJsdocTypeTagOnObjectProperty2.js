//// [tests/cases/conformance/jsdoc/checkJsdocTypeTagOnObjectProperty2.ts] ////

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
  /** @type {function(number): number} */
  arrowFunc: (num="0") => num + 42,
  /** @type {string} */
  lol
}
lol = "string"
/** @type {string} */
var s = obj.method1(0);

/** @type {string} */
var s1 = obj.method2("0");

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
    /** @type {function(number): number} */
    arrowFunc: function (num) {
        if (num === void 0) { num = "0"; }
        return num + 42;
    },
    /** @type {string} */
    lol: lol
};
lol = "string";
/** @type {string} */
var s = obj.method1(0);
/** @type {string} */
var s1 = obj.method2("0");
