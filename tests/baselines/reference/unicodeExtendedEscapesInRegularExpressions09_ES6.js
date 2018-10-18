//// [unicodeExtendedEscapesInRegularExpressions09_ES6.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (10000 == 65536)
var x = /\u{10000}/g;


//// [unicodeExtendedEscapesInRegularExpressions09_ES6.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (10000 == 65536)
var x = /\u{10000}/g;
