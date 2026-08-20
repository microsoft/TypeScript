//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForOf.5.ts] ////

//// [awaitUsingDeclarationsInForOf.5.ts]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357

declare const x: any[]

for (await using of x);

export async function test() {
  for (await using of x);
}


//// [awaitUsingDeclarationsInForOf.5.js]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357
for (await using  of x)
    ;
export async function test() {
    for (await using  of x)
        ;
}
