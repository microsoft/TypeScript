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
let c: C = new C();
let spreadC = {...c};

// computed property
let computedFirst = {
    ['before everything']: 12,
    ...o,
    b: 'yes'
}
let computedMiddle = {
    ...o,
    ['in the middle']: 13,
    b: 'maybe?',
    ...o2
}
let computedAfter = {
    ...o,
    b: 'yeah',
    ['at the end']: 14
}


//// [objectSpreadElement.js]
var o = { a: 1, b: 'no' };
var o2 = { b: 'yes', c: true };
var addAfter = __assign({}, o, {c: false});
var addBefore = __assign({c: false}, o);
// Note: ignore still changes the order that properties are printed
var ignore = __assign({b: 'ignored'}, o);
var override = __assign({}, o, {b: 'override'});
var nested = __assign({}, __assign({a: 3}, { b: false, c: 'overriden' }), {c: 'whatever'});
var combined = __assign({}, o, o2);
var combinedBefore = __assign({b: 'ok'}, o, o2);
var combinedMid = __assign({}, o, {b: 'ok'}, o2);
var combinedAfter = __assign({}, o, o2, {b: 'ok'});
var combinedNested = __assign({}, __assign({a: 4}, { b: false, c: 'overriden' }), {
d: 'actually new'
}, { a: 5, d: 'maybe new' });
// accessors don't copy the descriptor
// (which means that readonly getters become read/write)
var op = { get a() { return 6; } };
var getter = __assign({}, op, {c: 7});
// null and undefined are just skipped
var spreadNull = __assign({}, null);
var spreadUndefined = __assign({}, undefined);
// methods are not enumerable
var C = (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
;
var c = new C();
var spreadC = __assign({}, c);
// computed property
var computedFirst = (_a = {},
    _a['before everything'] = 12,
    Object.assign(_a, o),
    _a.b = 'yes',
    _a
);
var computedMiddle = (_b = __assign({}, o),
    _b['in the middle'] = 13,
    _b.b = 'maybe?',
    Object.assign(_b, o2),
    _b
);
var computedAfter = (_c = __assign({}, o, {
    b: 'yeah'
    }),
    _c['at the end'] = 14,
    _c
);
var _a, _b, _c;
