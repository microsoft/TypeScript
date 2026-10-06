//// [tests/cases/compiler/flakyDiagnostic2695.ts] ////

//// [flakyDiagnostic2695.ts]
export enum Values {
    [(1, 2).valueOf] = 1,
}


//// [flakyDiagnostic2695.js]
export var Values;
(function (Values) {
    Values[Values[(1, 2).valueOf] = 1] = (1, 2).valueOf;
})(Values || (Values = {}));


//// [flakyDiagnostic2695.d.ts]
export declare enum Values {
    [(1, 2).valueOf] = 1
}
