//// [tests/cases/conformance/parser/ecmascript5/ConstructorDeclarations/parserConstructorDeclaration6.ts] ////

//// [parserConstructorDeclaration6.ts]
class C {
  public public constructor() { }
}

//// [parserConstructorDeclaration6.js]
class C {
    constructor() { }
}
