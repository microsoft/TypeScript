//// [unicodeExtendedEscapesInRegularExpressions08_ES5.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (FFFF == 65535)
var x = /\u{FFFF}/g;


//// [unicodeExtendedEscapesInRegularExpressions08_ES5.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. If cp ≤ 65535, return cp.
// (FFFF == 65535)
var x = /\u{FFFF}/g;
