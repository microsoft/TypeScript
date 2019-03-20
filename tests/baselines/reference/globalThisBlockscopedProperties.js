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
globalThis.Float64Array
globalThis.Infinity


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
globalThis.Float64Array;
globalThis.Infinity;
