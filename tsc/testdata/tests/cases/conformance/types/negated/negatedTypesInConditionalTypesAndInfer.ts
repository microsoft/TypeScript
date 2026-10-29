// @strict: true
// @noEmit: true

// Negated types combined with conditional types and `infer`.

// A conditional that tests assignability to a negated type.
type IsNotString<T> = T extends not string ? true : false;
type A1 = IsNotString<number>; // number is not a string -> true
type A2 = IsNotString<"hello">; // a string literal -> false
type A3 = IsNotString<object>; // an object -> true

// Distributive conditional producing negated types in a branch.
type Branch<T> = T extends string ? T : not T;
type B1 = Branch<string>;         // string
type B2 = Branch<number>;         // not number
type B3 = Branch<string | number>; // distributes: string | not number

// `infer` underneath the `not` operator.
type InferUnderNot<T> = T extends not (infer U) ? U : never;
type C1 = InferUnderNot<not string>; // infer binds U = string
type C2 = InferUnderNot<number>;     // number is not a negated type -> false branch -> never

// `infer` capturing a negated type.
type InferNegated<T> = T extends Box<infer U> ? U : never;
interface Box<T> { value: T; }
type D1 = InferNegated<Box<not string>>; // U should be not string

// Conditional constraint using not.
type NonNullish<T> = T extends not (null | undefined) ? T : never;
type E1 = NonNullish<string | null>; // distributes to string
type E2 = NonNullish<null>;          // never
