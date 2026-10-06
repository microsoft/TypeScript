//// [tests/cases/compiler/flakyDiagnostic1038.ts] ////

//// [flakyDiagnostic1038.ts]
export enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1,
}

//// [flakyDiagnostic1038.js]
export var Values;
(function (Values) {
    Values[Values[(function () {
    }).name] = 1] = (function () {
    }).name;
})(Values || (Values = {}));


//// [flakyDiagnostic1038.d.ts]
export declare enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1
}
