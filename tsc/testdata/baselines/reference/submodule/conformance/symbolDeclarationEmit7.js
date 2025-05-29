//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit7.ts] ////

//// [symbolDeclarationEmit7.ts]
var obj: {
    [Symbol.isConcatSpreadable]: string;
}

//// [symbolDeclarationEmit7.js]
var obj;


//// [symbolDeclarationEmit7.d.ts]
declare var obj: {
    [Symbol.isConcatSpreadable]: string;
};
