//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.16.ts] ////

//// [usingDeclarations.16.ts]
declare namespace N {
    using x: { [Symbol.dispose](): void };
    using y: null;
}
declare module 'M' {
    using x: { [Symbol.dispose](): void };
    using y: null;
}


//// [usingDeclarations.16.js]
