//// [tests/cases/conformance/parser/ecmascript5/ConstructorDeclarations/parserConstructorDeclaration3.ts] ////

//// [parserConstructorDeclaration3.ts]
class C {
  export constructor() { }
}

//// [parserConstructorDeclaration3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
