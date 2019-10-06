//// [controlFlowOptionalChain.ts]
// assignments in shortcutting chain
declare const o: undefined | {
    [key: string]: any;
    [key: number]: any;
    (...args: any[]): any;
};

let a: number;
o?.[a = 1];
a.toString();

let b: number;
o?.x[b = 1];
b.toString();

let c: number;
o?.(c = 1)
c.toString();

let d: number;
o?.x(d = 1);
d.toString();

// type predicates
declare const f: undefined | ((x: any) => x is number);
declare const x: string | number;
if (f?.(x)) {
    x; // number
    f; // (x: any) => x is number
    f(x);
}
else {
    x;
    f;
    f(x);
}
x;
f;
f(x);

declare const o2: { f(x: any): x is number; } | undefined;
if (o2?.f(x)) {
    x; // number
    o2.f; // (x: any) => x is number
    o2?.f;
    o2?.f(x);
}
else {
    x;
    o2;
    o2?.f;
    o2.f;
}
x;
o2;
o2?.f;
o2.f;

declare const o3: { x: 1, y: string } | { x: 2, y: number } | undefined;
if (o3?.x === 1) {
    o3;
    o3.x;
    o3?.x;
}
else {
    o3;
    o3?.x;
    o3.x;
}
o3;
o3?.x;
o3.x;

declare const o4: { x?: { y: boolean } };
if (o4.x?.y) {
    o4.x; // { y: boolean }
    o4.x.y; // true
    o4.x?.y; // true
}
else {
    o4.x;
    o4.x?.y;
    o4.x.y;
}
o4.x;
o4.x?.y;
o4.x.y;

declare const o5: { x?: { y: { z?: { w: boolean } } } };
if (o5.x?.y.z?.w) {
    o5.x;
    o5.x.y;
    o5.x.y.z;
    o5.x.y.z.w; // true
    o5.x.y.z?.w; // true
    o5.x?.y.z.w; // true
    o5.x?.y.z?.w; // true
}
else {
    o5.x;
    o5.x?.y;
    o5.x?.y.z;
    o5.x?.y.z?.w;
    o5.x.y;
    o5.x.y.z.w;
}
o5.x;
o5.x?.y;
o5.x?.y.z;
o5.x?.y.z?.w;
o5.x.y;
o5.x.y.z.w;

interface Base {
    f(): this is Derived;
}

interface Derived extends Base {
    x: number;
}

declare const o6: Base | undefined;
if (o6?.f()) {
    o6; // Derived
    o6.f;
}
else {
    o6;
    o6?.f;
    o6.f;
}
o6;
o6?.f;
o6.f;

// asserts
declare const isDefined: <T>(value: T) => asserts value is NonNullable<T>;
declare const isString: (value: unknown) => asserts value is string;
declare const maybeIsString: undefined | ((value: unknown) => asserts value is string);
declare const maybeNever: undefined | (() => never);

function f01(x: unknown) {
    if (!!true) {
        isString?.(x);
        x;
    }
    if (!!true) {
        maybeIsString?.(x);
        x;
    }
    if (!!true) {
        isDefined(maybeIsString);
        maybeIsString?.(x);
        x;
    }
    if (!!true) {
        maybeNever?.();
        x;
    }
}

type Thing = { foo: string | number, bar(): number, baz: object };

function f10(o: Thing | undefined, value: number) {
    if (o?.foo === value) {
        o.foo;
    }
    if (o?.["foo"] === value) {
        o["foo"];
    }
    if (o?.bar() === value) {
        o.bar;
    }
    if (o?.foo == value) {
        o.foo;
    }
    if (o?.["foo"] == value) {
        o["foo"];
    }
    if (o?.bar() == value) {
        o.bar;
    }
}

function f11(o: Thing | null, value: number) {
    if (o?.foo === value) {
        o.foo;
    }
    if (o?.["foo"] === value) {
        o["foo"];
    }
    if (o?.bar() === value) {
        o.bar;
    }
    if (o?.foo == value) {
        o.foo;
    }
    if (o?.["foo"] == value) {
        o["foo"];
    }
    if (o?.bar() == value) {
        o.bar;
    }
}

function f12(o: Thing | undefined, value: number | undefined) {
    if (o?.foo === value) {
        o.foo;  // Error
    }
    if (o?.["foo"] === value) {
        o["foo"];  // Error
    }
    if (o?.bar() === value) {
        o.bar;  // Error
    }
    if (o?.foo == value) {
        o.foo;  // Error
    }
    if (o?.["foo"] == value) {
        o["foo"];  // Error
    }
    if (o?.bar() == value) {
        o.bar;  // Error
    }
}

function f12a(o: Thing | undefined, value: number | null) {
    if (o?.foo === value) {
        o.foo;
    }
    if (o?.["foo"] === value) {
        o["foo"];
    }
    if (o?.bar() === value) {
        o.bar;
    }
    if (o?.foo == value) {
        o.foo;  // Error
    }
    if (o?.["foo"] == value) {
        o["foo"];  // Error
    }
    if (o?.bar() == value) {
        o.bar;  // Error
    }
}

function f13(o: Thing | undefined) {
    if (o?.foo !== undefined) {
        o.foo;
    }
    if (o?.["foo"] !== undefined) {
        o["foo"];
    }
    if (o?.bar() !== undefined) {
        o.bar;
    }
    if (o?.foo != undefined) {
        o.foo;
    }
    if (o?.["foo"] != undefined) {
        o["foo"];
    }
    if (o?.bar() != undefined) {
        o.bar;
    }
}

function f13a(o: Thing | undefined) {
    if (o?.foo !== null) {
        o.foo;  // Error
    }
    if (o?.["foo"] !== null) {
        o["foo"];  // Error
    }
    if (o?.bar() !== null) {
        o.bar;  // Error
    }
    if (o?.foo != null) {
        o.foo;
    }
    if (o?.["foo"] != null) {
        o["foo"];
    }
    if (o?.bar() != null) {
        o.bar;
    }
}

function f14(o: Thing | null) {
    if (o?.foo !== undefined) {
        o.foo;
    }
    if (o?.["foo"] !== undefined) {
        o["foo"];
    }
    if (o?.bar() !== undefined) {
        o.bar;
    }
}

function f20(o: Thing | undefined) {
    if (typeof o?.foo === "number") {
        o.foo;
    }
    if (typeof o?.["foo"] === "number") {
        o["foo"];
    }
    if (typeof o?.bar() === "number") {
        o.bar;
    }
    if (o?.baz instanceof Error) {
        o.baz;
    }
}

function f21(o: Thing | null) {
    if (typeof o?.foo === "number") {
        o.foo;
    }
    if (typeof o?.["foo"] === "number") {
        o["foo"];
    }
    if (typeof o?.bar() === "number") {
        o.bar;
    }
    if (o?.baz instanceof Error) {
        o.baz;
    }
}


//// [controlFlowOptionalChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
var a;
(_a = o) === null || _a === void 0 ? void 0 : _a[a = 1];
a.toString();
var b;
(_b = o) === null || _b === void 0 ? void 0 : _b.x[b = 1];
b.toString();
var c;
(_c = o) === null || _c === void 0 ? void 0 : _c(c = 1);
c.toString();
var d;
(_d = o) === null || _d === void 0 ? void 0 : _d.x(d = 1);
d.toString();
if ((_e = f) === null || _e === void 0 ? void 0 : _e(x)) {
    x; // number
    f; // (x: any) => x is number
    f(x);
}
else {
    x;
    f;
    f(x);
}
x;
f;
f(x);
if ((_f = o2) === null || _f === void 0 ? void 0 : _f.f(x)) {
    x; // number
    o2.f; // (x: any) => x is number
    (_g = o2) === null || _g === void 0 ? void 0 : _g.f;
    (_h = o2) === null || _h === void 0 ? void 0 : _h.f(x);
}
else {
    x;
    o2;
    (_j = o2) === null || _j === void 0 ? void 0 : _j.f;
    o2.f;
}
x;
o2;
(_k = o2) === null || _k === void 0 ? void 0 : _k.f;
o2.f;
if (((_l = o3) === null || _l === void 0 ? void 0 : _l.x) === 1) {
    o3;
    o3.x;
    (_m = o3) === null || _m === void 0 ? void 0 : _m.x;
}
else {
    o3;
    (_o = o3) === null || _o === void 0 ? void 0 : _o.x;
    o3.x;
}
o3;
(_p = o3) === null || _p === void 0 ? void 0 : _p.x;
o3.x;
if ((_q = o4.x) === null || _q === void 0 ? void 0 : _q.y) {
    o4.x; // { y: boolean }
    o4.x.y; // true
    (_r = o4.x) === null || _r === void 0 ? void 0 : _r.y; // true
}
else {
    o4.x;
    (_s = o4.x) === null || _s === void 0 ? void 0 : _s.y;
    o4.x.y;
}
o4.x;
(_t = o4.x) === null || _t === void 0 ? void 0 : _t.y;
o4.x.y;
if ((_v = (_u = o5.x) === null || _u === void 0 ? void 0 : _u.y.z) === null || _v === void 0 ? void 0 : _v.w) {
    o5.x;
    o5.x.y;
    o5.x.y.z;
    o5.x.y.z.w; // true
    (_w = o5.x.y.z) === null || _w === void 0 ? void 0 : _w.w; // true
    (_x = o5.x) === null || _x === void 0 ? void 0 : _x.y.z.w; // true
    (_z = (_y = o5.x) === null || _y === void 0 ? void 0 : _y.y.z) === null || _z === void 0 ? void 0 : _z.w; // true
}
else {
    o5.x;
    (_0 = o5.x) === null || _0 === void 0 ? void 0 : _0.y;
    (_1 = o5.x) === null || _1 === void 0 ? void 0 : _1.y.z;
    (_3 = (_2 = o5.x) === null || _2 === void 0 ? void 0 : _2.y.z) === null || _3 === void 0 ? void 0 : _3.w;
    o5.x.y;
    o5.x.y.z.w;
}
o5.x;
(_4 = o5.x) === null || _4 === void 0 ? void 0 : _4.y;
(_5 = o5.x) === null || _5 === void 0 ? void 0 : _5.y.z;
(_7 = (_6 = o5.x) === null || _6 === void 0 ? void 0 : _6.y.z) === null || _7 === void 0 ? void 0 : _7.w;
o5.x.y;
o5.x.y.z.w;
if ((_8 = o6) === null || _8 === void 0 ? void 0 : _8.f()) {
    o6; // Derived
    o6.f;
}
else {
    o6;
    (_9 = o6) === null || _9 === void 0 ? void 0 : _9.f;
    o6.f;
}
o6;
(_10 = o6) === null || _10 === void 0 ? void 0 : _10.f;
o6.f;
function f01(x) {
    var _a, _b, _c, _d;
    if (!!true) {
        (_a = isString) === null || _a === void 0 ? void 0 : _a(x);
        x;
    }
    if (!!true) {
        (_b = maybeIsString) === null || _b === void 0 ? void 0 : _b(x);
        x;
    }
    if (!!true) {
        isDefined(maybeIsString);
        (_c = maybeIsString) === null || _c === void 0 ? void 0 : _c(x);
        x;
    }
    if (!!true) {
        (_d = maybeNever) === null || _d === void 0 ? void 0 : _d();
        x;
    }
}
function f10(o, value) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === value) {
        o.foo;
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === value) {
        o["foo"];
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === value) {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) == value) {
        o.foo;
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) == value) {
        o["foo"];
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) == value) {
        o.bar;
    }
}
function f11(o, value) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === value) {
        o.foo;
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === value) {
        o["foo"];
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === value) {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) == value) {
        o.foo;
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) == value) {
        o["foo"];
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) == value) {
        o.bar;
    }
}
function f12(o, value) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === value) {
        o.foo; // Error
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === value) {
        o["foo"]; // Error
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === value) {
        o.bar; // Error
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) == value) {
        o.foo; // Error
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) == value) {
        o["foo"]; // Error
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) == value) {
        o.bar; // Error
    }
}
function f12a(o, value) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === value) {
        o.foo;
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === value) {
        o["foo"];
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === value) {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) == value) {
        o.foo; // Error
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) == value) {
        o["foo"]; // Error
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) == value) {
        o.bar; // Error
    }
}
function f13(o) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) !== undefined) {
        o.foo;
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) !== undefined) {
        o["foo"];
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) !== undefined) {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) != undefined) {
        o.foo;
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) != undefined) {
        o["foo"];
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) != undefined) {
        o.bar;
    }
}
function f13a(o) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) !== null) {
        o.foo; // Error
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) !== null) {
        o["foo"]; // Error
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) !== null) {
        o.bar; // Error
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.foo) != null) {
        o.foo;
    }
    if (((_e = o) === null || _e === void 0 ? void 0 : _e["foo"]) != null) {
        o["foo"];
    }
    if (((_f = o) === null || _f === void 0 ? void 0 : _f.bar()) != null) {
        o.bar;
    }
}
function f14(o) {
    var _a, _b, _c;
    if (((_a = o) === null || _a === void 0 ? void 0 : _a.foo) !== undefined) {
        o.foo;
    }
    if (((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) !== undefined) {
        o["foo"];
    }
    if (((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) !== undefined) {
        o.bar;
    }
}
function f20(o) {
    var _a, _b, _c, _d;
    if (typeof ((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === "number") {
        o.foo;
    }
    if (typeof ((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === "number") {
        o["foo"];
    }
    if (typeof ((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === "number") {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.baz) instanceof Error) {
        o.baz;
    }
}
function f21(o) {
    var _a, _b, _c, _d;
    if (typeof ((_a = o) === null || _a === void 0 ? void 0 : _a.foo) === "number") {
        o.foo;
    }
    if (typeof ((_b = o) === null || _b === void 0 ? void 0 : _b["foo"]) === "number") {
        o["foo"];
    }
    if (typeof ((_c = o) === null || _c === void 0 ? void 0 : _c.bar()) === "number") {
        o.bar;
    }
    if (((_d = o) === null || _d === void 0 ? void 0 : _d.baz) instanceof Error) {
        o.baz;
    }
}
