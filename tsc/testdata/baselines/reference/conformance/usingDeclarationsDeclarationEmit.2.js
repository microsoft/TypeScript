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


//// [usingDeclarationsDeclarationEmit.2.d.ts]
declare const r1: {
    [Symbol.dispose](): void;
};
export type R1 = typeof r1;
declare const r2: {
    [Symbol.asyncDispose](): Promise<void>;
};
export type R2 = typeof r2;
export {};
