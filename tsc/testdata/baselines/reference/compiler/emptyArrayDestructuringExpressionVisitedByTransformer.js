//// [tests/cases/compiler/emptyArrayDestructuringExpressionVisitedByTransformer.ts] ////

//// [emptyArrayDestructuringExpressionVisitedByTransformer.ts]
var a = [] = [1].map(_ => _);
var b = [1].map(_ => _);

//// [emptyArrayDestructuringExpressionVisitedByTransformer.js]
"use strict";
var a = [] = [1].map(_ => _);
var b = [1].map(_ => _);
