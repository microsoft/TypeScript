// @strict: true
// @target: esnext
// @noEmit: true

type OnlyNumber<T extends number> = T;
type OnlyBoolean<T extends boolean> = T;
type NonString<T extends not string> = T;

// The inner check gets its primitive bound from the enclosing true branch.
type Contextual<T> =
    [T] extends [string | number] ? T extends string ? never : OnlyNumber<T> : never;
type Parenthesized<T> =
    [T] extends [string | number] ? (T) extends (string) ? never : OnlyNumber<T> : never;
type DistributiveOuter<T> =
    T extends string | number ? T extends string ? never : OnlyNumber<T> : never;
type Callback<T> =
    [T] extends [string | number] ? T extends string ? never : (value: NonString<T>) => OnlyNumber<T> : never;

// Both enclosing branches contribute constraints to the inner references.
type Nested<T> =
    T extends string ? never :
    [T] extends [number | boolean] ? T extends number ? never : OnlyBoolean<T> : never;

const contextual: Contextual<string | number> = 1;
const parenthesized: Parenthesized<string | number> = 1;
const distributiveOuter: DistributiveOuter<string | number | boolean> = 1;
const callback: Callback<string | number> = value => value;
const nested: Nested<string | number | boolean> = true;

const rejectedContextual: Contextual<string | number> = "a";
const rejectedParenthesized: Parenthesized<string | number> = "a";
const rejectedDistributiveOuter: DistributiveOuter<string | number | boolean> = true;
const rejectedNested: Nested<string | number | boolean> = 1;

// Contextual substitutions must not accidentally make a NoInfer check distributive.
type ContextualNoInfer<T> =
    [T] extends [string | number] ? NoInfer<T> extends string ? never : T : never;
const noInferString: ContextualNoInfer<string | number> = "a";
const noInferNumber: ContextualNoInfer<string | number> = 1;

type ContextualInfer<T> =
    [T] extends [string | number] ? T extends infer U extends string ? U : T : never;
const inferredString: ContextualInfer<string | number> = "a";
const inferredNumber: ContextualInfer<string | number> = 1;

// Re-resolving parenthesized check and extends nodes must not repeat ancestor analysis exponentially.
type Deep<T extends string | number> =
    (T) extends (T) ? 0 : (T) extends (T) ? 1 : (T) extends (T) ? 2 : (T) extends (T) ? 3 :
    (T) extends (T) ? 4 : (T) extends (T) ? 5 : (T) extends (T) ? 6 : (T) extends (T) ? 7 :
    (T) extends (T) ? 8 : (T) extends (T) ? 9 : (T) extends (T) ? 10 : (T) extends (T) ? 11 :
    (T) extends (T) ? 12 : (T) extends (T) ? 13 : (T) extends (T) ? 14 : (T) extends (T) ? 15 :
    (T) extends (T) ? 16 : (T) extends (T) ? 17 : (T) extends (T) ? 18 : (T) extends (T) ? 19 :
    (T) extends (T) ? 20 : (T) extends (T) ? 21 : (T) extends (T) ? 22 : (T) extends (T) ? 23 :
    (T) extends (T) ? 24 : (T) extends (T) ? 25 : (T) extends (T) ? 26 : (T) extends (T) ? 27 :
    (T) extends (T) ? 28 : (T) extends (T) ? 29 : (T) extends (T) ? 30 : (T) extends (T) ? 31 : T;
const deep: Deep<string | number> = 0;
