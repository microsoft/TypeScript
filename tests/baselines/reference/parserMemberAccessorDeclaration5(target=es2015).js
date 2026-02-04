//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration5.ts] ////

//// [parserMemberAccessorDeclaration5.ts]
class C {
  set "a"(i) { }
}

//// [parserMemberAccessorDeclaration5.js]
class C {
    set "a"(i) { }
}
