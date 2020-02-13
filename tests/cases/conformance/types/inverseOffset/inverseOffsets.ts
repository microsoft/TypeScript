// @strict: true
// Rules (from https://gist.github.com/rbuckton/53e335ce3d63686e229bc4ae25017756)

// @filename: parsing.ts
// Parsing Rules
type A = 0;
type B = 1;
type T0 = ^A;
type T1 = ^A | B;
type T2 = ^(A | B);
type T3 = keyof ^A;
type T4 = ^A[]; // error
type T5 = (^A)[];

// @filename: semantics.ts
// Semantic Rules
// - An *Inverse Offset Type*'s *index type* is constrained to `string | number`.
type T6 = ^0;
type T7 = ^"0";
type T8 = ^true; // error

// - The *Inverse Offset Type* of an *Inverse Offset Type* `I` is the *index type* of `I`: `^^I -> I`
type T9 = ^^0; // inverse rule (double negation = non-negated)

// - An *Inverse Offset Type* for negative *index type* is instead a *Literal Type* for the absolute value of the *index type*: `^-1 -> 1`
type T10 = ^-1; // inverse rule (double negation = non-negated)

// - If the *index type* of an *Inverse Offset Type* is a union, the *Inverse Offset Type* is distributed over the union: `^(A | B) -> ^A | ^B`
type T11 = ^(0 | 1); // distributes

// - An *Inverse Offset Type* is deferred until applied as the *index type* of an *Indexed Access Type* or *Range Type*.
type T12 = ^0;

// - An *Inverse Offset Type* is deferred if its *index type* is generic.
type T13<A extends string | number> = ^A;
type T14 = T13<1>;

type AR = [1, 2, 3];
type X = AR[^1]; // 3

// @filename: assignability.ts
// Assignability Rules
// - `^S` is assignable to `string | number`.
type Constrained0<T extends string | number> = never;
type Constrained1<T extends boolean | bigint | symbol | undefined | null | object> = never;
type T15 = Constrained0<^0>;
type T16 = Constrained1<^0>; // error

// - `^S` is assignable to `^T` if `S` is assignable to `T`.
function f<T extends string | number, S extends T>(s: ^S, t: ^T) {
    t = s;
}
