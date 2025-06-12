//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration16.ts] ////

//// [parserMemberAccessorDeclaration16.ts]
class C {
   set Foo(a = 1) { }
}

//// [parserMemberAccessorDeclaration16.js]
class C {
    set Foo(a = 1) { }
}
