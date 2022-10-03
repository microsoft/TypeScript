//// [parserMemberAccessorDeclaration1.ts]
class C {
  get a() { }
}

//// [parserMemberAccessorDeclaration1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "a", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
