//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration6.ts] ////

//// [parserMemberAccessorDeclaration6.ts]
class C {
  set 0(i) { }
}

//// [parserMemberAccessorDeclaration6.js]
"use strict";
class C {
    set 0(i) { }
}
