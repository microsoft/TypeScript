//// [parserArrowFunctionExpression8.ts]
x ? x => ({ x }) : x => ({ x })


//// [parserArrowFunctionExpression8.js]
x ? function (x) { return function (_a) {
    var x = _a.x;
    return ({ x: x });
}; }
    :
;
