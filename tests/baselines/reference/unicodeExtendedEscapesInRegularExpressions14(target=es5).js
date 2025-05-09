//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInRegularExpressions14.ts] ////

//// [unicodeExtendedEscapesInRegularExpressions14.ts]
// Shouldn't work, negatives are not allowed.
var x = /\u{-DDDD}/gu;


//// [unicodeExtendedEscapesInRegularExpressions14.js]
// Shouldn't work, negatives are not allowed.
var x = /\u{-DDDD}/gu;
