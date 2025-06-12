//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration11.ts] ////

//// [parserMemberAccessorDeclaration11.ts]
class C {
    declare get Foo() { }
}

//// [parserMemberAccessorDeclaration11.js]
class C {
    get Foo() { }
}
