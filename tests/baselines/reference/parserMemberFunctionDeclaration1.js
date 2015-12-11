//// [parserMemberFunctionDeclaration1.ts]
class C {
    public public Foo() { }
}

//// [parserMemberFunctionDeclaration1.js]
var C = (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
