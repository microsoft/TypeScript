//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration5.ts] ////

//// [parserMemberFunctionDeclaration5.ts]
class C {
    declare Foo() { }
}

//// [parserMemberFunctionDeclaration5.js]
"use strict";
class C {
    Foo() { }
}
