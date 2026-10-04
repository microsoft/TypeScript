//// [tests/cases/compiler/objectLiteralMemberWithModifiers2.ts] ////

//// [objectLiteralMemberWithModifiers2.ts]
var v = { public get foo() { } }

//// [objectLiteralMemberWithModifiers2.js]
"use strict";
var v = { get foo() { } };
