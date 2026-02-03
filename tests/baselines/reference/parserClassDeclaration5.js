//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration5.ts] ////

//// [parserClassDeclaration5.ts]
class C extends A implements B implements C {
}

//// [parserClassDeclaration5.js]
class C extends A {
}
