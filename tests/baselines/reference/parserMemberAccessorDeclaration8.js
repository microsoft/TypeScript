//// [parserMemberAccessorDeclaration8.ts]
class C {
    static static get Foo() { }
}

//// [parserMemberAccessorDeclaration8.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
