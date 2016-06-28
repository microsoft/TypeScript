//// [parserMemberAccessorDeclaration4.ts]
class C {
  set a(i) { }
}

//// [parserMemberAccessorDeclaration4.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "a", {
        set: function (i) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
