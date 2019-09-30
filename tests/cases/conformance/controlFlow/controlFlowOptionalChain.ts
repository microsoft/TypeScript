// @strict: true
// @allowUnreachableCode: false

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
    o3; // TODO: should be `{ x: y, y: string }`
    o3.x; // TODO: should not be an error.
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
