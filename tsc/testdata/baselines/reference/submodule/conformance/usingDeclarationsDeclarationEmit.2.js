//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsDeclarationEmit.2.ts] ////

//// [usingDeclarationsDeclarationEmit.2.ts]
using r1 = { [Symbol.dispose]() {} };
export type R1 = typeof r1;

await using r2 = { async [Symbol.asyncDispose]() {} };
export type R2 = typeof r2;


//// [usingDeclarationsDeclarationEmit.2.js]
using r1 = { [Symbol.dispose]() { } };
await using r2 = { async [Symbol.asyncDispose]() { } };
export {};
