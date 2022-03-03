//// [parserMemberAccessorDeclaration3.ts]
class C {
  get 0() { }
}

//// [parserMemberAccessorDeclaration3.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, 0, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
