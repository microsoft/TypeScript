//// [tests/cases/compiler/customLibReplacement.ts] ////

//// [fake-dom.d.ts]
interface ABC {}

//// [index.ts]
/// <reference lib="dom" />
const a: ABC = {}

// This should raise ebcause 'window' is not set in the replacement for DOM
window

//// [index.js]
/// <reference lib="dom" />
var a = {};
// This should raise ebcause 'window' is not set in the replacement for DOM
window;
