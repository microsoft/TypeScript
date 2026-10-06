//// [tests/cases/compiler/flakyDiagnostic6385.ts] ////

//// [flakyDiagnostic6385.ts]
/** @deprecated */
declare const oldValue: { value: number };
export enum Values {
    [oldValue.value] = 1,
}

//// [flakyDiagnostic6385.js]
export var Values;
(function (Values) {
    Values[Values[oldValue.value] = 1] = oldValue.value;
})(Values || (Values = {}));


//// [flakyDiagnostic6385.d.ts]
export declare enum Values {
    [oldValue.value] = 1
}
