//// [tests/cases/compiler/awaitCallExpressionInSyncFunction.ts] ////

//// [awaitCallExpressionInSyncFunction.ts]
function foo() {
   const foo = await(Promise.resolve(1));
   return foo;
}


//// [awaitCallExpressionInSyncFunction.js]
"use strict";
function foo() {
    const foo = await(Promise.resolve(1));
    return foo;
}
