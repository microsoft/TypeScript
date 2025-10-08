//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInTemplates09.ts] ////

//// [unicodeExtendedEscapesInTemplates09.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (10000 == 65536)
var x = `\u{10000}`;


//// [unicodeExtendedEscapesInTemplates09.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (10000 == 65536)
var x = "\uD800\uDC00";
