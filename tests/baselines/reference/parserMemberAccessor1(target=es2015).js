//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessor1.ts] ////

//// [parserMemberAccessor1.ts]
class C {
  get foo() { }
  set foo(a) { }
}

//// [parserMemberAccessor1.js]
class C {
    get foo() { }
    set foo(a) { }
}
