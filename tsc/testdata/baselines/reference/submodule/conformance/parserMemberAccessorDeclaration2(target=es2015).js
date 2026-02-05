//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration2.ts] ////

//// [parserMemberAccessorDeclaration2.ts]
class C {
  get "b"() { }
}

//// [parserMemberAccessorDeclaration2.js]
"use strict";
class C {
    get "b"() { }
}
