//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit10.ts] ////

//// [symbolDeclarationEmit10.ts]
var obj = {
    get [Symbol.isConcatSpreadable]() { return '' },
    set [Symbol.isConcatSpreadable](x) { }
}

//// [symbolDeclarationEmit10.js]
var obj = {
    get [Symbol.isConcatSpreadable]() { return ''; },
    set [Symbol.isConcatSpreadable](x) { }
};


//// [symbolDeclarationEmit10.d.ts]
declare var obj: {
    [Symbol.isConcatSpreadable]: string;
};
