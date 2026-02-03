//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration7.ts] ////

//// [parserMemberAccessorDeclaration7.ts]
class C {
    public public get Foo() { }
}

//// [parserMemberAccessorDeclaration7.js]
class C {
    get Foo() { }
}
