//// [unicodeExtendedEscapesInRegularExpressions07_ES6.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  1. Assert: 0 ≤ cp ≤ 0x10FFFF.
var x = /\u{110000}/g;


//// [unicodeExtendedEscapesInRegularExpressions07_ES6.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  1. Assert: 0 ≤ cp ≤ 0x10FFFF.
var x = /\u{110000}/g;
