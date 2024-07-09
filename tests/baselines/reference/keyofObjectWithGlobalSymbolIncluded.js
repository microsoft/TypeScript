//// [tests/cases/compiler/keyofObjectWithGlobalSymbolIncluded.ts] ////

//// [keyofObjectWithGlobalSymbolIncluded.ts]
const obj = {
    [Symbol.species]: Array
};

type Q = keyof typeof obj;


//// [keyofObjectWithGlobalSymbolIncluded.js]
"use strict";
const obj = {
    [Symbol.species]: Array
};
