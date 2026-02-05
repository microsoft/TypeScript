//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression13.ts] ////

//// [fileJs.js]
a ? () => a() : (): any => null; // Not legal JS; "Unexpected token ')'" at last paren

//// [fileTs.ts]
a ? () => a() : (): any => null;


//// [fileJs.js]
"use strict";
a ? () => a() : () => null; // Not legal JS; "Unexpected token ')'" at last paren
//// [fileTs.js]
"use strict";
a ? () => a() : () => null;
