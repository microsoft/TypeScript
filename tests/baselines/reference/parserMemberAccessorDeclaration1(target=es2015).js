//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration1.ts] ////

//// [parserMemberAccessorDeclaration1.ts]
class C {
  get a() { }
}

//// [parserMemberAccessorDeclaration1.js]
"use strict";
class C {
    get a() { }
}
