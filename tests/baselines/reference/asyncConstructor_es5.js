//// [tests/cases/conformance/async/es5/asyncConstructor_es5.ts] ////

//// [asyncConstructor_es5.ts]
class C {
  async constructor() {
  }
}

//// [asyncConstructor_es5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
