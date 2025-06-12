//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration16.ts] ////

//// [parserClassDeclaration16.ts]
class C {
   foo();
   foo() { }
}

//// [parserClassDeclaration16.js]
class C {
    foo() { }
}
