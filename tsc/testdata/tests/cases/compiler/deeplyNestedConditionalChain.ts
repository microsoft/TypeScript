// @noEmit: true

// Checking that IsTwo<Unwrap<T>> satisfies the `boolean` constraint relates a chain of
// distributive conditional types wrapped around the recursive conditional type UnwrapTag.
// This must not report TS2589 (type instantiation is excessively deep and possibly infinite).
// The reproduction depends on the name UnwrapTagStep sorting after UnwrapTag.

type Test<T> = RequireBoolean<IsTwo<Unwrap<T>>>;

type RequireBoolean<B extends boolean> = B;

type IsTwo<N> =
    N extends 2
        ? N extends 2
            ? true
            : false
        : false;

type Unwrap<T> =
    T extends 2
        ? Distribute<KeepTwo<UnwrapTag<T>>>
        : 1;

type Distribute<T> = T extends unknown ? T : 1;

type KeepTwo<T> =
    T extends 2
        ? Distribute<T>
        : 1;

type UnwrapTag<T> =
    T extends { tag: object }
        ? UnwrapTag<UnwrapTagStep<keyof T["tag"] | "">>
        : T;

type UnwrapTagStep<T> =
    [T] extends [T]
        ? never
        : [T] extends [T]
            ? never
            : never;
