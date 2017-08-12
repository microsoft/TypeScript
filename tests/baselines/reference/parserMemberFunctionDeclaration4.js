//// [parserMemberFunctionDeclaration4.ts]
class C {
    export Foo() { }
}

//// [parserMemberFunctionDeclaration4.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.Foo = function () { };
    return C;
}());
