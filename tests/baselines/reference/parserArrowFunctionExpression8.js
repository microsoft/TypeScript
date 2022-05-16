//// [parserArrowFunctionExpression8.ts]
x ? y => ({ y }) : z => ({ z })


//// [parserArrowFunctionExpression8.js]
x ? function (y) { return function (_a) {
    var y = _a.y;
    return ({ z: z });
}; }
    :
;
