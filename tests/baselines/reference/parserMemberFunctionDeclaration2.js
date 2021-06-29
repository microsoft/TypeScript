//// [parserMemberFunctionDeclaration2.ts]
class C {
    static static Foo() { }
}

//// [parserMemberFunctionDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
