//// [tests/cases/compiler/objectLiteralMemberWithModifiers1.ts] ////

//// [objectLiteralMemberWithModifiers1.ts]
var v = { public foo() { } }

//// [objectLiteralMemberWithModifiers1.js]
"use strict";
var v = { foo() { } };
