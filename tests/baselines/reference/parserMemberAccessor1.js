//// [parserMemberAccessor1.ts]
class C {
  get foo() { }
  set foo(a) { }
}

//// [parserMemberAccessor1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "foo", {
        get: function () { },
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
