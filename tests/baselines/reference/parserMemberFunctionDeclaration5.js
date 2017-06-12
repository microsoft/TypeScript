//// [parserMemberFunctionDeclaration5.ts]
class C {
    declare Foo() { }
}

//// [parserMemberFunctionDeclaration5.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.Foo = function () { };
    return C;
}());
