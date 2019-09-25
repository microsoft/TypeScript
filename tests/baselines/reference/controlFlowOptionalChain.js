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
    f; // TODO: still possibly undefined, should be defined
}
else {
    x; // string | number
    f; // still possibly undefined
}
x;
f;

declare const o2: { f(x: any): x is number; } | undefined;
if (o2?.f(x)) {
    x; // number
    o2; // TODO: still possibly undefined, should be defined
}
else {
    x; // string | number
    o2; // still possibly undefined.
}
x;
o2;

declare const o3: { x: 1, y: string } | { x: 2, y: number } | undefined;
if (o3?.x === 1) {
    o3; // TODO: still possibly undefined, should be defined
}
else {
    o3;
}
o3;

declare const o4: { x?: { y: boolean } };
if (o4.x?.y) {
    o4.x; // TODO: still possibly undefined, should be defined
    o4.x.y;
}

interface Base {
    f(): this is Derived;
}

interface Derived extends Base {
    x: number;
}

declare const o5: Base | undefined;
if (o5?.f()) {
    o5; // Derived
}
else {
    o5; // Base | undefined
}
o5; // Base | undefined

// asserts
declare const isDefined: <T>(value: T) => asserts value is NonNullable<T>;
declare const isString: (value: unknown) => asserts value is string;
declare const maybeIsString: undefined | ((value: unknown) => asserts value is string);
declare const maybeNever: undefined | (() => never);

function f01(x: unknown) {
    if (!!true) {
        isString?.(x);
        x; // string
    }
    if (!!true) {
        maybeIsString?.(x);
        x; // unknown
    }
    if (!!true) {
        isDefined(maybeIsString);
        maybeIsString?.(x);
        x; // TODO: is unknown, should be string
    }
    if (!!true) {
        maybeNever?.();
        x; // unknown
    }
}


//// [controlFlowOptionalChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
    f; // TODO: still possibly undefined, should be defined
}
else {
    x; // string | number
    f; // still possibly undefined
}
x;
f;
if ((_f = o2) === null || _f === void 0 ? void 0 : _f.f(x)) {
    x; // number
    o2; // TODO: still possibly undefined, should be defined
}
else {
    x; // string | number
    o2; // still possibly undefined.
}
x;
o2;
if (((_g = o3) === null || _g === void 0 ? void 0 : _g.x) === 1) {
    o3; // TODO: still possibly undefined, should be defined
}
else {
    o3;
}
o3;
if ((_h = o4.x) === null || _h === void 0 ? void 0 : _h.y) {
    o4.x; // TODO: still possibly undefined, should be defined
    o4.x.y;
}
if ((_j = o5) === null || _j === void 0 ? void 0 : _j.f()) {
    o5; // Derived
}
else {
    o5; // Base | undefined
}
o5; // Base | undefined
function f01(x) {
    var _a, _b, _c, _d;
    if (!!true) {
        (_a = isString) === null || _a === void 0 ? void 0 : _a(x);
        x; // string
    }
    if (!!true) {
        (_b = maybeIsString) === null || _b === void 0 ? void 0 : _b(x);
        x; // unknown
    }
    if (!!true) {
        isDefined(maybeIsString);
        (_c = maybeIsString) === null || _c === void 0 ? void 0 : _c(x);
        x; // TODO: is unknown, should be string
    }
    if (!!true) {
        (_d = maybeNever) === null || _d === void 0 ? void 0 : _d();
        x; // unknown
    }
}
