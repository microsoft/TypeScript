//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration8.ts] ////

//// [parserMemberAccessorDeclaration8.ts]
class C {
    static static get Foo() { }
}

//// [parserMemberAccessorDeclaration8.js]
class C {
    static static;
    get Foo() { }
}
