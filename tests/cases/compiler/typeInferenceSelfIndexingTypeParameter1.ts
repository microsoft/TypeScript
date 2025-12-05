// @strict: true
// @noEmit: true

declare function fn1<T>(arg: T[keyof T]): T
const res1 = fn1(["foo"]);

declare function fn2<T>(arg: T[keyof T & "a"]): T
const res2 = fn2(["foo"]);
