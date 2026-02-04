//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression5.ts] ////

//// [parserArrowFunctionExpression5.ts]
(bar(x,
    () => {},
    () => {}
  )
)


//// [parserArrowFunctionExpression5.js]
"use strict";
(bar(x, () => { }, () => { }));
