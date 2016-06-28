//// [parserMemberAccessorDeclaration5.ts]
class C {
  set "a"(i) { }
}

//// [parserMemberAccessorDeclaration5.js]
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
