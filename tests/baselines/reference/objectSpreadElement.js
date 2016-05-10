//// [objectSpreadElement.ts]
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let addAfter = { ...o, c: false }
let addBefore = { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore = { b: 'ignored', ...o }
let override = { ...o, b: 'override' }
let nested = { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined = { ...o, ...o2 }
let combinedBefore = { b: 'ok', ...o, ...o2 }
let combinedMid = { ...o, b: 'ok', ...o2 }
let combinedAfter = { ...o, ...o2, b: 'ok' }
let combinedNested = {
    ...{ a: 4, ...{ b: false, c: 'overriden' } },
    d: 'actually new',
    ...{ a: 5, d: 'maybe new' },
}
// accessors don't copy the descriptor
// (which means that readonly getters become read/write)
let op = { get a () { return 6 } };
let getter = { ...op, c: 7 }

// null and undefined are just skipped
let spreadNull = { ...null }
let spreadUndefined = { ...undefined }

// methods are not enumerable
class C { m() { } };
let c: C;
let spreadC = {...c};


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
    ,
};
// accessors don't copy the descriptor
// (which means that readonly getters become read/write)
var op = { get a() { return 6; } };
var getter = { , c: 7 };
// null and undefined are just skipped
var spreadNull = {  };
var spreadUndefined = {  };
// methods are not enumerable
var C = (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
;
var c;
var spreadC = {  };
