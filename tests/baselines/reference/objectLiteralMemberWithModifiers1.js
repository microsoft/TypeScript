//// [tests/cases/compiler/objectLiteralMemberWithModifiers1.ts] ////

//// [objectLiteralMemberWithModifiers1.ts]
var v = { public foo() { } }

//// [objectLiteralMemberWithModifiers1.js]
var v = { foo: function () { } };
