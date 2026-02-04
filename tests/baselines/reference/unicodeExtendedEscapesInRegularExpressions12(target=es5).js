//// [tests/cases/conformance/es6/unicodeExtendedEscapes/unicodeExtendedEscapesInRegularExpressions12.ts] ////

//// [unicodeExtendedEscapesInRegularExpressions12.ts]
var x = /\u{FFFFFFFF}/gu;


//// [unicodeExtendedEscapesInRegularExpressions12.js]
"use strict";
var x = /\u{FFFFFFFF}/gu;
