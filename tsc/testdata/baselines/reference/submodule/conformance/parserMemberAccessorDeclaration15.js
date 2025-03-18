//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration15.ts] ////

//// [parserMemberAccessorDeclaration15.ts]
class C {
   set Foo(public a: number) { }
}

//// [parserMemberAccessorDeclaration15.js]
class C {
    set Foo(a) { }
}
