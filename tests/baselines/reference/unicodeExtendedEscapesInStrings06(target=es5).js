//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInStrings06.ts] ////

//// [unicodeExtendedEscapesInStrings06.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  1. Assert: 0 ≤ cp ≤ 0x10FFFF.
var x = "\u{10FFFF}";


//// [unicodeExtendedEscapesInStrings06.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  1. Assert: 0 ≤ cp ≤ 0x10FFFF.
var x = "\uDBFF\uDFFF";
