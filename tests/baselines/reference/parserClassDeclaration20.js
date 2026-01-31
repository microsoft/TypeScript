//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration20.ts] ////

//// [parserClassDeclaration20.ts]
class C {
    0();
    "0"() { }
}

//// [parserClassDeclaration20.js]
class C {
    "0"() { }
}
