//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates14.ts] ////

//// [unicodeExtendedEscapesInTemplates14.ts]
// Shouldn't work, negatives are not allowed.
var x = `\u{-DDDD}`;


//// [unicodeExtendedEscapesInTemplates14.js]
// Shouldn't work, negatives are not allowed.
var x = `\u{-DDDD}`;
