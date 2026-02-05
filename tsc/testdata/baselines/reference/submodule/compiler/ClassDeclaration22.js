//// [tests/cases/compiler/ClassDeclaration22.ts] ////

//// [ClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [ClassDeclaration22.js]
"use strict";
class C {
    "bar"() { }
}
