//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit8.ts] ////

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
