//// [parserMemberFunctionDeclaration3.ts]
class C {
    static public Foo() { }
}

//// [parserMemberFunctionDeclaration3.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.Foo = function () { };
    return C;
}());
