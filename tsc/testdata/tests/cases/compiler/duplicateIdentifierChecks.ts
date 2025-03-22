// @strict: true
// @target: esnext
// @noEmit: true

// Every member declaration in the following should produce a duplicate identifier error.

interface I1 {
    get x(): number;
    get x(): number;
}

interface I2 {
    set x(value: number);
    set x(value: number);
}

interface I3 {
    get x(): number;
    set x(value: number);
    get x(): number;
}

interface I4 {
    set x(value: number);
    get x(): number;
    set x(value: number);
}

interface I5 {
    get x(): number;
    x: number;
    set x(value: number);
}

interface I6 {
    set x(value: number);
    x: number;
    get x(): number;
}

interface I7 {
    get x(): number;
    x(): number;
    set x(value: number);
}

interface I8 {
    set x(value: number);
    x(): number;
    get x(): number;
}

declare class C1 {
    get x(): number;
    set x(value: number);
    get x(): number;
}

declare class C2 {
    set x(value: number);
    get x(): number;
    set x(value: number);
}

declare class C3 {
    get x(): number;
    accessor x: number;
    set x(value: number);
}

declare class C4 {
    set x(value: number);
    accessor x: number;
    get x(): number;
}

declare class C5 {
    get x(): number;
    x: number;
    set x(value: number);
}

declare class C6 {
    set x(value: number);
    x: number;
    get x(): number;
}

declare class C7 {
    get x(): number;
    x(): number;
    set x(value: number);
}

declare class C8 {
    set x(value: number);
    x(): number;
    get x(): number;
}

const o1 = {
    get x() { return 0 },
    get x() { return 0 }
}

const o2 = {
    set x(value: number) { },
    set x(value: number) { }
}

const o3 = {
    get x() { return 0 },
    set x(value: number) { },
    get x() { return 0 }
}

const o4 = {
    set x(value: number) { },
    get x() { return 0 },
    set x(value: number) { }
}

const o5 = {
    get x() { return 0 },
    x: 0,
    set x(value: number) { }
}

const o6 = {
    set x(value: number) { },
    x: 0,
    get x() { return 0 }
}

const o7 = {
    get x() { return 0 },
    x() { return 0 },
    set x(value: number) { }
}

const o8 = {
    set x(value: number) { },
    x() { return 0 },
    get x() { return 0 }
}

const foo = "foo"

interface I10 {
    get [foo](): number;
    [foo]: number;
    set [foo](value: number);
}

interface I11 {
    get [foo](): number;
    foo: number;
    set [foo](value: number);
}

interface I12 {
    get foo(): number;
    set [foo](value: number);
    set foo(value: number);
}

interface I13 {
    foo: number;
    [foo]: number;
}

interface I14 {
    foo: number;
    foo: number;
    [foo]: number;
}

interface I15 {
    foo: number;
    [foo]: number;
    [foo]: number;
}

declare class C10 {
    get [foo](): number;
    [foo]: number;
    set [foo](value: number);
}

declare class C11 {
    [foo]: number;
    get [foo](): number;
    set [foo](value: number);
}

declare class C12 {
    get [foo](): number;
    set [foo](value: number);
    [foo]: number;
}

const sym = Symbol();

interface I20 {
    get [sym](): number;
    [sym]: number;
    set [sym](value: number);
}

declare class C20 {
    get [sym](): number;
    [sym]: number;
    set [sym](value: number);
}
