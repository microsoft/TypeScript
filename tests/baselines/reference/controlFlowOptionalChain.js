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

function f15(o: Thing | undefined, value: number) {
    if (o?.foo === value) {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo !== value) {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (o?.foo == value) {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo != value) {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
}

function f15a(o: Thing | undefined, value: unknown) {
    if (o?.foo === value) {
        o.foo;  // Error
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo !== value) {
        o.foo;  // Error
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo == value) {
        o.foo;  // Error
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo != value) {
        o.foo;  // Error
    }
    else {
        o.foo;  // Error
    }
}

function f16(o: Thing | undefined) {
    if (o?.foo === undefined) {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (o?.foo !== undefined) {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (o?.foo == undefined) {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (o?.foo != undefined) {
        o.foo;
    }
    else {
        o.foo;  // Error
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

function f22(o: Thing | undefined) {
    if (typeof o?.foo === "number") {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (typeof o?.foo !== "number") {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (typeof o?.foo == "number") {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (typeof o?.foo != "number") {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
}

function f23(o: Thing | undefined) {
    if (typeof o?.foo === "undefined") {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (typeof o?.foo !== "undefined") {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
    if (typeof o?.foo == "undefined") {
        o.foo;  // Error
    }
    else {
        o.foo;
    }
    if (typeof o?.foo != "undefined") {
        o.foo;
    }
    else {
        o.foo;  // Error
    }
}

declare function assert(x: unknown): asserts x;
declare function assertNonNull<T>(x: T): asserts x is NonNullable<T>;

function f30(o: Thing | undefined) {
    if (!!true) {
        assert(o?.foo);
        o.foo;
    }
    if (!!true) {
        assert(o?.foo === 42);
        o.foo;
    }
    if (!!true) {
        assert(typeof o?.foo === "number");
        o.foo;
    }
    if (!!true) {
        assertNonNull(o?.foo);
        o.foo;
    }
}

function f40(o: Thing | undefined) {
    switch (o?.foo) {
        case "abc":
            o.foo;
            break;
        case 42:
            o.foo;
            break;
        case undefined:
            o.foo;  // Error
            break;
        default:
            o.foo;  // Error
            break;
    }
}

function f41(o: Thing | undefined) {
    switch (typeof o?.foo) {
        case "string":
            o.foo;
            break;
        case "number":
            o.foo;
            break;
        case "undefined":
            o.foo;  // Error
            break;
        default:
            o.foo;  // Error
            break;
    }
}

// Repros from #34570

type Shape =
    | { type: 'rectangle', width: number, height: number }
    | { type: 'circle', radius: number }

function getArea(shape?: Shape) {
    switch (shape?.type) {
        case 'circle':
            return Math.PI * shape.radius ** 2
        case 'rectangle':
            return shape.width * shape.height
        default:
            return 0
    }
}

type Feature = {
  id: string;
  geometry?: {
    type: string;
    coordinates: number[];
  };
};


function extractCoordinates(f: Feature): number[] {
    if (f.geometry?.type !== 'test') {
        return [];
    }
    return f.geometry.coordinates;
}

// Repro from #35842

interface SomeObject {
    someProperty: unknown;
}

let lastSomeProperty: unknown | undefined;

function someFunction(someOptionalObject: SomeObject | undefined): void {
    if (someOptionalObject?.someProperty !== lastSomeProperty) {
        console.log(someOptionalObject);
        console.log(someOptionalObject.someProperty);  // Error
        lastSomeProperty = someOptionalObject?.someProperty;
    }
}

const someObject: SomeObject = {
    someProperty: 42
};

someFunction(someObject);
someFunction(undefined);


//// [controlFlowOptionalChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
var a;
o === null || o === void 0 ? void 0 : o[a = 1];
a.toString();
var b;
o === null || o === void 0 ? void 0 : o.x[b = 1];
b.toString();
var c;
o === null || o === void 0 ? void 0 : o(c = 1);
c.toString();
var d;
o === null || o === void 0 ? void 0 : o.x(d = 1);
d.toString();
if (f === null || f === void 0 ? void 0 : f(x)) {
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
if (o2 === null || o2 === void 0 ? void 0 : o2.f(x)) {
    x; // number
    o2.f; // (x: any) => x is number
    o2 === null || o2 === void 0 ? void 0 : o2.f;
    o2 === null || o2 === void 0 ? void 0 : o2.f(x);
}
else {
    x;
    o2;
    o2 === null || o2 === void 0 ? void 0 : o2.f;
    o2.f;
}
x;
o2;
o2 === null || o2 === void 0 ? void 0 : o2.f;
o2.f;
if ((o3 === null || o3 === void 0 ? void 0 : o3.x) === 1) {
    o3;
    o3.x;
    o3 === null || o3 === void 0 ? void 0 : o3.x;
}
else {
    o3;
    o3 === null || o3 === void 0 ? void 0 : o3.x;
    o3.x;
}
o3;
o3 === null || o3 === void 0 ? void 0 : o3.x;
o3.x;
if ((_a = o4.x) === null || _a === void 0 ? void 0 : _a.y) {
    o4.x; // { y: boolean }
    o4.x.y; // true
    (_b = o4.x) === null || _b === void 0 ? void 0 : _b.y; // true
}
else {
    o4.x;
    (_c = o4.x) === null || _c === void 0 ? void 0 : _c.y;
    o4.x.y;
}
o4.x;
(_d = o4.x) === null || _d === void 0 ? void 0 : _d.y;
o4.x.y;
if ((_f = (_e = o5.x) === null || _e === void 0 ? void 0 : _e.y.z) === null || _f === void 0 ? void 0 : _f.w) {
    o5.x;
    o5.x.y;
    o5.x.y.z;
    o5.x.y.z.w; // true
    (_g = o5.x.y.z) === null || _g === void 0 ? void 0 : _g.w; // true
    (_h = o5.x) === null || _h === void 0 ? void 0 : _h.y.z.w; // true
    (_k = (_j = o5.x) === null || _j === void 0 ? void 0 : _j.y.z) === null || _k === void 0 ? void 0 : _k.w; // true
}
else {
    o5.x;
    (_l = o5.x) === null || _l === void 0 ? void 0 : _l.y;
    (_m = o5.x) === null || _m === void 0 ? void 0 : _m.y.z;
    (_p = (_o = o5.x) === null || _o === void 0 ? void 0 : _o.y.z) === null || _p === void 0 ? void 0 : _p.w;
    o5.x.y;
    o5.x.y.z.w;
}
o5.x;
(_q = o5.x) === null || _q === void 0 ? void 0 : _q.y;
(_r = o5.x) === null || _r === void 0 ? void 0 : _r.y.z;
(_t = (_s = o5.x) === null || _s === void 0 ? void 0 : _s.y.z) === null || _t === void 0 ? void 0 : _t.w;
o5.x.y;
o5.x.y.z.w;
if (o6 === null || o6 === void 0 ? void 0 : o6.f()) {
    o6; // Derived
    o6.f;
}
else {
    o6;
    o6 === null || o6 === void 0 ? void 0 : o6.f;
    o6.f;
}
o6;
o6 === null || o6 === void 0 ? void 0 : o6.f;
o6.f;
function f01(x) {
    if (!!true) {
        isString === null || isString === void 0 ? void 0 : isString(x);
        x;
    }
    if (!!true) {
        maybeIsString === null || maybeIsString === void 0 ? void 0 : maybeIsString(x);
        x;
    }
    if (!!true) {
        isDefined(maybeIsString);
        maybeIsString === null || maybeIsString === void 0 ? void 0 : maybeIsString(x);
        x;
    }
    if (!!true) {
        maybeNever === null || maybeNever === void 0 ? void 0 : maybeNever();
        x;
    }
}
function f10(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) === value) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) === value) {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) == value) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) == value) {
        o.bar;
    }
}
function f11(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) === value) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) === value) {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) == value) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) == value) {
        o.bar;
    }
}
function f12(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) === value) {
        o["foo"]; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) === value) {
        o.bar; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) == value) {
        o["foo"]; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) == value) {
        o.bar; // Error
    }
}
function f12a(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) === value) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) === value) {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) == value) {
        o["foo"]; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) == value) {
        o.bar; // Error
    }
}
function f13(o) {
    if ((o === null || o === void 0 ? void 0 : o.foo) !== undefined) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) !== undefined) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) !== undefined) {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) != undefined) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) != undefined) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) != undefined) {
        o.bar;
    }
}
function f13a(o) {
    if ((o === null || o === void 0 ? void 0 : o.foo) !== null) {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) !== null) {
        o["foo"]; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) !== null) {
        o.bar; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) != null) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) != null) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) != null) {
        o.bar;
    }
}
function f14(o) {
    if ((o === null || o === void 0 ? void 0 : o.foo) !== undefined) {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o["foo"]) !== undefined) {
        o["foo"];
    }
    if ((o === null || o === void 0 ? void 0 : o.bar()) !== undefined) {
        o.bar;
    }
}
function f15(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) !== value) {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) != value) {
        o.foo; // Error
    }
    else {
        o.foo;
    }
}
function f15a(o, value) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === value) {
        o.foo; // Error
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) !== value) {
        o.foo; // Error
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == value) {
        o.foo; // Error
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) != value) {
        o.foo; // Error
    }
    else {
        o.foo; // Error
    }
}
function f16(o) {
    if ((o === null || o === void 0 ? void 0 : o.foo) === undefined) {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) !== undefined) {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) == undefined) {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if ((o === null || o === void 0 ? void 0 : o.foo) != undefined) {
        o.foo;
    }
    else {
        o.foo; // Error
    }
}
function f20(o) {
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) === "number") {
        o.foo;
    }
    if (typeof (o === null || o === void 0 ? void 0 : o["foo"]) === "number") {
        o["foo"];
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.bar()) === "number") {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.baz) instanceof Error) {
        o.baz;
    }
}
function f21(o) {
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) === "number") {
        o.foo;
    }
    if (typeof (o === null || o === void 0 ? void 0 : o["foo"]) === "number") {
        o["foo"];
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.bar()) === "number") {
        o.bar;
    }
    if ((o === null || o === void 0 ? void 0 : o.baz) instanceof Error) {
        o.baz;
    }
}
function f22(o) {
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) === "number") {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) !== "number") {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) == "number") {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) != "number") {
        o.foo; // Error
    }
    else {
        o.foo;
    }
}
function f23(o) {
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) === "undefined") {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) !== "undefined") {
        o.foo;
    }
    else {
        o.foo; // Error
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) == "undefined") {
        o.foo; // Error
    }
    else {
        o.foo;
    }
    if (typeof (o === null || o === void 0 ? void 0 : o.foo) != "undefined") {
        o.foo;
    }
    else {
        o.foo; // Error
    }
}
function f30(o) {
    if (!!true) {
        assert(o === null || o === void 0 ? void 0 : o.foo);
        o.foo;
    }
    if (!!true) {
        assert((o === null || o === void 0 ? void 0 : o.foo) === 42);
        o.foo;
    }
    if (!!true) {
        assert(typeof (o === null || o === void 0 ? void 0 : o.foo) === "number");
        o.foo;
    }
    if (!!true) {
        assertNonNull(o === null || o === void 0 ? void 0 : o.foo);
        o.foo;
    }
}
function f40(o) {
    switch (o === null || o === void 0 ? void 0 : o.foo) {
        case "abc":
            o.foo;
            break;
        case 42:
            o.foo;
            break;
        case undefined:
            o.foo; // Error
            break;
        default:
            o.foo; // Error
            break;
    }
}
function f41(o) {
    switch (typeof (o === null || o === void 0 ? void 0 : o.foo)) {
        case "string":
            o.foo;
            break;
        case "number":
            o.foo;
            break;
        case "undefined":
            o.foo; // Error
            break;
        default:
            o.foo; // Error
            break;
    }
}
function getArea(shape) {
    switch (shape === null || shape === void 0 ? void 0 : shape.type) {
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
        case 'rectangle':
            return shape.width * shape.height;
        default:
            return 0;
    }
}
function extractCoordinates(f) {
    var _a;
    if (((_a = f.geometry) === null || _a === void 0 ? void 0 : _a.type) !== 'test') {
        return [];
    }
    return f.geometry.coordinates;
}
var lastSomeProperty;
function someFunction(someOptionalObject) {
    if ((someOptionalObject === null || someOptionalObject === void 0 ? void 0 : someOptionalObject.someProperty) !== lastSomeProperty) {
        console.log(someOptionalObject);
        console.log(someOptionalObject.someProperty); // Error
        lastSomeProperty = someOptionalObject === null || someOptionalObject === void 0 ? void 0 : someOptionalObject.someProperty;
    }
}
var someObject = {
    someProperty: 42
};
someFunction(someObject);
someFunction(undefined);
