//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression6.ts] ////

//// [parserArrowFunctionExpression6.ts]
function foo(q: string, b: number) {
    return true ? (q ? true : false) : (b = q.length, function() { });
};


//// [parserArrowFunctionExpression6.js]
function foo(q, b) {
    return true ? (q ? true : false) : (b = q.length, function () { });
}
;
