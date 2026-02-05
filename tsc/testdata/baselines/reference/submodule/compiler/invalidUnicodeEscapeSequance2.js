//// [tests/cases/compiler/invalidUnicodeEscapeSequance2.ts] ////

//// [invalidUnicodeEscapeSequance2.ts]
var arg\uxxxx

//// [invalidUnicodeEscapeSequance2.js]
"use strict";
var arg, uxxxx;
