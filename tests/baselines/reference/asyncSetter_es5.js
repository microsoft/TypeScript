//// [asyncSetter_es5.ts]
class C {
  async set foo(value) {
  }
}

//// [asyncSetter_es5.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "foo", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
