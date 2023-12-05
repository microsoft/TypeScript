//// [tests/cases/compiler/noMappedGetSet.ts] ////

//// [noMappedGetSet.ts]
type OH_NO = {
    get [K in WAT](): string
};


//// [noMappedGetSet.js]
