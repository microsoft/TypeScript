//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration1.ts] ////

//// [parserMemberFunctionDeclaration1.ts]
class C {
    public public Foo() { }
}

//// [parserMemberFunctionDeclaration1.js]
class C {
    Foo() { }
}
