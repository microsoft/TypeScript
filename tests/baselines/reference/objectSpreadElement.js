//// [objectSpreadElement.ts]
let o = { a: 1, b: 'no' }
let addAfter = { ...o, c: false }
let addBefore = { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore = { b: 'ignored', ...o }
let override = { ...o, b: 'override' }
let nested = { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
// TODO: Test of own properties (used) versus prototype properties (unused)


//// [objectSpreadElement.js]
var o = { a: 1, b: 'no' };
var addAfter = { , c: false };
var addBefore = { c: false,  };
// Note: ignore still changes the order that properties are printed
var ignore = { b: 'ignored',  };
var override = { , b: 'override' };
var nested = { , c: 'whatever' };
// TODO: Test of own properties (used) versus prototype properties (unused)
