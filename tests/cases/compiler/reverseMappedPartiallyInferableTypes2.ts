// @strict: true
// @noEmit: true

declare function fn<T>(arg: {
  [K in keyof T]: T[K] & ((arg: string) => {});
}): T;

const res1 = fn({
  a: (arg) => arg,
  b: (arg) => [arg],
});

const res2 = fn({
  a: (arg: string) => arg,
  b: (arg: string) => [arg],
});

const res3 = fn({
  a: (arg: string) => arg,
  b: (arg) => [arg],
});

const res4 = fn({
  a: (arg) => arg,
  b: (arg: string) => [arg],
});
