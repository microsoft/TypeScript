//// [parserMemberAccessorDeclaration1.ts]
class C {
  get a() { }
}

//// [parserMemberAccessorDeclaration1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "a", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
