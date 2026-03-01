//// [tests/cases/conformance/parser/ecmascript5/ConstructorDeclarations/parserConstructorDeclaration11.ts] ////

//// [parserConstructorDeclaration11.ts]
class C {
  constructor<>() { }
}

//// [parserConstructorDeclaration11.js]
"use strict";
class C {
    constructor() { }
}
