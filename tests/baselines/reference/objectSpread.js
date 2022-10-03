//// [objectSpread.ts]
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let swap = { a: 'yes', b: -1 };

let addAfter: { a: number, b: string, c: boolean } =
    { ...o, c: false }
let addBefore: { a: number, b: string, c: boolean } =
    { c: false, ...o }
let override: { a: number, b: string } =
    { ...o, b: 'override' }
let nested: { a: number, b: boolean, c: string } =
    { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined: { a: number, b: string, c: boolean } =
    { ...o, ...o2 }
let combinedAfter: { a: number, b: string, c: boolean } =
    { ...o, ...o2, b: 'ok' }
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
    let computedAfter: { a: number, b: string, "at the end": number } =
        { ...o, b: 'yeah', ['at the end']: 14 }
}
// shortcut syntax
let a = 12;
let shortCutted: { a: number, b: string } = { ...o, a }
// non primitive
let spreadNonPrimitive = { ...<object>{}};

// generic spreads

function f<T, U>(t: T, u: U) {
    return { ...t, ...u, id: 'id' };
}

let exclusive: { id: string, a: number, b: string, c: string, d: boolean } =
    f({ a: 1, b: 'yes' }, { c: 'no', d: false })
let overlap: { id: string, a: number, b: string } =
    f({ a: 1 }, { a: 2, b: 'extra' })
let overlapConflict: { id:string, a: string } =
    f({ a: 1 }, { a: 'mismatch' })
let overwriteId: { id: string, a: number, c: number, d: string } =
    f({ a: 1, id: true }, { c: 1, d: 'no' })

function genericSpread<T, U>(t: T, u: U, v: T | U, w: T | { s: string }, obj: { x: number }) {
    let x01 = { ...t };
    let x02 = { ...t, ...t };
    let x03 = { ...t, ...u };
    let x04 = { ...u, ...t };
    let x05 = { a: 5, b: 'hi', ...t };
    let x06 = { ...t, a: 5, b: 'hi' };
    let x07 = { a: 5, b: 'hi', ...t, c: true, ...obj };
    let x09 = { a: 5, ...t, b: 'hi', c: true, ...obj };
    let x10 = { a: 5, ...t, b: 'hi', ...u, ...obj };
    let x11 = { ...v };
    let x12 = { ...v, ...obj };
    let x13 = { ...w };
    let x14 = { ...w, ...obj };
    let x15 = { ...t, ...v };
    let x16 = { ...t, ...w };
    let x17 = { ...t, ...w, ...obj };
    let x18 = { ...t, ...v, ...w };
}


//// [objectSpread.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var o = { a: 1, b: 'no' };
var o2 = { b: 'yes', c: true };
var swap = { a: 'yes', b: -1 };
var addAfter = __assign(__assign({}, o), { c: false });
var addBefore = __assign({ c: false }, o);
var override = __assign(__assign({}, o), { b: 'override' });
var nested = __assign(__assign({}, __assign({ a: 3 }, { b: false, c: 'overriden' })), { c: 'whatever' });
var combined = __assign(__assign({}, o), o2);
var combinedAfter = __assign(__assign(__assign({}, o), o2), { b: 'ok' });
var combinedNestedChangeType = __assign(__assign({}, __assign({ a: 1 }, { b: false, c: 'overriden' })), { c: -1 });
var propertyNested = { a: __assign({}, o) };
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
var op = { get a() { return 6; } };
var getter = __assign(__assign({}, op), { c: 7 });
getter.a = 12;
// functions result in { }
var spreadFunc = __assign({}, (function () { }));
function from16326(header, authToken) {
    return __assign(__assign(__assign({}, this.header), header), authToken && { authToken: authToken });
}
// boolean && T results in Partial<T>
function conditionalSpreadBoolean(b) {
    var o = { x: 12, y: 13 };
    o = __assign(__assign({}, o), b && { x: 14 });
    var o2 = __assign({}, b && { x: 21 });
    return o;
}
function conditionalSpreadNumber(nt) {
    var o = { x: 15, y: 16 };
    o = __assign(__assign({}, o), nt && { x: nt });
    var o2 = __assign({}, nt && { x: nt });
    return o;
}
function conditionalSpreadString(st) {
    var o = { x: 'hi', y: 17 };
    o = __assign(__assign({}, o), st && { x: st });
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
var cplus = __assign(__assign({}, c), { plus: function () { return this.p + 1; } });
cplus.plus();
// new field's type conflicting with existing field is OK
var changeTypeAfter = __assign(__assign({}, o), { a: 'wrong type?' });
var changeTypeBoth = __assign(__assign({}, o), swap);
// optional
function container(definiteBoolean, definiteString, optionalString, optionalNumber) {
    var _a, _b;
    var optionalUnionStops = __assign(__assign(__assign({}, definiteBoolean), definiteString), optionalNumber);
    var optionalUnionDuplicates = __assign(__assign(__assign(__assign({}, definiteBoolean), definiteString), optionalString), optionalNumber);
    var allOptional = __assign(__assign({}, optionalString), optionalNumber);
    // computed property
    var computedFirst = __assign(__assign((_a = {}, _a['before everything'] = 12, _a), o), { b: 'yes' });
    var computedAfter = __assign(__assign({}, o), (_b = { b: 'yeah' }, _b['at the end'] = 14, _b));
}
// shortcut syntax
var a = 12;
var shortCutted = __assign(__assign({}, o), { a: a });
// non primitive
var spreadNonPrimitive = __assign({}, {});
// generic spreads
function f(t, u) {
    return __assign(__assign(__assign({}, t), u), { id: 'id' });
}
var exclusive = f({ a: 1, b: 'yes' }, { c: 'no', d: false });
var overlap = f({ a: 1 }, { a: 2, b: 'extra' });
var overlapConflict = f({ a: 1 }, { a: 'mismatch' });
var overwriteId = f({ a: 1, id: true }, { c: 1, d: 'no' });
function genericSpread(t, u, v, w, obj) {
    var x01 = __assign({}, t);
    var x02 = __assign(__assign({}, t), t);
    var x03 = __assign(__assign({}, t), u);
    var x04 = __assign(__assign({}, u), t);
    var x05 = __assign({ a: 5, b: 'hi' }, t);
    var x06 = __assign(__assign({}, t), { a: 5, b: 'hi' });
    var x07 = __assign(__assign(__assign({ a: 5, b: 'hi' }, t), { c: true }), obj);
    var x09 = __assign(__assign(__assign({ a: 5 }, t), { b: 'hi', c: true }), obj);
    var x10 = __assign(__assign(__assign(__assign({ a: 5 }, t), { b: 'hi' }), u), obj);
    var x11 = __assign({}, v);
    var x12 = __assign(__assign({}, v), obj);
    var x13 = __assign({}, w);
    var x14 = __assign(__assign({}, w), obj);
    var x15 = __assign(__assign({}, t), v);
    var x16 = __assign(__assign({}, t), w);
    var x17 = __assign(__assign(__assign({}, t), w), obj);
    var x18 = __assign(__assign(__assign({}, t), v), w);
}
