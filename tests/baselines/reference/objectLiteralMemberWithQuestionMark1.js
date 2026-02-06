//// [tests/cases/compiler/objectLiteralMemberWithQuestionMark1.ts] ////

//// [objectLiteralMemberWithQuestionMark1.ts]
var v = { foo?() { } }

//// [objectLiteralMemberWithQuestionMark1.js]
"use strict";
var v = { foo() { } };
