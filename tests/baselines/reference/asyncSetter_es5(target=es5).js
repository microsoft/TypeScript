//// [tests/cases/conformance/async/es5/asyncSetter_es5.ts] ////

//// [asyncSetter_es5.ts]
class C {
  async set foo(value) {
  }
}

//// [asyncSetter_es5.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
