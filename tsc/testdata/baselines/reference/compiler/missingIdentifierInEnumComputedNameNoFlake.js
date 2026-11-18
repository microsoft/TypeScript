//// [tests/cases/compiler/missingIdentifierInEnumComputedNameNoFlake.ts] ////

//// [missingIdentifierInEnumComputedNameNoFlake.ts]
// TS2304: Cannot find name 'missing'.
export enum Values {
    [missing.value] = 1,
}

//// [missingIdentifierInEnumComputedNameNoFlake.js]
// TS2304: Cannot find name 'missing'.
export var Values;
(function (Values) {
    Values[Values[missing.value] = 1] = missing.value;
})(Values || (Values = {}));


//// [missingIdentifierInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [missing.value] = 1
}
