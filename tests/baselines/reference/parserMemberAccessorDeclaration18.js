//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration18.ts] ////

//// [parserMemberAccessorDeclaration18.ts]
class C {
   set Foo(...a) { }
}

//// [parserMemberAccessorDeclaration18.js]
class C {
    set Foo(...a) { }
}
