//// [objectSpread.ts]
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let swap = { a: 'yes', b: -1 };

let addAfter: { a: number, b: string, c: boolean } =
    { ...o, c: false }
let addBefore: { a: number, b: string, c: boolean } =
    { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore: { a: number, b: string } =
    { b: 'ignored', ...o }
let override: { a: number, b: string } =
    { ...o, b: 'override' }
let nested: { a: number, b: boolean, c: string } =
    { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined: { a: number, b: string, c: boolean } =
    { ...o, ...o2 }
let combinedBefore: { a: number, b: string, c: boolean } =
    { b: 'ok', ...o, ...o2 }
let combinedMid: { a: number, b: string, c: boolean } =
    { ...o, b: 'ok', ...o2 }
let combinedAfter: { a: number, b: string, c: boolean } =
    { ...o, ...o2, b: 'ok' }
let combinedNested: { a: number, b: boolean, c: string, d: string } =
    { ...{ a: 4, ...{ b: false, c: 'overriden' } }, d: 'actually new', ...{ a: 5, d: 'maybe new' } }
let combinedNestedChangeType: { a: number, b: boolean, c: number } =
    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
let propertyNested: { a: { a: number, b: string } } =
    { a: { ... o } }
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
let op = { get a () { return 6 } };
let getter: { a: number, c: number } =
    { ...op, c: 7 }
getter.a = 12;

// functions result in { }
let spreadFunc = { ...(function () { }) };

type Header = { head: string, body: string, authToken: string }
function from16326(this: { header: Header }, header: Header, authToken: string): Header {
    return {
        ...this.header,
        ...header,
        ...authToken && { authToken }
    }
}
// boolean && T results in Partial<T>
function conditionalSpreadBoolean(b: boolean) : { x: number, y: number } {
    let o = { x: 12, y: 13 }
    o = {
        ...o,
        ...b && { x: 14 }
    }
    let o2 = { ...b && { x: 21 }}
    return o;
}
function conditionalSpreadNumber(nt: number): { x: number, y: number } {
    let o = { x: 15, y: 16 }
    o = {
        ...o,
        ...nt && { x: nt }
    }
    let o2 = { ...nt && { x: nt }}
    return o;
}
function conditionalSpreadString(st: string): { x: string, y: number } {
    let o = { x: 'hi', y: 17 }
    o = {
        ...o,
        ...st && { x: st }
    }
    let o2 = { ...st && { x: st }}
    return o;
}

// any results in any
let anything: any;
let spreadAny = { ...anything };

// methods are not enumerable
class C { p = 1; m() { } }
let c: C = new C()
let spreadC: { p: number } = { ...c }

// own methods are enumerable
let cplus: { p: number, plus(): void } = { ...c, plus() { return this.p + 1; } };
cplus.plus();

// new field's type conflicting with existing field is OK
let changeTypeAfter: { a: string, b: string } =
    { ...o, a: 'wrong type?' }
let changeTypeBefore: { a: number, b: string } =
    { a: 'wrong type?', ...o };
let changeTypeBoth: { a: string, b: number } =
    { ...o, ...swap };

// optional
function container(
    definiteBoolean: { sn: boolean },
    definiteString: { sn: string },
    optionalString: { sn?: string },
    optionalNumber: { sn?: number }) {
    let optionalUnionStops: { sn: string | number | boolean } = { ...definiteBoolean, ...definiteString, ...optionalNumber };
    let optionalUnionDuplicates: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...optionalString, ...optionalNumber };
    let allOptional: { sn?: string | number } = { ...optionalString, ...optionalNumber };

    // computed property
    let computedFirst: { a: number, b: string, "before everything": number } =
        { ['before everything']: 12, ...o, b: 'yes' }
    let computedMiddle: { a: number, b: string, c: boolean, "in the middle": number } =
        { ...o, ['in the middle']: 13, b: 'maybe?', ...o2 }
    let computedAfter: { a: number, b: string, "at the end": number } =
        { ...o, b: 'yeah', ['at the end']: 14 }
}
// shortcut syntax
let a = 12;
let shortCutted: { a: number, b: string } = { ...o, a }
// non primitive
let spreadNonPrimitive = { ...<object>{}};


//// [objectSpread.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var o = { a: 1, b: 'no' };
var o2 = { b: 'yes', c: true };
var swap = { a: 'yes', b: -1 };
var addAfter = __assign({}, o, { c: false });
var addBefore = __assign({ c: false }, o);
// Note: ignore still changes the order that properties are printed
var ignore = __assign({ b: 'ignored' }, o);
var override = __assign({}, o, { b: 'override' });
var nested = __assign({}, __assign({ a: 3 }, { b: false, c: 'overriden' }), { c: 'whatever' });
var combined = __assign({}, o, o2);
var combinedBefore = __assign({ b: 'ok' }, o, o2);
var combinedMid = __assign({}, o, { b: 'ok' }, o2);
var combinedAfter = __assign({}, o, o2, { b: 'ok' });
var combinedNested = __assign({}, __assign({ a: 4 }, { b: false, c: 'overriden' }), { d: 'actually new' }, { a: 5, d: 'maybe new' });
var combinedNestedChangeType = __assign({}, __assign({ a: 1 }, { b: false, c: 'overriden' }), { c: -1 });
var propertyNested = { a: __assign({}, o) };
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
var op = { get a() { return 6; } };
var getter = __assign({}, op, { c: 7 });
getter.a = 12;
// functions result in { }
var spreadFunc = __assign({}, (function () { }));
function from16326(header, authToken) {
    return __assign({}, this.header, header, authToken && { authToken: authToken });
}
// boolean && T results in Partial<T>
function conditionalSpreadBoolean(b) {
    var o = { x: 12, y: 13 };
    o = __assign({}, o, b && { x: 14 });
    var o2 = __assign({}, b && { x: 21 });
    return o;
}
function conditionalSpreadNumber(nt) {
    var o = { x: 15, y: 16 };
    o = __assign({}, o, nt && { x: nt });
    var o2 = __assign({}, nt && { x: nt });
    return o;
}
function conditionalSpreadString(st) {
    var o = { x: 'hi', y: 17 };
    o = __assign({}, o, st && { x: st });
    var o2 = __assign({}, st && { x: st });
    return o;
}
// any results in any
var anything;
var spreadAny = __assign({}, anything);
// methods are not enumerable
var C = /** @class */ (function () {
    function C() {
        this.p = 1;
    }
    C.prototype.m = function () { };
    return C;
}());
var c = new C();
var spreadC = __assign({}, c);
// own methods are enumerable
var cplus = __assign({}, c, { plus: function () { return this.p + 1; } });
cplus.plus();
// new field's type conflicting with existing field is OK
var changeTypeAfter = __assign({}, o, { a: 'wrong type?' });
var changeTypeBefore = __assign({ a: 'wrong type?' }, o);
var changeTypeBoth = __assign({}, o, swap);
// optional
function container(definiteBoolean, definiteString, optionalString, optionalNumber) {
    var _a, _b, _c;
    var optionalUnionStops = __assign({}, definiteBoolean, definiteString, optionalNumber);
    var optionalUnionDuplicates = __assign({}, definiteBoolean, definiteString, optionalString, optionalNumber);
    var allOptional = __assign({}, optionalString, optionalNumber);
    // computed property
    var computedFirst = __assign((_a = {}, _a['before everything'] = 12, _a), o, { b: 'yes' });
    var computedMiddle = __assign({}, o, (_b = {}, _b['in the middle'] = 13, _b.b = 'maybe?', _b), o2);
    var computedAfter = __assign({}, o, (_c = { b: 'yeah' }, _c['at the end'] = 14, _c));
}
// shortcut syntax
var a = 12;
var shortCutted = __assign({}, o, { a: a });
// non primitive
var spreadNonPrimitive = __assign({}, {});
