// @strict: true
// @target: esnext
// @noEmit: true
// @checkOrder: default, typesfirst

type Resolve<T> = T extends () => infer R ? R : T;
type Validate<def> = { [K in keyof def]: def[K] extends () => infer R ? () => R : def[K] };
interface Scope<def> {
    type<k extends keyof def>(k: k): Resolve<def[k]>;
}
interface Type<T> {
    pipe<U>(f: (x: T) => U): Type<U>;
}
declare function scope<const def>(def: Validate<def>): Scope<def>;
declare function type<T>(x: T): Type<T>;

export const $ = scope({
    a: type("string").pipe(function (s) { return s.length; }),
    b: () => $.type("a").pipe(function (n) { return n === 0; }),
});

// Entered from the function in the first property when queried in reverse
export const $2 = scope({
    a: type("string").pipe(function (s) { return s.length; }),
    b: () => $2.type("a").pipe((n: number) => n === 0),
});
