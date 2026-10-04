// @strict: true
// @target: es2015

// Repro from #19682

type Nominal<Kind extends string, Type> = Type & {
    [Symbol.species]: Kind;
};

type A = Nominal<'A', string>;

declare const a: Set<A>;
declare const b: Set<A>;

const c1 = Array.from(a).concat(Array.from(b));

// Simpler repro

declare function from<T>(): T[];
const c2: ReadonlyArray<A> = from();
