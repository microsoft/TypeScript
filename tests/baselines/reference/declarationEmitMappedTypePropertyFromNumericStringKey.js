//// [tests/cases/compiler/declarationEmitMappedTypePropertyFromNumericStringKey.ts] ////

//// [declarationEmitMappedTypePropertyFromNumericStringKey.ts]
export const f = (<T>(arg: {[K in keyof T]: T[K] | string}) => arg)({'0': 0}); // Original prop uses string syntax

//// [declarationEmitMappedTypePropertyFromNumericStringKey.js]
export const f = ((arg) => arg)({ '0': 0 }); // Original prop uses string syntax


//// [declarationEmitMappedTypePropertyFromNumericStringKey.d.ts]
export declare const f: {
    '0': string | number;
};
