//// [symbolDeclarationEmit6.ts]
interface I {
    [Symbol.isConcatSpreadable]: string;
}

//// [symbolDeclarationEmit6.js]


//// [symbolDeclarationEmit6.d.ts]
interface I {
    [Symbol.isConcatSpreadable]: string;
}
