//// [emptyArrayDestructuringExpressionVisitedByTransformer.ts]
var a = [] = [1].map(_ => _);
var b = [1].map(_ => _);

//// [emptyArrayDestructuringExpressionVisitedByTransformer.js]
var a = [1].map(function (_) { return _; });
var b = [1].map(function (_) { return _; });
