//// [genericContextualTypes1.ts]
type Box<T> = { value: T };

declare function wrap<A, B>(f: (a: A) => B): (a: A) => B;

declare function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;

declare function list<T>(a: T): T[];

declare function unlist<T>(a: T[]): T;

declare function box<V>(x: V): Box<V>;

declare function unbox<W>(x: Box<W>): W;

declare function map<T, U>(a: T[], f: (x: T) => U): U[];

declare function identity<T>(x: T): T;

declare function zip<A, B>(a: A, b: B): [A, B];

declare function flip<X, Y, Z>(f: (x: X, y: Y) => Z): (y: Y, x: X) => Z;

const f00: <A>(x: A) => A[] = list;
const f01: <A>(x: A) => A[] = x => [x];
const f02: <A>(x: A) => A[] = wrap(list);
const f03: <A>(x: A) => A[] = wrap(x => [x]);

const f10: <T>(x: T) => Box<T[]> = compose(a => list(a), b => box(b));
const f11: <T>(x: T) => Box<T[]> = compose(list, box);
const f12: <T>(x: Box<T[]>) => T = compose(a => unbox(a), b => unlist(b));
const f13: <T>(x: Box<T[]>) => T = compose(unbox, unlist);

const arrayMap = <T, U>(f: (x: T) => U) => (a: T[]) => a.map(f);
const arrayFilter = <T>(f: (x: T) => boolean) => (a: T[]) => a.filter(f);

const f20: (a: string[]) => number[] = arrayMap(x => x.length);
const f21: <A>(a: A[]) => A[][] = arrayMap(x => [x]);
const f22: <A>(a: A[]) => A[] = arrayMap(identity);
const f23: <A>(a: A[]) => Box<A>[] = arrayMap(value => ({ value }));

const f30: (a: string[]) => string[] = arrayFilter(x => x.length > 10);
const f31: <T extends Box<number>>(a: T[]) => T[] = arrayFilter(x => x.value > 10);

const f40: <A, B>(b: B, a: A) => [A, B] = flip(zip);

// Repro from #16293

type fn = <A>(a: A) => A;
const fn: fn = a => a;


//// [genericContextualTypes1.js]
"use strict";
var f00 = list;
var f01 = function (x) { return [x]; };
var f02 = wrap(list);
var f03 = wrap(function (x) { return [x]; });
var f10 = compose(function (a) { return list(a); }, function (b) { return box(b); });
var f11 = compose(list, box);
var f12 = compose(function (a) { return unbox(a); }, function (b) { return unlist(b); });
var f13 = compose(unbox, unlist);
var arrayMap = function (f) { return function (a) { return a.map(f); }; };
var arrayFilter = function (f) { return function (a) { return a.filter(f); }; };
var f20 = arrayMap(function (x) { return x.length; });
var f21 = arrayMap(function (x) { return [x]; });
var f22 = arrayMap(identity);
var f23 = arrayMap(function (value) { return ({ value: value }); });
var f30 = arrayFilter(function (x) { return x.length > 10; });
var f31 = arrayFilter(function (x) { return x.value > 10; });
var f40 = flip(zip);
var fn = function (a) { return a; };


//// [genericContextualTypes1.d.ts]
declare type Box<T> = {
    value: T;
};
declare function wrap<A, B>(f: (a: A) => B): (a: A) => B;
declare function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;
declare function list<T>(a: T): T[];
declare function unlist<T>(a: T[]): T;
declare function box<V>(x: V): Box<V>;
declare function unbox<W>(x: Box<W>): W;
declare function map<T, U>(a: T[], f: (x: T) => U): U[];
declare function identity<T>(x: T): T;
declare function zip<A, B>(a: A, b: B): [A, B];
declare function flip<X, Y, Z>(f: (x: X, y: Y) => Z): (y: Y, x: X) => Z;
declare const f00: <A>(x: A) => A[];
declare const f01: <A>(x: A) => A[];
declare const f02: <A>(x: A) => A[];
declare const f03: <A>(x: A) => A[];
declare const f10: <T>(x: T) => Box<T[]>;
declare const f11: <T>(x: T) => Box<T[]>;
declare const f12: <T>(x: Box<T[]>) => T;
declare const f13: <T>(x: Box<T[]>) => T;
declare const arrayMap: <T, U>(f: (x: T) => U) => (a: T[]) => U[];
declare const arrayFilter: <T>(f: (x: T) => boolean) => (a: T[]) => T[];
declare const f20: (a: string[]) => number[];
declare const f21: <A>(a: A[]) => A[][];
declare const f22: <A>(a: A[]) => A[];
declare const f23: <A>(a: A[]) => Box<A>[];
declare const f30: (a: string[]) => string[];
declare const f31: <T extends Box<number>>(a: T[]) => T[];
declare const f40: <A, B>(b: B, a: A) => [A, B];
declare type fn = <A>(a: A) => A;
declare const fn: fn;
