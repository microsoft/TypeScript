//// [tests/cases/conformance/parser/ecmascript5/RegularExpressions/parserRegularExpression6.ts] ////

//// [parserRegularExpression6.ts]
declare var a;
a /= 1; // parse as infix
a = /=/; // parse as regexp

//// [parserRegularExpression6.js]
"use strict";
a /= 1; // parse as infix
a = /=/; // parse as regexp
