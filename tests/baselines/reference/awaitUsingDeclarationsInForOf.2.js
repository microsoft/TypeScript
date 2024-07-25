//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForOf.2.ts] ////

//// [awaitUsingDeclarationsInForOf.2.ts]
async function main() {
    for (await using of of []) {
    }
}


//// [awaitUsingDeclarationsInForOf.2.js]
async function main() {
    for (await using of of []) {
    }
}
