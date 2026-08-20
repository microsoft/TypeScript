//// [tests/cases/conformance/parser/ecmascript5/ConstructorDeclarations/parserConstructorDeclaration4.ts] ////

//// [parserConstructorDeclaration4.ts]
class C {
  declare constructor() { }
}

//// [parserConstructorDeclaration4.js]
"use strict";
class C {
    constructor() { }
}
