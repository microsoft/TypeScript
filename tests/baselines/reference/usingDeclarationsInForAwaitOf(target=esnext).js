//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForAwaitOf.ts] ////

//// [usingDeclarationsInForAwaitOf.ts]
async function main() {
    for await (using d1 of [{ [Symbol.dispose]() {} }, null, undefined]) {
    }
}


//// [usingDeclarationsInForAwaitOf.js]
async function main() {
    for await (using d1 of [{ [Symbol.dispose]() { } }, null, undefined]) {
    }
}
