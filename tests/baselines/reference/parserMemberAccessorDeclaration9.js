//// [parserMemberAccessorDeclaration9.ts]
class C {
    static public get Foo() { }
}

//// [parserMemberAccessorDeclaration9.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C, "Foo", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
