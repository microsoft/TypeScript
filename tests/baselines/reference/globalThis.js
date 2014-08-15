//// [globalThis.ts]
var __e = Math.E;  // should not generate 'this.Math.E'

//// [globalThis.js]
var __e = Math.E; // should not generate 'this.Math.E'
