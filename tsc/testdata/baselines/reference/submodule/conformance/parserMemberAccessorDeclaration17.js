//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration17.ts] ////

//// [parserMemberAccessorDeclaration17.ts]
class C {
   set Foo(a?: number) { }
}

//// [parserMemberAccessorDeclaration17.js]
class C {
    set Foo(a) { }
}
