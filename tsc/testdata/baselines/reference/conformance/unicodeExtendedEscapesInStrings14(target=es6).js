//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInStrings14.ts] ////

//// [unicodeExtendedEscapesInStrings14.ts]
// Shouldn't work, negatives are not allowed.
var x = "\u{-DDDD}";


//// [unicodeExtendedEscapesInStrings14.js]
"use strict";
// Shouldn't work, negatives are not allowed.
var x = "\u{-DDDD}";
