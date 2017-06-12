//// [asyncGetter_es5.ts]
class C {
  async get foo() {
  }
}

//// [asyncGetter_es5.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "foo", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
