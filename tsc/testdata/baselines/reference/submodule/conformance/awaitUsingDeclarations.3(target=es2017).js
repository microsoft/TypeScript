//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.3.ts] ////

//// [awaitUsingDeclarations.3.ts]
{
    await using d1 = { async [Symbol.asyncDispose]() {} },
                d2 = null,
                d3 = undefined,
                d4 = { [Symbol.dispose]() {} };
}

export {};

//// [awaitUsingDeclarations.3.js]
{
    await using d1 = { async [Symbol.asyncDispose]() { } }, d2 = null, d3 = undefined, d4 = { [Symbol.dispose]() { } };
}
export {};
