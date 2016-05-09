//// [objectSpreadElement.ts]
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let addAfter = { ...o, c: false }
let addBefore = { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore = { b: 'ignored', ...o }
let override = { ...o, b: 'override' }
let nested = { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined = { ...o, ...o2 }
let combinedBefore = { b: 'ok', ...o, ...o2 }
let combinedMid = { ...o, b: 'ok', ...o2 }
let combinedAfter = { ...o, ...o2, b: 'ok' }
let combinedNested = {
    ...{ a: 1, ...{ b: false, c: 'overriden' } },
    d: 'actually new',
    ...{ a: 2, d: 'maybe new' },
}
// TODO: Test of own properties (used) versus prototype properties (unused)


//// [objectSpreadElement.js]
var o = { a: 1, b: 'no' };
var o2 = { b: 'yes', c: true };
var addAfter = { , c: false };
var addBefore = { c: false,  };
// Note: ignore still changes the order that properties are printed
var ignore = { b: 'ignored',  };
var override = { , b: 'override' };
var nested = { , c: 'whatever' };
var combined = { ,  };
var combinedBefore = { b: 'ok', ,  };
var combinedMid = { , b: 'ok',  };
var combinedAfter = { , , b: 'ok' };
var combinedNested = {
    ,
    d: 'actually new',
};
// TODO: Test of own properties (used) versus prototype properties (unused)
