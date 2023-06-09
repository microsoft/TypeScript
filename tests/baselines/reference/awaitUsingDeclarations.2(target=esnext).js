//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.2.ts] ////

//// [awaitUsingDeclarations.2.ts]
{
    await using d1 = { async [Symbol.asyncDispose]() {} },
                d2 = { async [Symbol.asyncDispose]() {} };
}

export {};

//// [awaitUsingDeclarations.2.js]
{
    await using d1 = { async [Symbol.asyncDispose]() { } }, d2 = { async [Symbol.asyncDispose]() { } };
}
export {};
