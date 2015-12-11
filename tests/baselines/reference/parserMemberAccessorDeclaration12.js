//// [parserMemberAccessorDeclaration12.ts]
class C {
   get Foo(a: number) { }
}

//// [parserMemberAccessorDeclaration12.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
