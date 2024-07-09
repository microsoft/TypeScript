//// [tests/cases/conformance/async/es5/asyncGetter_es5.ts] ////

//// [asyncGetter_es5.ts]
class C {
  async get foo() {
  }
}

//// [asyncGetter_es5.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
