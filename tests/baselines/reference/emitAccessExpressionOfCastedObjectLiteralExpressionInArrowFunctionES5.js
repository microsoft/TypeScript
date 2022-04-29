//// [emitAccessExpressionOfCastedObjectLiteralExpressionInArrowFunctionES5.ts]
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string })[x];
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string }).x;

//// [emitAccessExpressionOfCastedObjectLiteralExpressionInArrowFunctionES5.js]
(function (x) { return ({ "1": "one", "2": "two" }[x]); });
(function (x) { return ({ "1": "one", "2": "two" }.x); });
