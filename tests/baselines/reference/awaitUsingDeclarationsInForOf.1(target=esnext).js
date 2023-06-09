//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForOf.1.ts] ////

//// [awaitUsingDeclarationsInForOf.1.ts]
async function main() {
    for (await using d1 of [{ async [Symbol.asyncDispose]() {} }, { [Symbol.dispose]() {} }, null, undefined]) {
    }
}


//// [awaitUsingDeclarationsInForOf.1.js]
async function main() {
    for (await using d1 of [{ async [Symbol.asyncDispose]() { } }, { [Symbol.dispose]() { } }, null, undefined]) {
    }
}
