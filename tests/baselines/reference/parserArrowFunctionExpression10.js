//// [parserArrowFunctionExpression10.ts]
a ? (b) : c => (d) : e => f


//// [parserArrowFunctionExpression10.js]
a ? function (b) { return function (d) { return f; }; }
    :
;
