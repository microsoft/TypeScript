//// [tests/cases/conformance/parser/ecmascript5/ConstructorDeclarations/parserConstructorDeclaration1.ts] ////

//// [parserConstructorDeclaration1.ts]
class C {
 public constructor() { }
}

//// [parserConstructorDeclaration1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
