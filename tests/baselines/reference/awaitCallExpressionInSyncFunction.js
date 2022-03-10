//// [awaitCallExpressionInSyncFunction.ts]
function foo() {
   const foo = await(Promise.resolve(1));
   return foo;
}


//// [awaitCallExpressionInSyncFunction.js]
function foo() {
    const foo = await(Promise.resolve(1));
    return foo;
}
