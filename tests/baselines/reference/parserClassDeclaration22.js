//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration22.ts] ////

//// [parserClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [parserClassDeclaration22.js]
class C {
    "bar"() { }
}
