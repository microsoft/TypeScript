// @strict: true
// @enforceReadonly: true
// @noEmit: true

function f1(mp: { x: string }, rp: { readonly x: string }, mx: { [x: string]: string }, rx: { readonly [x: string]: string }) {
    mp = rp; // Error
    rp = mp;
    mx = mp;
    mx = rp;
    mx = rx; // Error
    rx = mp;
    rx = rp;
    rx = mx;
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

function f2<T>(mt: Mutable<T>, tt: T, rt: Readonly<T>) {
    mt = tt; // Error
    mt = rt; // Error
    tt = mt;
    tt = rt; // Error
    rt = mt;
    rt = tt;
}

function f3(m: { foo(): void }, p: { foo: () => void }, r: { readonly foo: () => void }) {
    m = r;
    p = r; // Error
}

interface B1 {
    x: number;
}

interface D1 extends B1 { // Error
    readonly x: number;
}

interface B2 {
    get x(): number;
    set x(value: number);
}

interface D2 extends B2 { // Error
    get x(): number;
}

class B3 {
    x = 0;
}

class D3 extends B3 { // Error
    readonly x = 1;
}

type Foo = {
    readonly a: string | undefined;
    readonly b: number | undefined;
};

type Bar = {
    a: string;
};

function f5(foo: Foo, bar: Bar) {
    return foo === bar;
}

const y1: { a: string; b: number } = { a: "hello", b: 42 } as const;
const y2: { a: string; readonly b: number } = { a: "hello", b: 42 } as const;
const y3: Record<string, unknown> = { a: 1, b: 2 } as const;

declare function f10<const T extends { a: string; b: number }>(obj: T): T;
declare function f11<const T extends { a: string; readonly b: number }>(obj: T): T;

f10({ a: "hello", b: 42 });
f11({ a: "hello", b: 42 });

interface MutableValue<T> {
    value: T;
}

interface ImmutableValue<T> {
    readonly value: T;
}

let i: ImmutableValue<string> = { value: "hi" };
i.value = "Excellent, I can't change it"; // Error

let m: MutableValue<string> = i; // Error
m.value = "Oh dear, I can change it";
