// @strict: true
// @noEmit: true

type Spread<T extends readonly unknown[]> = [0, ...(T & readonly unknown[])];
type A = Spread<[1, 2]>;

type Tagged<T extends unknown[]> = [0, ...(T & { tag?: 1 })];
type B = Tagged<string[]>;

declare function f<T extends unknown[]>(x: T): [0, ...(T & { tag?: 1 })];
const c = f([1, "a"] as [1, "a"]);
