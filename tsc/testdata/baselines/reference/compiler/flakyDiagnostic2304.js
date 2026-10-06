//// [tests/cases/compiler/flakyDiagnostic2304.ts] ////

//// [flakyDiagnostic2304.ts]
export enum Values {
    [missing.value] = 1,
}

//// [flakyDiagnostic2304.js]
export var Values;
(function (Values) {
    Values[Values[missing.value] = 1] = missing.value;
})(Values || (Values = {}));


//// [flakyDiagnostic2304.d.ts]
export declare enum Values {
    [missing.value] = 1
}
