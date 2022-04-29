//// [unicodeExtendedEscapesInTemplates11_ES5.ts]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. Let cu2 be ((cp – 65536) modulo 1024) + 0xDC00.
// Although we should just get back a single code point value of 0xDC00,
// this is a useful edge-case test.
var x = `\u{DC00}`;


//// [unicodeExtendedEscapesInTemplates11_ES5.js]
// ES6 Spec - 10.1.1 Static Semantics: UTF16Encoding (cp)
//  2. Let cu2 be ((cp – 65536) modulo 1024) + 0xDC00.
// Although we should just get back a single code point value of 0xDC00,
// this is a useful edge-case test.
var x = "\uDC00";
