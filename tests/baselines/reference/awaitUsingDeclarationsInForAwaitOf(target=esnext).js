//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForAwaitOf.ts] ////

//// [awaitUsingDeclarationsInForAwaitOf.ts]
async function main() {
    for await (await using d1 of [{ async [Symbol.asyncDispose]() {} }, { [Symbol.dispose]() {} }, null, undefined]) {
    }
}

//// [awaitUsingDeclarationsInForAwaitOf.js]
async function main() {
    for await (await using d1 of [{ async [Symbol.asyncDispose]() { } }, { [Symbol.dispose]() { } }, null, undefined]) {
    }
}
