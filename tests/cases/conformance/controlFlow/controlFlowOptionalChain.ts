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

// Repro from #35970

let i = 0;
declare const arr: { tag: ("left" | "right") }[];

while (arr[i]?.tag === "left") {
    i += 1;
    if (arr[i]?.tag === "right") {
        console.log("I should ALSO be reachable");
    }
}
