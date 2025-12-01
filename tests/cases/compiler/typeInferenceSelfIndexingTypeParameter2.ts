// @strict: true
// @noEmit: true

declare function f<T>(
  arg: {
    [K in keyof T]: T[K][keyof T[K]];
  }
): T;

const res1 = f({
  a: "hello",
  b: 100,
});
