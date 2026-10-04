//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForOf.3.ts] ////

//// [awaitUsingDeclarationsInForOf.3.ts]
async function main() {
    for (await using {} of []) {
    }
}


//// [awaitUsingDeclarationsInForOf.3.js]
"use strict";
async function main() {
    for (await using {} of []) {
    }
}
