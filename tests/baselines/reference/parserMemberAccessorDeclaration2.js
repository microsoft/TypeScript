//// [parserMemberAccessorDeclaration2.ts]
class C {
  get "b"() { }
}

//// [parserMemberAccessorDeclaration2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "b", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
