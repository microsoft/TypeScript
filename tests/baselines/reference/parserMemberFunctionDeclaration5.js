//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration5.ts] ////

//// [parserMemberFunctionDeclaration5.ts]
class C {
    declare Foo() { }
}

//// [parserMemberFunctionDeclaration5.js]
class C {
    Foo() { }
}
