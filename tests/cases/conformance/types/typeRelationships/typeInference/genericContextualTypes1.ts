// @strict: true
// @declaration: true

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
