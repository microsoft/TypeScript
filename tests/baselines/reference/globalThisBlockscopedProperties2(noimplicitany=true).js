//// [tests/cases/conformance/es2019/globalThisBlockscopedProperties2.ts] ////

//// [globalThisBlockscopedProperties2.ts]
// https://github.com/microsoft/TypeScript/issues/58345

let invalid1 = globalThis.invalid1;
let y = globalThis.invalid1;
let z = globalThis.invalid2;


//// [globalThisBlockscopedProperties2.js]
// https://github.com/microsoft/TypeScript/issues/58345
var invalid1 = globalThis.invalid1;
var y = globalThis.invalid1;
var z = globalThis.invalid2;
