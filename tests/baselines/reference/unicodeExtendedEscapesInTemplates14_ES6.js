//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates14_ES6.ts] ////

//// [unicodeExtendedEscapesInTemplates14_ES6.ts]
// Shouldn't work, negatives are not allowed.
var x = `\u{-DDDD}`;


//// [unicodeExtendedEscapesInTemplates14_ES6.js]
// Shouldn't work, negatives are not allowed.
var x = `\u{-DDDD}`;
