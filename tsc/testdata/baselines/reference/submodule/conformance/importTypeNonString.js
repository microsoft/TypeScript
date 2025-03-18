//// [tests/cases/conformance/types/import/importTypeNonString.ts] ////

//// [importTypeNonString.ts]
export const x: import({x: 12}) = undefined as any;


//// [importTypeNonString.js]
export const x = undefined;
