//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration5.ts] ////

//// [parserClassDeclaration5.ts]
class C extends A implements B implements C {
}

//// [parserClassDeclaration5.js]
"use strict";
class C extends A {
}
