//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForAwaitOf.2.ts] ////

//// [awaitUsingDeclarationsInForAwaitOf.2.ts]
// https://github.com/microsoft/TypeScript/issues/55555

async function test() {
  for await (await using of of of) {};
}


//// [awaitUsingDeclarationsInForAwaitOf.2.js]
async function test() {
    for await (await using of of of) { }
    ;
}
