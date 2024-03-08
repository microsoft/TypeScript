//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForIn.ts] ////

//// [awaitUsingDeclarationsInForIn.ts]
async function main() {
    for (await using x in {}) {
    }
}


//// [awaitUsingDeclarationsInForIn.js]
async function main() {
    for (await using x in {}) {
    }
}
