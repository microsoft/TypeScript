//// [tests/cases/conformance/jsdoc/checkJsdocTypeTagOnObjectProperty1.ts] ////

//// [0.js]
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

//// [0.js]
var _a;
// @ts-check
var lol = "hello Lol";
var obj = (_a = {
        /** @type {string|undefined} */
        foo: undefined,
        /** @type {string|undefined} */
        bar: "42",
        /** @type {function(number): number} */
        method1: function (n1) {
            return n1 + 42;
        },
        /** @type {string} */
        lol: lol
    },
    /** @type {number} */
    _a['b' + 'ar1'] = 42,
    /** @type {function(number): number} */
    _a.arrowFunc = function (num) { return num + 42; },
    _a);
obj.foo = 'string';
obj.lol;
obj.bar = undefined;
var k = obj.method1(0);
obj.bar1 = "42";
obj.arrowFunc(0);
