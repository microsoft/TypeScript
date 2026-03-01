//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.17.ts] ////

//// [awaitUsingDeclarations.17.ts]
switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() {} };
        break;

    case 1:
        await using d21 = { async [Symbol.asyncDispose]() {} };
        break;

    default:
        await using d22 = { async [Symbol.asyncDispose]() {} };
}

if (true)
    switch (0) {
        case 0:
            await using d23 = { async [Symbol.asyncDispose]() {} };
            break;

        default:
            await using d24 = { async [Symbol.asyncDispose]() {} };
    }

export {};


//// [awaitUsingDeclarations.17.js]
switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() { } };
        break;
    case 1:
        await using d21 = { async [Symbol.asyncDispose]() { } };
        break;
    default:
        await using d22 = { async [Symbol.asyncDispose]() { } };
}
if (true)
    switch (0) {
        case 0:
            await using d23 = { async [Symbol.asyncDispose]() { } };
            break;
        default:
            await using d24 = { async [Symbol.asyncDispose]() { } };
    }
export {};
