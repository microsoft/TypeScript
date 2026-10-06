//// [tests/cases/compiler/flakyDiagnostic2356.ts] ////

//// [flakyDiagnostic2356.ts]
declare let text: string;
export enum Values {
    [(text++).valueOf] = 1,
}


//// [flakyDiagnostic2356.js]
export var Values;
(function (Values) {
    Values[Values[(text++).valueOf] = 1] = (text++).valueOf;
})(Values || (Values = {}));


//// [flakyDiagnostic2356.d.ts]
export declare enum Values {
    [(text++).valueOf] = 1
}
