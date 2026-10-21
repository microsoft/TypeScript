// @strict: true
// @noEmit: true

// The -? mapped type makes the variance of MA unmeasurable, so comparisons
// of instantiations of MA made while measuring the variances of MA and MB
// fall back to structural comparisons. The variances should not depend on
// which type is measured first.

// @filename: maFirst.ts
export {};

type MA<T> = { x: { [K in keyof T]-?: T[K] }; b: MB<MA<T>> };
type MB<U> = { f: (u: U) => void; a: MA<MB<U>> };

declare let as: MA<{ p: string }>, al: MA<{ p: "lit" }>;
declare let bs: MB<{ p: string }>, bl: MB<{ p: "lit" }>;
al = as;
as = al;
bl = bs;
bs = bl;

// @filename: mbFirst.ts
export {};

type MA<T> = { x: { [K in keyof T]-?: T[K] }; b: MB<MA<T>> };
type MB<U> = { f: (u: U) => void; a: MA<MB<U>> };

declare let as: MA<{ p: string }>, al: MA<{ p: "lit" }>;
declare let bs: MB<{ p: string }>, bl: MB<{ p: "lit" }>;
bl = bs;
bs = bl;
al = as;
as = al;
