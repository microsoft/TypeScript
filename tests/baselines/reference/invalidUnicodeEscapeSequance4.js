//// [invalidUnicodeEscapeSequance4.ts]
var a\u0031; // a1 is a valid identifier
var \u0031a; // 1a is an invalid identifier

//// [invalidUnicodeEscapeSequance4.js]
var a\u0031; // a1 is a valid identifier
var u0031a; // 1a is an invalid identifier
