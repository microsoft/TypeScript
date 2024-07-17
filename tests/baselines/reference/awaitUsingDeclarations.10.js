//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.10.ts] ////

//// [awaitUsingDeclarations.10.ts]
export {};

declare var x: any;
async function f() {
    if (x) await using a = null;
}

//// [awaitUsingDeclarations.10.js]
async function f() {
    if (x)
        await using a = null;
}
export {};
