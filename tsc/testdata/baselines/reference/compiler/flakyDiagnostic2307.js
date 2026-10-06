//// [tests/cases/compiler/flakyDiagnostic2307.ts] ////

//// [flakyDiagnostic2307.ts]
export enum Values {
    [import("missing").value] = 1,
}

//// [flakyDiagnostic2307.js]
export var Values;
(function (Values) {
    Values[Values[import("missing").value] = 1] = import("missing").value;
})(Values || (Values = {}));


//// [flakyDiagnostic2307.d.ts]
export declare enum Values {
    [import("missing").value] = 1
}
