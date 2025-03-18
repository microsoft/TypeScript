//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration12.ts] ////

//// [parserMemberAccessorDeclaration12.ts]
class C {
   get Foo(a: number) { }
}

//// [parserMemberAccessorDeclaration12.js]
class C {
    get Foo(a) { }
}
