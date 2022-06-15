//// [parserArrowFunctionExpression11.ts]
a ? b ? c : (d) : e => f


//// [parserArrowFunctionExpression11.js]
a ? b ? c : function (d) { return f; }
    :
;
