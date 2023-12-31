// @strict: true
// @noEmit: true

type XNumber = { x: number };
declare function foo<T extends XNumber>(props: {
  [K in keyof T as K & keyof XNumber]: T[K];
}): T;
const foo1 = foo({ x: 1, y: "foo" });
const objFoo = { x: 1, y: "foo" };
const foo2 = foo(objFoo);

const checkType =
  <T,>() =>
  <U extends T>(value: { [K in keyof U & keyof T]: U[K] }) =>
    value;

const checked1 = checkType<{ x: number; y: string }>()({
  x: 1 as number,
  y: "y",
  z: "z",
});
const objChecked = {
  x: 1,
  y: "y",
  z: "z",
};
const checked2 = checkType<{ x: number; y: string }>()(objChecked);

declare function fn1<T extends Record<string, number>>(obj: {
  [K in keyof T as K extends "a" ? K : never]: T[K];
}): T;
const obj1 = {
  a: 42,
  b: true,
};
const result1 = fn1(obj1);

declare function fn2<T>(obj: {
  [K in keyof T & ("a" | "b") as K extends "a" | "c" ? K : never]: T[K];
}): T;
const obj2 = { a: 1, b: 2, c: 3 };
const result2 = fn2(obj2);

declare function fn3<T>(obj: {
  [K in keyof T & ("a" | "c") as K extends "a" | "b" ? K : never]: T[K];
}): T;
const obj3 = { a: 1, b: 2, c: 3 };
const result3 = fn3(obj3);
