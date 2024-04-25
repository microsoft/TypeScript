// @strict: true
// @enforceReadonly: true
// @noEmit: true

// A read-only property is not assignable to a mutable property

function f1(mp: { x: string }, rp: { readonly x: string }, mx: { [x: string]: string }, rx: { readonly [x: string]: string }) {
    mp = rp;  // Error
    rp = mp;
    mx = mp;
    mx = rp;
    mx = rx;  // Error
    rx = mp;
    rx = rp;
    rx = mx;
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

function f2<T>(mt: Mutable<T>, tt: T, rt: Readonly<T>) {
    mt = tt;  // Error
    mt = rt;  // Error
    tt = mt;
    tt = rt;  // Error
    rt = mt;
    rt = tt;
}

// A read-only property is assignable to a property declared as a method

function f3(m: { foo(): void }, p: { foo: () => void }, r: { readonly foo: () => void }) {
    m = r;
    p = r;  // Error
}

type Paths = string[] & { __brand__: "Paths" };

function f4(rp: Readonly<Paths>, rs: Readonly<string[]>) {
    rs = rp;
}

// A derived interface may not change property from mutable to read-only

interface B1 {
    x: number;
}

interface D1 extends B1 {  // Error
    readonly x: number;
}

interface B2 {
    get x(): number;
    set x(value: number);
}

interface D2 extends B2 {  // Error
    get x(): number;
}

class B3 {
    x = 0;
}

class D3 extends B3 {  // Error
    readonly x = 1;
}

class B4 {
    foo() {}
}

class D4 extends B4 {  // Error
    readonly foo = () => {}
}

// A const assertion means "as const as possible" without violating constraints

const x1 = { a: "hello", b: 42 };
const x2 = { a: "hello", b: 42 } as const;

const y1: { a: string, b: number } = { a: "hello", b: 42 };
const y2: { a: string, b: number } = { a: "hello", b: 42 } as const;
const y3: { a: string, readonly b: number } = { a: "hello", b: 42 };
const y4: Record<string, unknown> = { a: 1, b: 2 } as const;

declare function f10<T>(obj: T): T;
declare function f11<const T>(obj: T): T;
declare function f12<const T extends { a: string, b: number }>(obj: T): T;
declare function f13<const T extends { a: string, readonly b: number }>(obj: T): T;
declare function f14<const T extends Record<string, unknown>>(obj: T): T;
declare function f15<const T extends Readonly<Record<string, unknown>>>(obj: T): T;

f10({ a: "hello", b: 42 });  // { a: string; b: number; }
f11({ a: "hello", b: 42 });  // { readonly a: "hello"; readonly b: 42; }
f12({ a: "hello", b: 42 });  // { a: "hello"; b: 42; }
f13({ a: "hello", b: 42 });  // { a: "hello"; readonly b: 42; }
f14({ a: "hello", b: 42 });  // { a: "hello"; b: 42; }
f15({ a: "hello", b: 42 });  // { readonly a: "hello"; readonly b: 42; }

// https://github.com/microsoft/TypeScript/issues/13347

interface MutableValue<T> {
    value: T;
}

interface ImmutableValue<T> {
    readonly value: T;
}

let i: ImmutableValue<string> = { value: "hi" };
i.value = "Excellent, I can't change it";  // Error

let m: MutableValue<string> = i;  // Error
m.value = "Oh dear, I can change it";
