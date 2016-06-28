//// [parserMemberAccessorDeclaration13.ts]
class C {
   set Foo() { }
}

//// [parserMemberAccessorDeclaration13.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
