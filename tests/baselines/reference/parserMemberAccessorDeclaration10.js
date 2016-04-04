//// [parserMemberAccessorDeclaration10.ts]
class C {
    export get Foo() { }
}

//// [parserMemberAccessorDeclaration10.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
