//// [tests/cases/conformance/es6/Symbols/symbolProperty36.ts] ////

//// [symbolProperty36.ts]
var x = {
    [Symbol.isConcatSpreadable]: 0,
    [Symbol.isConcatSpreadable]: 1
}

//// [symbolProperty36.js]
var x = {
    [Symbol.isConcatSpreadable]: 0,
    [Symbol.isConcatSpreadable]: 1
};
