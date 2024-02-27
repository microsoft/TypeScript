//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates15.ts] ////

//// [unicodeExtendedEscapesInTemplates15.ts]
var x = `\u{abcd}\u{ef12}\u{3456}\u{7890}`;


//// [unicodeExtendedEscapesInTemplates15.js]
var x = "\uABCD\uEF12\u3456\u7890";
