//// [tests/cases/compiler/nonInferrableTypePropagation1.ts] ////

//// [nonInferrableTypePropagation1.ts]
type Op<I, O> = (thing: Thing<I>) => Thing<O>;
type Thing<T> = {
    value: T;
    pipe<A, B>(
        opA: Op<T, A>,
        opB: Op<A, B>,
    ): Thing<B>;
};
type Box<V> = { data: V };

declare const thing: Thing<number>;

declare function map<T, R>(project: (value: T) => R): Op<T, R>;
declare function tap<T>(next: (value: T) => void): Op<T, T>;
declare function box<V>(data: V): Box<V>;
declare function createAndUnbox<V>(factory: () => Thing<V | Box<V>>): Thing<V>;
declare function log(value: any): void;

const result1 = createAndUnbox(() => thing.pipe(
    map((data) => box(data)),
    tap((v) => log(v)),
));

const result2 = createAndUnbox(() => thing.pipe(
    tap((v) => log(v)),
    map((data) => box(data)),
));


//// [nonInferrableTypePropagation1.js]
"use strict";
var result1 = createAndUnbox(function () { return thing.pipe(map(function (data) { return box(data); }), tap(function (v) { return log(v); })); });
var result2 = createAndUnbox(function () { return thing.pipe(tap(function (v) { return log(v); }), map(function (data) { return box(data); })); });
