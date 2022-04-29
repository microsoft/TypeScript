//// [globalThisBlockscopedProperties.ts]
var x = 1
const y = 2
let z = 3
globalThis.x // ok
globalThis.y // should error, no property 'y'
globalThis.z // should error, no property 'z'
globalThis['x'] // ok
globalThis['y'] // should error, no property 'y'
globalThis['z'] // should error, no property 'z'
globalThis.Float64Array // ok
globalThis.Infinity // ok

declare let test1: (typeof globalThis)['x'] // ok
declare let test2: (typeof globalThis)['y'] // error
declare let test3: (typeof globalThis)['z'] // error
declare let themAll: keyof typeof globalThis


//// [globalThisBlockscopedProperties.js]
var x = 1;
var y = 2;
var z = 3;
globalThis.x; // ok
globalThis.y; // should error, no property 'y'
globalThis.z; // should error, no property 'z'
globalThis['x']; // ok
globalThis['y']; // should error, no property 'y'
globalThis['z']; // should error, no property 'z'
globalThis.Float64Array; // ok
globalThis.Infinity; // ok
