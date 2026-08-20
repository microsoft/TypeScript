//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression15.ts] ////

//// [fileJs.js]
false ? (param): string => param : null // Not legal JS; "Unexpected token ':'" at last colon

//// [fileTs.ts]
false ? (param): string => param : null


//// [fileJs.js]
"use strict";
false ? (param) => param : null; // Not legal JS; "Unexpected token ':'" at last colon
//// [fileTs.js]
"use strict";
false ? (param) => param : null;
