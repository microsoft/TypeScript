//// [tests/cases/compiler/missingModuleInEnumComputedNameNoFlake.ts] ////

//// [missingModuleInEnumComputedNameNoFlake.ts]
// TS2307: Cannot find module 'missing' or its corresponding type declarations.
export enum Values {
    [import("missing").value] = 1,
}

//// [missingModuleInEnumComputedNameNoFlake.js]
// TS2307: Cannot find module 'missing' or its corresponding type declarations.
export var Values;
(function (Values) {
    Values[Values[import("missing").value] = 1] = import("missing").value;
})(Values || (Values = {}));


//// [missingModuleInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [import("missing").value] = 1
}
