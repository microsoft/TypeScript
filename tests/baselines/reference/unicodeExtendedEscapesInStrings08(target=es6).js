//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInStrings08.ts] ////

//// [unicodeExtendedEscapesInStrings08.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (FFFF == 65535)
var x = "\u{FFFF}";


//// [unicodeExtendedEscapesInStrings08.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (FFFF == 65535)
var x = "\u{FFFF}";
