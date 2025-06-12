//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration14.ts] ////

//// [parserMemberAccessorDeclaration14.ts]
class C {
   set Foo(a: number, b: number) { }
}

//// [parserMemberAccessorDeclaration14.js]
class C {
    set Foo(a, b) { }
}
