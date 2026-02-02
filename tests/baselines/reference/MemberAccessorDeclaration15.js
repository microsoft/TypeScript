//// [tests/cases/compiler/MemberAccessorDeclaration15.ts] ////

//// [MemberAccessorDeclaration15.ts]
class C {
   set Foo(public a: number) { }
}

//// [MemberAccessorDeclaration15.js]
class C {
    set Foo(a) { }
}
