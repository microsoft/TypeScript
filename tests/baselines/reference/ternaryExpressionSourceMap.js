//// [ternaryExpressionSourceMap.ts]
var x = 1;
var foo = x ? () => 0 : () => 0;

//// [ternaryExpressionSourceMap.js]
var x = 1;
var foo = x ? function () { return 0; } : function () { return 0; };
//# sourceMappingURL=ternaryExpressionSourceMap.js.map