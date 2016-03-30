//// [parserMemberAccessorDeclaration17.ts]
class C {
   set Foo(a?: number) { }
}

//// [parserMemberAccessorDeclaration17.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
