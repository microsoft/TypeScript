//// [parserMemberFunctionDeclaration4.ts]
class C {
    export Foo() { }
}

//// [parserMemberFunctionDeclaration4.js]
var C = (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
