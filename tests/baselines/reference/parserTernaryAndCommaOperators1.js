//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parserTernaryAndCommaOperators1.ts] ////

//// [parserTernaryAndCommaOperators1.ts]
b.src ? 1 : 2, c && d;


//// [parserTernaryAndCommaOperators1.js]
"use strict";
b.src ? 1 : 2, c && d;
