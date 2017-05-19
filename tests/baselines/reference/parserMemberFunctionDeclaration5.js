//// [parserMemberFunctionDeclaration5.ts]
class C {
    declare Foo() { }
}

//// [parserMemberFunctionDeclaration5.js]
var C = (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
