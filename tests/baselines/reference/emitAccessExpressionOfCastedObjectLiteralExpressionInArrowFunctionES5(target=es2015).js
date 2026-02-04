//// [tests/cases/compiler/emitAccessExpressionOfCastedObjectLiteralExpressionInArrowFunctionES5.ts] ////

//// [emitAccessExpressionOfCastedObjectLiteralExpressionInArrowFunctionES5.ts]
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string })[x];
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string }).x;

//// [emitAccessExpressionOfCastedObjectLiteralExpressionInArrowFunctionES5.js]
(x) => ({ "1": "one", "2": "two" }[x]);
(x) => ({ "1": "one", "2": "two" }.x);
