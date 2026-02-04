//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration4.ts] ////

//// [parserMemberAccessorDeclaration4.ts]
class C {
  set a(i) { }
}

//// [parserMemberAccessorDeclaration4.js]
"use strict";
class C {
    set a(i) { }
}
