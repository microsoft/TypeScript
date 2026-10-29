// @strict: true
// @noEmit: true

type OnlyString<T extends string> = T;

type DeepTrue<T> =
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    T extends string ?
    OnlyString<T> :
    never : never : never : never : never :
    never : never : never : never : never :
    never : never : never : never : never :
    never : never : never : never : never;

const value: DeepTrue<"value"> = "value";
declare const excluded: DeepTrue<number>;

type DeepParenthesized<T> =
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    (T) extends (string) ?
    OnlyString<T> :
    never : never : never : never :
    never : never : never : never :
    never : never : never : never :
    never : never : never : never;

const parenthesized: DeepParenthesized<"value"> = "value";

type DeepTuple<T> =
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    [T] extends [string] ?
    OnlyString<T> :
    never : never : never : never :
    never : never : never : never :
    never : never : never : never :
    never : never : never : never;

const tuple: DeepTuple<"value"> = "value";

type DeepMixed<T extends string | number> =
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    T extends string ?
    T extends number ? never :
    OnlyString<T> :
    never : never : never : never :
    never : never : never : never;

const mixed: DeepMixed<"value" | 1> = "value";

type OnlyNumber<T extends number> = T;
type BothBranches<T extends string | number> =
    T extends string ? { branch: "true"; value: OnlyString<T> } : { branch: "false"; value: OnlyNumber<T> };
const trueBranch: BothBranches<string | number> = { branch: "true", value: "value" };
const falseBranch: BothBranches<string | number> = { branch: "false", value: 1 };

type DifferentParameters<T, U> = T extends string ? U extends number ? [OnlyNumber<U>, OnlyString<T>] : never : never;
const differentParameters: DifferentParameters<"value", 1> = [1, "value"];

type NestedTuples<T> = [[T]] extends [[string]] ? OnlyString<T> : never;
const nestedTuples: NestedTuples<"value"> = "value";

type TrueInfer<T> = T extends { value: infer U } ? U extends string ? OnlyString<U> : never : never;
const inferred: TrueInfer<{ value: "value" }> = "value";

type TrueNoInfer<T> = NoInfer<T> extends string ? OnlyString<T> : never;
const noInfer: TrueNoInfer<string> = "value";
declare const noInferUnion: TrueNoInfer<string | number>;
