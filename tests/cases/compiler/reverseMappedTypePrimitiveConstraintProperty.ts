// @strict: true
// @noEmit: true

declare function test<
  T extends { prop: string; nested: { nestedProp: string } },
>(obj: { [K in keyof T]: T[K] }): T;

const result = test({
  prop: "foo", // this one should not widen to string
  nested: {
    nestedProp: "bar",
  },
  extra: "baz",
});
