//// [tests/cases/compiler/objectLiteralMemberWithQuestionMark1.ts] ////

//// [objectLiteralMemberWithQuestionMark1.ts]
var v = { foo?() { } }

//// [objectLiteralMemberWithQuestionMark1.js]
var v = { foo: function () { } };
