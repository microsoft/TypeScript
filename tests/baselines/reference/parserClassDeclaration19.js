//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration19.ts] ////

//// [parserClassDeclaration19.ts]
class C {
    foo();
    "foo"() { }
}

//// [parserClassDeclaration19.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["foo"] = function () { };
    return C;
}());
