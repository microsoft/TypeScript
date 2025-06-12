//// [tests/cases/compiler/ternaryExpressionSourceMap.ts] ////

//// [ternaryExpressionSourceMap.ts]
var x = 1;
var foo = x ? () => 0 : () => 0;

//// [ternaryExpressionSourceMap.js]
var x = 1;
var foo = x ? () => 0 : () => 0;
//# sourceMappingURL=ternaryExpressionSourceMap.js.map