// @strict: true
// @target: esnext
// @noEmit: true

type OnlyNumber<T extends number> = T;
type OnlySymbol<T extends symbol> = T;
type OnlyBoolean<T extends boolean> = T;
type OnlyB<T extends "b"> = T;
type NonString<T extends not string> = T;
type NonA<T extends not "a"> = T;
type OnlyString<T extends string> = T;

type Primitive<T extends string | number> = T extends string ? never : OnlyNumber<T>;
type NegativeConstraint<T extends string | number> = T extends string ? never : NonString<T>;
type Keys<T extends PropertyKey> = T extends string | number ? never : OnlySymbol<T>;
type Literals<T extends "a" | "b"> = T extends "a" ? never : OnlyB<T>;
type NegativeLiteral<T extends "a" | "b"> = T extends "a" ? never : NonA<T>;
type Booleans<T extends boolean> = T extends true ? never : OnlyBoolean<T>;
type DoubleNegation<T extends string | number> = T extends not string ? never : OnlyString<T>;
type Nested<T extends string | number | boolean> =
    T extends string ? T : T extends number ? OnlyNumber<T> : OnlyBoolean<T>;
type Callback<T extends string | number> = T extends string ? never : (value: NonString<T>) => OnlyNumber<T>;
type Parenthesized<T extends string | number> = (T) extends (string) ? never : NonString<T>;
type WrappedOuter<T extends string | number> =
    [T] extends [string | number] ? T extends string ? never : OnlyNumber<T> : never;

const primitive: Primitive<"a" | 1 | 2> = 1;
const anyPrimitive: Primitive<any> = "a";
const negativeConstraint: NegativeConstraint<string | number> = 1;
declare const key: Keys<symbol | "a" | 1>;
const symbolKey: symbol = key;
const literal: Literals<"a" | "b"> = "b";
const negativeLiteral: NegativeLiteral<"a" | "b"> = "b";
const boolean: Booleans<boolean> = false;
const doubleNegation: DoubleNegation<string | number> = "a";
const nested: Nested<string | number | boolean> = true;
const callback: Callback<string | number> = value => value;
const parenthesized: Parenthesized<string | number> = 1;
const wrappedOuter: WrappedOuter<string | number> = 1;

// Filtering must still happen separately for each union member.
const rejectedPrimitive: Primitive<string | number> = "a";
const rejectedKey: Keys<PropertyKey> = 1;
const rejectedLiteral: Literals<"a" | "b"> = "a";
const rejectedBoolean: Booleans<boolean> = true;
const rejectedDoubleNegation: DoubleNegation<string | number> = 1;
const rejectedNever: Primitive<never> = 1;
const rejectedWrappedOuter: WrappedOuter<string | number> = "a";

// Existing true-branch constraints and explicit negative intersections remain valid.
type TrueBranch<T> = T extends number ? OnlyNumber<T> : never;
type Explicit<T> = T extends string ? never : NonString<T & not string>;
type Inherited<T extends string | number, U extends T> = U extends string ? never : NonString<U>;
const inherited: Inherited<string | number, number> = 1;

interface Values {
    a: 1;
    b: 2;
    skip: 3;
}
type Lookup<T extends keyof Values> = T extends "skip" ? never : Values[T];
function lookup<T extends keyof Values>(value: Values[T & not "skip"]): Lookup<T> {
    return value;
}

type SelfChecks<T extends string | number> =
    T extends T ? 0 : T extends T ? 1 : T extends T ? 2 : T extends T ? 3 :
    T extends T ? 4 : T extends T ? 5 : T extends T ? 6 : T extends T ? 7 :
    T extends T ? 8 : T extends T ? 9 : T extends T ? 10 : T extends T ? 11 :
    T extends T ? 12 : T extends T ? 13 : T extends T ? 14 : T extends T ? 15 : T;
const selfChecks: SelfChecks<string | number> = 0;
