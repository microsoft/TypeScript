// @strict: true
// @noEmit: true

declare function test1<T extends Record<string, { prop: unknown }>>(arg: {
  [K in keyof T]: T[K];
}): T;

const res1 = test1({
  foo: {
    prop: 1,
    prop2: "",
  },
  bar: {
    prop: true,
    prop2: null,
  },
});
