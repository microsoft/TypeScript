//// [parserMemberAccessorDeclaration12.ts]
class C {
   get Foo(a: number) { }
}

//// [parserMemberAccessorDeclaration12.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function (a) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
