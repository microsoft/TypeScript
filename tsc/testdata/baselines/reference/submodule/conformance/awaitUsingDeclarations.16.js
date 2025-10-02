//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.16.ts] ////

//// [awaitUsingDeclarations.16.ts]
declare namespace N {
    await using x: { [Symbol.asyncDispose](): Promise<void> };
    await using y: null;
}
declare module 'M' {
    await using x: { [Symbol.asyncDispose](): Promise<void> };
    await using y: null;
}


//// [awaitUsingDeclarations.16.js]
