//// [parserMemberAccessorDeclaration8.ts]
class C {
    static static get Foo() { }
}

//// [parserMemberAccessorDeclaration8.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C, "Foo", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
