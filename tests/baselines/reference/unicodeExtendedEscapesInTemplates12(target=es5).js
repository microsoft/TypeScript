//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates12.ts] ////

//// [unicodeExtendedEscapesInTemplates12.ts]
var x = `\u{FFFFFFFF}`;


//// [unicodeExtendedEscapesInTemplates12.js]
var x = "\\u{FFFFFFFF}";
