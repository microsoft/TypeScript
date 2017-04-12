//// [unicodeExtendedEscapesInRegularExpressions10_ES6.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. Let cu1 be floor((cp – 65536) / 1024) + 0xD800.
// Although we should just get back a single code point value of 0xD800,
// this is a useful edge-case test.
var x = /\u{D800}/g;


//// [unicodeExtendedEscapesInRegularExpressions10_ES6.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. Let cu1 be floor((cp – 65536) / 1024) + 0xD800.
// Although we should just get back a single code point value of 0xD800,
// this is a useful edge-case test.
var x = /\u{D800}/g;
