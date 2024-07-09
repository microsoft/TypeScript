//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit5.ts] ////

//// [symbolDeclarationEmit5.ts]
interface I {
    [Symbol.isConcatSpreadable](): string;
}

//// [symbolDeclarationEmit5.js]


//// [symbolDeclarationEmit5.d.ts]
interface I {
    [Symbol.isConcatSpreadable](): string;
}
