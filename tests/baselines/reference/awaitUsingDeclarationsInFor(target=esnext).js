//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInFor.ts] ////

//// [awaitUsingDeclarationsInFor.ts]
async function main() {
    for (await using d1 = { [Symbol.dispose]() {} },
                    d2 = { async [Symbol.asyncDispose]() {} },
                    d3 = null,
                    d4 = undefined;;) {
    }
}

//// [awaitUsingDeclarationsInFor.js]
async function main() {
    for (await using d1 = { [Symbol.dispose]() { } }, d2 = { async [Symbol.asyncDispose]() { } }, d3 = null, d4 = undefined;;) {
    }
}
