// @strict

// Repro of #32816

type Target<T> = T extends null ? null : T;
type Target2<T> = { "one": null, "two": T }[T extends null ? "one" : "two"];
type Target3<T> = [null, T][T extends null ? 0 : 1];

function tst<T extends string>() {
    // These two pass as expected:
    const case0: Target2<T | null> = 1 as any as Target2<T | null>;
    const case1: { prop: Target<T | null> } = 1 as any as { prop: Target<T | null> };
    const case2: { prop: Target2<T> } = 1 as any as { prop: Target2<T> };
    const case3: { prop: Target3<T> } = 1 as any as { prop: Target3<T> };

    // These two fail as expected:
    const case4: { prop: Target2<T> } = 1 as any as { prop: Target2<T | null> };
    const case5: { prop: Target3<T> } = 1 as any as { prop: Target3<T | null> };

    // These two are expected to pass, but fail:
    const case6: { prop: Target2<T | null> } = 1 as any as { prop: Target2<T | null> };
    const case7: { prop: Target3<T | null> } = 1 as any as { prop: Target3<T | null> };
}

// Repro of #31833

type Foo1 = {
  type: 'foo1';
  extra: number;
};

type Foo2 = {
  type: 'foo2';
  extra: string;
};

type Both = Foo1 | Foo2;

type FooTypes = Both['type'];

export type FooFromType<T extends FooTypes, O extends Both = Both> = O extends { type: T } ? O : never;

type FooExtraFromType<T extends FooTypes> = FooFromType<T>['extra'];

function fnWithFooExtra<T extends FooTypes>(type: T, extra: FooExtraFromType<T>) { }

type FnType = <T extends FooTypes>(type: T, extra: FooExtraFromType<T>) => void;

const fn: FnType = fnWithFooExtra;

// You need the two aliases to avoid variance measurements.

type A1 = <
T extends { x: number, y: string } | { x: boolean, y: number}
>(
  x: T["x" | "y"]
) => void

type A2 = <
T extends { x: number, y: string } | { x: boolean, y: number}
>(
  x: T["x" | "y"]
) => void

declare const a: A1;
let b: A2 = a; // no error

type Obj = { x: number, y: string } | { x: boolean, y: number};
function fun<T extends Obj>(l: { x: T["x" | "y"] }, r: { x: T["x" | "y"] }) {
    l = r;
}
