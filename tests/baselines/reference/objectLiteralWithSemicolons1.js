//// [tests/cases/compiler/objectLiteralWithSemicolons1.ts] ////

//// [objectLiteralWithSemicolons1.ts]
var v = { a; b; c }

//// [objectLiteralWithSemicolons1.js]
var v = { a: a, b: b, c: c };
