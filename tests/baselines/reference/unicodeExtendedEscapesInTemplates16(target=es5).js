//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates16.ts] ////

//// [unicodeExtendedEscapesInTemplates16.ts]
var x = `\u{ABCD}\u{EF12}\u{3456}\u{7890}`;


//// [unicodeExtendedEscapesInTemplates16.js]
var x = "\uABCD\uEF12\u3456\u7890";
