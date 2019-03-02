//// [genericFunctionInference1.ts]
declare function pipe<A extends any[], B>(ab: (...args: A) => B): (...args: A) => B;
declare function pipe<A extends any[], B, C>(ab: (...args: A) => B, bc: (b: B) => C): (...args: A) => C;
declare function pipe<A extends any[], B, C, D>(ab: (...args: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...args: A) => D;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const f00 = pipe(list);
const f01 = pipe(list, box);
const f02 = pipe(x => list(x), box);
const f03 = pipe(list, x => box(x));
const f04 = pipe(x => list(x), x => box(x))
const f05 = pipe(list, pipe(box));
const f06 = pipe(x => list(x), pipe(box));
const f07 = pipe(x => list(x), pipe(x => box(x)));

const f10: <T>(x: T) => T[] = pipe(list);
const f11: <T>(x: T) => { value: T[] } = pipe(list, box);
const f12: <T>(x: T) => { value: T[] } = pipe(x => list(x), box);
const f13: <T>(x: T) => { value: T[] } = pipe(list, x => box(x));
const f14: <T>(x: T) => { value: T[] } = pipe(x => list(x), x => box(x))
const f15: <T>(x: T) => { value: T[] } = pipe(list, pipe(box));
const f16: <T>(x: T) => { value: T[] } = pipe(x => list(x), pipe(box));
const f17: <T>(x: T) => { value: T[] } = pipe(x => list(x), pipe(x => box(x)));

// #29904.2

const fn20 = pipe((_a?: {}) => 1);

// #29904.3

type Fn = (n: number) => number;
const fn30: Fn = pipe(
    x => x + 1,
    x => x * 2,
);

const promise = Promise.resolve(1);
promise.then(
    pipe(
        x => x + 1,
        x => x * 2,
    ),
);

// #29904.4

declare const getString: () => string;
declare const orUndefined: (name: string) => string | undefined;
declare const identity: <T>(value: T) => T;

const fn40 = pipe(
    getString,
    string => orUndefined(string),
    identity,
);

// #29904.6

declare const getArray: () => string[];
declare const first: <T>(ts: T[]) => T;

const fn60 = pipe(
    getArray,
    x => x,
    first,
);

const fn61 = pipe(
    getArray,
    identity,
    first,
);

const fn62 = pipe(
    getArray,
    x => x,
    x => first(x),
);


//// [genericFunctionInference1.js]
"use strict";
const f00 = pipe(list);
const f01 = pipe(list, box);
const f02 = pipe(x => list(x), box);
const f03 = pipe(list, x => box(x));
const f04 = pipe(x => list(x), x => box(x));
const f05 = pipe(list, pipe(box));
const f06 = pipe(x => list(x), pipe(box));
const f07 = pipe(x => list(x), pipe(x => box(x)));
const f10 = pipe(list);
const f11 = pipe(list, box);
const f12 = pipe(x => list(x), box);
const f13 = pipe(list, x => box(x));
const f14 = pipe(x => list(x), x => box(x));
const f15 = pipe(list, pipe(box));
const f16 = pipe(x => list(x), pipe(box));
const f17 = pipe(x => list(x), pipe(x => box(x)));
// #29904.2
const fn20 = pipe((_a) => 1);
const fn30 = pipe(x => x + 1, x => x * 2);
const promise = Promise.resolve(1);
promise.then(pipe(x => x + 1, x => x * 2));
const fn40 = pipe(getString, string => orUndefined(string), identity);
const fn60 = pipe(getArray, x => x, first);
const fn61 = pipe(getArray, identity, first);
const fn62 = pipe(getArray, x => x, x => first(x));
