//// [functionsMissingReturnStatementsAndExpressions2.ts]
function f1(): undefined | number {
    // Okay; return type allows implicit return of undefined
}


//// [functionsMissingReturnStatementsAndExpressions2.js]
function f1() {
    // Okay; return type allows implicit return of undefined
}
