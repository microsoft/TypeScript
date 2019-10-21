//// [parserMemberAccessor1.ts]
class C {
  get foo() { }
  set foo(a) { }
}

//// [parserMemberAccessor1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () { },
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
