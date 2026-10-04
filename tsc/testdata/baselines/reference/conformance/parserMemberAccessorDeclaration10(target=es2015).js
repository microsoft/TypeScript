//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration10.ts] ////

//// [parserMemberAccessorDeclaration10.ts]
class C {
    export get Foo() { }
}

//// [parserMemberAccessorDeclaration10.js]
"use strict";
class C {
    export get Foo() { }
}
