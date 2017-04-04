//// [emitAccessExpressionOfCastedObjectLiteralExpressionES6.ts]
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string })[x];
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string }).x;

//// [emitAccessExpressionOfCastedObjectLiteralExpressionES6.js]
(x) => ({ "1": "one", "2": "two" })[x];
(x) => ({ "1": "one", "2": "two" }).x;
