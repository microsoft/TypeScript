//// [recursiveConditionalTypes.ts]
// Awaiting promises

type __Awaited<T> =
    T extends null | undefined ? T :
    T extends PromiseLike<infer U> ? __Awaited<U> :
    T;

type MyPromise<T> = {
    then<U>(f: ((value: T) => U | PromiseLike<U>) | null | undefined): MyPromise<U>;
}

type InfinitePromise<T> = Promise<InfinitePromise<T>>;

type P0 = __Awaited<Promise<string | Promise<MyPromise<number> | null> | undefined>>;
type P1 = __Awaited<any>;
type P2 = __Awaited<InfinitePromise<number>>;  // Error

function f11<T, U extends T>(tx: T, ta: __Awaited<T>, ux: U, ua: __Awaited<U>) {
    ta = ua;
    ua = ta;  // Error
    ta = tx;  // Error
    tx = ta;  // Error
}

// Flattening arrays

type Flatten<T extends readonly unknown[]> = T extends unknown[] ? _Flatten<T>[] : readonly _Flatten<T>[];
type _Flatten<T> = T extends readonly (infer U)[] ? _Flatten<U> : T;

type InfiniteArray<T> = InfiniteArray<T>[];

type B0 = Flatten<string[][][]>;
type B1 = Flatten<string[][] | readonly (number[] | boolean[][])[]>;
type B2 = Flatten<InfiniteArray<string>>;
type B3 = B2[0];  // Error

// Repeating tuples

type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type TT0 = TupleOf<string, 4>;
type TT1 = TupleOf<number, 0 | 2 | 4>;
type TT2 = TupleOf<number, number>;
type TT3 = TupleOf<number, any>;
type TT4 = TupleOf<number, 100>;
type TT5 = TupleOf<number, 1000>;  // Depth error

function f22<N extends number, M extends N>(tn: TupleOf<number, N>, tm: TupleOf<number, M>) {
    tn = tm;
    tm = tn;
}

declare function f23<T>(t: TupleOf<T, 3>): T;

f23(['a', 'b', 'c']);  // string

// Inference to recursive type

interface Box<T> { value: T };
type RecBox<T> = T | Box<RecBox<T>>;
type InfBox<T> = Box<InfBox<T>>;

declare function unbox<T>(box: RecBox<T>): T

type T1 = Box<string>;
type T2 = Box<T1>;
type T3 = Box<T2>;
type T4 = Box<T3>;
type T5 = Box<T4>;
type T6 = Box<T5>;

declare let b1: Box<Box<Box<Box<Box<Box<string>>>>>>;
declare let b2: T6;
declare let b3: InfBox<string>;
declare let b4: { value: { value: { value: typeof b4 }}};

unbox(b1);  // string
unbox(b2);  // string
unbox(b3);  // InfBox<string>
unbox({ value: { value: { value: { value: { value: { value: 5 }}}}}});  // number
unbox(b4);  // { value: { value: typeof b4 }}
unbox({ value: { value: { get value() { return this; } }}});  // { readonly value: ... }

// Inference from nested instantiations of same generic types

type Box1<T> = { value: T };
type Box2<T> = { value: T };

declare function foo<T>(x: Box1<Box1<T>>): T;

declare let z: Box2<Box2<string>>;

foo(z);  // unknown, but ideally would be string (requires unique recursion ID for each type reference)

// Intersect tuple element types

type Intersect<U extends any[], R = unknown> = U extends [infer H, ...infer T] ? Intersect<T, R & H> : R;

type QQ = Intersect<[string[], number[], 7]>;

// Infer between structurally identical recursive conditional types

type Unpack1<T> = T extends (infer U)[] ? Unpack1<U> : T;
type Unpack2<T> = T extends (infer U)[] ? Unpack2<U> : T;

function f20<T, U extends T>(x: Unpack1<T>, y: Unpack2<T>) {
    x = y;
    y = x;
    f20(y, x);
}

type Grow1<T extends unknown[], N extends number> = T['length'] extends N ? T : Grow1<[number, ...T], N>;
type Grow2<T extends unknown[], N extends number> = T['length'] extends N ? T : Grow2<[string, ...T], N>;

function f21<T extends number>(x: Grow1<[], T>, y: Grow2<[], T>) {
    f21(y, x);  // Error
}

// Repros from #41756

type ParseSuccess<R extends string> = { rest: R };

type ParseManyWhitespace<S extends string> =
    S extends ` ${infer R0}` ?
        ParseManyWhitespace<R0> extends ParseSuccess<infer R1> ? ParseSuccess<R1> : null :
        ParseSuccess<S>;

type TP1 = ParseManyWhitespace<" foo">;

type ParseManyWhitespace2<S extends string> =
    S extends ` ${infer R0}` ?
        Helper<ParseManyWhitespace2<R0>> :
        ParseSuccess<S>;

type Helper<T> = T extends ParseSuccess<infer R> ? ParseSuccess<R> : null

type TP2 = ParseManyWhitespace2<" foo">;

// Repro from #46183

type NTuple<N extends number, Tup extends unknown[] = []> =
    Tup['length'] extends N ? Tup : NTuple<N, [...Tup, unknown]>;

type Add<A extends number, B extends number> =
    [...NTuple<A>, ...NTuple<B>]['length'];

let five: Add<2, 3>;

// Repro from #46316

type _PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T
    ? [T, ...A] extends [...infer X] 
        ? X
        : never
    : never;

type _Enumerate<A extends Array<unknown>, N extends number> = N extends A['length']
    ? A
    : _Enumerate<_PrependNextNum<A>, N> & number;

type Enumerate<N extends number> = number extends N
    ? number
    : _Enumerate<[], N> extends (infer E)[]
    ? E
    : never;

function foo2<T extends unknown[]>(value: T): Enumerate<T['length']> {
    return value.length;  // Error
}


//// [recursiveConditionalTypes.js]
"use strict";
// Awaiting promises
function f11(tx, ta, ux, ua) {
    ta = ua;
    ua = ta; // Error
    ta = tx; // Error
    tx = ta; // Error
}
function f22(tn, tm) {
    tn = tm;
    tm = tn;
}
f23(['a', 'b', 'c']); // string
;
unbox(b1); // string
unbox(b2); // string
unbox(b3); // InfBox<string>
unbox({ value: { value: { value: { value: { value: { value: 5 } } } } } }); // number
unbox(b4); // { value: { value: typeof b4 }}
unbox({ value: { value: { get value() { return this; } } } }); // { readonly value: ... }
foo(z); // unknown, but ideally would be string (requires unique recursion ID for each type reference)
function f20(x, y) {
    x = y;
    y = x;
    f20(y, x);
}
function f21(x, y) {
    f21(y, x); // Error
}
let five;
function foo2(value) {
    return value.length; // Error
}


//// [recursiveConditionalTypes.d.ts]
declare type __Awaited<T> = T extends null | undefined ? T : T extends PromiseLike<infer U> ? __Awaited<U> : T;
declare type MyPromise<T> = {
    then<U>(f: ((value: T) => U | PromiseLike<U>) | null | undefined): MyPromise<U>;
};
declare type InfinitePromise<T> = Promise<InfinitePromise<T>>;
declare type P0 = __Awaited<Promise<string | Promise<MyPromise<number> | null> | undefined>>;
declare type P1 = __Awaited<any>;
declare type P2 = __Awaited<InfinitePromise<number>>;
declare function f11<T, U extends T>(tx: T, ta: __Awaited<T>, ux: U, ua: __Awaited<U>): void;
declare type Flatten<T extends readonly unknown[]> = T extends unknown[] ? _Flatten<T>[] : readonly _Flatten<T>[];
declare type _Flatten<T> = T extends readonly (infer U)[] ? _Flatten<U> : T;
declare type InfiniteArray<T> = InfiniteArray<T>[];
declare type B0 = Flatten<string[][][]>;
declare type B1 = Flatten<string[][] | readonly (number[] | boolean[][])[]>;
declare type B2 = Flatten<InfiniteArray<string>>;
declare type B3 = B2[0];
declare type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
declare type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
declare type TT0 = TupleOf<string, 4>;
declare type TT1 = TupleOf<number, 0 | 2 | 4>;
declare type TT2 = TupleOf<number, number>;
declare type TT3 = TupleOf<number, any>;
declare type TT4 = TupleOf<number, 100>;
declare type TT5 = TupleOf<number, 1000>;
declare function f22<N extends number, M extends N>(tn: TupleOf<number, N>, tm: TupleOf<number, M>): void;
declare function f23<T>(t: TupleOf<T, 3>): T;
interface Box<T> {
    value: T;
}
declare type RecBox<T> = T | Box<RecBox<T>>;
declare type InfBox<T> = Box<InfBox<T>>;
declare function unbox<T>(box: RecBox<T>): T;
declare type T1 = Box<string>;
declare type T2 = Box<T1>;
declare type T3 = Box<T2>;
declare type T4 = Box<T3>;
declare type T5 = Box<T4>;
declare type T6 = Box<T5>;
declare let b1: Box<Box<Box<Box<Box<Box<string>>>>>>;
declare let b2: T6;
declare let b3: InfBox<string>;
declare let b4: {
    value: {
        value: {
            value: typeof b4;
        };
    };
};
declare type Box1<T> = {
    value: T;
};
declare type Box2<T> = {
    value: T;
};
declare function foo<T>(x: Box1<Box1<T>>): T;
declare let z: Box2<Box2<string>>;
declare type Intersect<U extends any[], R = unknown> = U extends [infer H, ...infer T] ? Intersect<T, R & H> : R;
declare type QQ = Intersect<[string[], number[], 7]>;
declare type Unpack1<T> = T extends (infer U)[] ? Unpack1<U> : T;
declare type Unpack2<T> = T extends (infer U)[] ? Unpack2<U> : T;
declare function f20<T, U extends T>(x: Unpack1<T>, y: Unpack2<T>): void;
declare type Grow1<T extends unknown[], N extends number> = T['length'] extends N ? T : Grow1<[number, ...T], N>;
declare type Grow2<T extends unknown[], N extends number> = T['length'] extends N ? T : Grow2<[string, ...T], N>;
declare function f21<T extends number>(x: Grow1<[], T>, y: Grow2<[], T>): void;
declare type ParseSuccess<R extends string> = {
    rest: R;
};
declare type ParseManyWhitespace<S extends string> = S extends ` ${infer R0}` ? ParseManyWhitespace<R0> extends ParseSuccess<infer R1> ? ParseSuccess<R1> : null : ParseSuccess<S>;
declare type TP1 = ParseManyWhitespace<" foo">;
declare type ParseManyWhitespace2<S extends string> = S extends ` ${infer R0}` ? Helper<ParseManyWhitespace2<R0>> : ParseSuccess<S>;
declare type Helper<T> = T extends ParseSuccess<infer R> ? ParseSuccess<R> : null;
declare type TP2 = ParseManyWhitespace2<" foo">;
declare type NTuple<N extends number, Tup extends unknown[] = []> = Tup['length'] extends N ? Tup : NTuple<N, [...Tup, unknown]>;
declare type Add<A extends number, B extends number> = [
    ...NTuple<A>,
    ...NTuple<B>
]['length'];
declare let five: Add<2, 3>;
declare type _PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? [T, ...A] extends [...infer X] ? X : never : never;
declare type _Enumerate<A extends Array<unknown>, N extends number> = N extends A['length'] ? A : _Enumerate<_PrependNextNum<A>, N> & number;
declare type Enumerate<N extends number> = number extends N ? number : _Enumerate<[], N> extends (infer E)[] ? E : never;
declare function foo2<T extends unknown[]>(value: T): Enumerate<T['length']>;
