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
        enumerable: true,
        configurable: true
    });
    return C;
}());
