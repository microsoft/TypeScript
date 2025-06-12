//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration4.ts] ////

//// [parserClassDeclaration4.ts]
class C extends A implements B extends C {
}

//// [parserClassDeclaration4.js]
class C extends A extends C {
}
