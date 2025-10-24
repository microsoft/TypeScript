//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForAwaitOf.3.ts] ////

//// [awaitUsingDeclarationsInForAwaitOf.3.ts]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357

declare const x: any[]

for await (await using of x);

export async function test() {
  for await (await using of x);
}


//// [awaitUsingDeclarationsInForAwaitOf.3.js]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357
for await (await using  of x)
    ;
export async function test() {
    for await (await using  of x)
        ;
}
