//// [tests/cases/compiler/flakyDiagnostic2552.ts] ////

//// [flakyDiagnostic2552.ts]
declare const existingValue: { value: number };
export enum Values {
    [existingVale.value] = 1,
}

//// [flakyDiagnostic2552.js]
export var Values;
(function (Values) {
    Values[Values[existingVale.value] = 1] = existingVale.value;
})(Values || (Values = {}));


//// [flakyDiagnostic2552.d.ts]
export declare enum Values {
    [existingVale.value] = 1
}
