//// [tests/cases/compiler/deprecatedReferenceInEnumComputedNameNoFlake.ts] ////

//// [deprecatedReferenceInEnumComputedNameNoFlake.ts]
// TS6385: 'oldValue' is deprecated.
/** @deprecated */
declare const oldValue: { value: number };
export enum Values {
    [oldValue.value] = 1,
}

//// [deprecatedReferenceInEnumComputedNameNoFlake.js]
export var Values;
(function (Values) {
    Values[Values[oldValue.value] = 1] = oldValue.value;
})(Values || (Values = {}));


//// [deprecatedReferenceInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [oldValue.value] = 1
}
