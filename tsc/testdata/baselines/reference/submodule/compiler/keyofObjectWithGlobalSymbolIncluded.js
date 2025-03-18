//// [tests/cases/compiler/keyofObjectWithGlobalSymbolIncluded.ts] ////

//// [keyofObjectWithGlobalSymbolIncluded.ts]
const obj = {
    [Symbol.species]: Array
};

type Q = keyof typeof obj;


//// [keyofObjectWithGlobalSymbolIncluded.js]
const obj = {
    [Symbol.species]: Array
};
