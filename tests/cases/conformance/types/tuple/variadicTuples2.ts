// @strict: true
// @declaration: true

// Declarations

type V00 = [number, ...string[]];
type V01 = [...string[], number];
type V03 = [number, ...string[], number];

type V10 = [number, ...string[], ...boolean[]];  // Error
type V11 = [number, ...string[], boolean?];  // Error
type V12 = [number, string?, boolean];  // Error

type V15 = [...string[], ...number[]];  // Error
type V16 = [...string[], ...Array<number>];  // Error
type V17 = [...Array<string>, ...number[]];  // Error
type V18 = [...Array<string>, ...Array<number>];  // Error

// Normalization

type Tup3<T extends unknown[], U extends unknown[], V extends unknown[]> = [...T, ...U, ...V];

type V20 = Tup3<[number], string[], [number]>;  // [number, ...string[], number]
type V21 = Tup3<[number], [string?], [boolean]>;  // [number, string | undefined, boolean]
type V22 = Tup3<[number], string[], boolean[]>;  // [number, (string | boolean)[]]
type V23 = Tup3<[number], string[], [boolean?]>;  // [number, (string | boolean | undefined)[]]
type V24 = Tup3<[number], [boolean?], string[]>;  // [number, boolean?, ...string[]]
type V25 = Tup3<string[], number[], boolean[]>;  // (string | number | boolean)[]
type V26 = Tup3<string[], number[], [boolean]>;  // [...(string | number)[], boolean]
type V27 = Tup3<[number?], [string], [boolean?]>;  // [number | undefined, string, boolean?]

type V30<A extends unknown[]> = Tup3<A, string[], number[]>;  // [...A, ...(string | number)[]]
type V31<A extends unknown[]> = Tup3<string[], A, number[]>;  // (string | number | A[number])[]
type V32<A extends unknown[]> = Tup3<string[], number[], A>;  // [...(string | number)[], ...A]

type V40<A extends unknown[]> = Tup3<A, [string?], number[]>;  // [...A, string?, ...number[]]
type V41<A extends unknown[]> = Tup3<[string?], A, number[]>;  // [string?, ...A, ...number[]]
type V42<A extends unknown[]> = Tup3<[string?], number[], A>;  // [string?, ...number[], ...A]

type V50<A extends unknown[]> = Tup3<A, string[], [number?]>;  // [...A, ...(string | number | undefined)[]]
type V51<A extends unknown[]> = Tup3<string[], A, [number?]>;  // (string | number | A[number] | undefined)[]
type V52<A extends unknown[]> = Tup3<string[], [number?], A>;  // [...(string | number | undefined)[], ...A]

// Assignability

declare let tt1: [...string[], number];
tt1 = [5];
tt1 = ['abc', 5];
tt1 = ['abc', 'def', 5];
tt1 = ['abc', 'def', 5, 6];  // Error

declare function ft1(...args: [...strs: string[], num: number]): void;
ft1(5);
ft1('abc', 5);
ft1('abc', 'def', 5);
ft1('abc', 'def', 5, 6);  // Error

declare let tt2: [number, ...string[], number];
tt2 = [0];  // Error
tt2 = [0, 1];
tt2 = [0, 1, 2];  // Error
tt2 = [0, 'abc', 1];
tt2 = [0, 'abc', 'def', 1];
tt2 = [0, 'abc', 1, 'def'];  // Error
tt2 = [true, 'abc', 'def', 1];  // Error
tt2 = [0, 'abc', 'def', true];  // Error

declare function ft2(n1: number, ...rest: [...strs: string[], n2: number]): void;
ft2(0);  // Error
ft2(0, 1);
ft2(0, 1, 2);  // Error
ft2(0, 'abc', 1);
ft2(0, 'abc', 'def', 1);
ft2(0, 'abc', 1, 'def');  // Error
ft2(true, 'abc', 'def', 1);  // Error
ft2(0, 'abc', 'def', true);  // Error

function ft3<T extends unknown[]>(x: [number, ...T], y: [number, number], z: [number, ...number[]]) {
    x = y;  // Error
    x = z;  // Error
    y = x;  // Error
    z = x;  // Error
}

// repro #50216
declare let tt3: [number, string, ...any[]]
let tt4: [number, ...number[]] = tt3  // Error

// Inference

function pipe<T extends readonly unknown[]>(...args: [...T, (...values: T) => void]) {
    const callback = args[args.length - 1] as (...values: T) => void;
    const values = args.slice(0, -1) as unknown as T;
    callback(...values);
}

pipe("foo", 123, true, (a, b, c) => {
    a;  // string
    b;  // number
    c;  // boolean
})

pipe("foo", 123, true, (...x) => {
    x;  // [string, number, boolean]
});

declare const sa: string[];

pipe(...sa, (...x) => {
    x;  // string[]
});

pipe(1, ...sa, 2, (...x) => {
    x;  // [number, ...string[], number]
    let qq = x[x.length - 1];
    let ww = x[0]
});

pipe<number[]>(1, 2, 3, 4);  // Error
pipe(...sa);  // Error

declare function fn1<T, U>(t: [...unknown[], T, U]): [T, U];
fn1([]);  // Error
fn1([1]);  // Error
fn1([1, 'abc']);  // [number, string]
fn1([1, 'abc', true]);  // [string, boolean]

declare function fn2<T, U>(t: [T, ...unknown[], U]): [T, U];
fn2([]);  // Error
fn2([1]);  // Error
fn2([1, 'abc']);  // [number, string]
fn2([1, 'abc', true]);  // [number, boolean]

// Repro from #39595

declare function foo<S extends readonly [string, ...string[]]>(...stringsAndNumber: readonly [...S, number]): [...S, number];

const a1 = foo('blah1', 1);
const b1 = foo('blah1', 'blah2', 1);
const c1 = foo(1);  // Error
const d1 = foo(1, 2);  // Error
const e1 = foo('blah1', 'blah2', 1, 2, 3);  // Error
