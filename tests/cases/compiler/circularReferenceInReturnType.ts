// @strict: true
// @noEmit: true

declare function fn1<T>(cb: () => T): string;
const res1 = fn1(() => res1);

declare function fn2<T>(): (cb: () => any) => (a: T) => void;
const res2 = fn2()(() => res2);

declare function fn3<T>(): <T2>(cb: (arg: T2) => any) => (a: T) => void;
const res3 = fn3()(() => res3);
