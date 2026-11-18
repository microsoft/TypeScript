//// [tests/cases/compiler/redundantDeclareInEnumComputedNameNoFlake.ts] ////

//// [redundantDeclareInEnumComputedNameNoFlake.ts]
// TS1038: A 'declare' modifier cannot be used in an already ambient context.
export enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1,
}

//// [redundantDeclareInEnumComputedNameNoFlake.js]
// TS1038: A 'declare' modifier cannot be used in an already ambient context.
export var Values;
(function (Values) {
    Values[Values[(function () {
    }).name] = 1] = (function () {
    }).name;
})(Values || (Values = {}));


//// [redundantDeclareInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1
}
