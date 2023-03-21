//// [functionsMissingReturnStatementsAndExpressionsStrictNullChecks.ts]
function f1(): undefined | number {
    // Okay; return type allows implicit return of undefined
}

function f2(): number {
    // Error; return type does not include undefined
}

async function f3(): Promise<undefined | number> {
    // Okay; return type allows implicit return of undefined
}

async function f4(): Promise<number> {
    // Error; return type does not include undefined
}


//// [functionsMissingReturnStatementsAndExpressionsStrictNullChecks.js]
function f1() {
    // Okay; return type allows implicit return of undefined
}
function f2() {
    // Error; return type does not include undefined
}
async function f3() {
    // Okay; return type allows implicit return of undefined
}
async function f4() {
    // Error; return type does not include undefined
}
