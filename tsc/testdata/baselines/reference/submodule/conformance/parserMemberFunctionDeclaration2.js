//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration2.ts] ////

//// [parserMemberFunctionDeclaration2.ts]
class C {
    static static Foo() { }
}

//// [parserMemberFunctionDeclaration2.js]
class C {
    static static;
    Foo() { }
}
