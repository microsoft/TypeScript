//// [tests/cases/compiler/misspelledIdentifierInEnumComputedNameNoFlake.ts] ////

//// [misspelledIdentifierInEnumComputedNameNoFlake.ts]
// TS2552: Cannot find name 'existingVale'. Did you mean 'existingValue'?
declare const existingValue: { value: number };
export enum Values {
    [existingVale.value] = 1,
}

//// [misspelledIdentifierInEnumComputedNameNoFlake.js]
export var Values;
(function (Values) {
    Values[Values[existingVale.value] = 1] = existingVale.value;
})(Values || (Values = {}));


//// [misspelledIdentifierInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [existingVale.value] = 1
}
