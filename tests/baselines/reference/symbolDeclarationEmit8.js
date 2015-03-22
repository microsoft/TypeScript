//// [symbolDeclarationEmit8.ts]
var obj = {
    [Symbol.isConcatSpreadable]: 0
}

//// [symbolDeclarationEmit8.js]
var obj = {
    [Symbol.isConcatSpreadable]: 0
};


//// [symbolDeclarationEmit8.d.ts]
declare var obj: {
    [Symbol.isConcatSpreadable]: number;
};
