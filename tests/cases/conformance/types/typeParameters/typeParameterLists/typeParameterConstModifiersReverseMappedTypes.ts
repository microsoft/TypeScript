// @strict: true
// @noEmit: true

declare function test1<const T>(obj: {
  [K in keyof T]: T[K];
}): [T, typeof obj];

const result1 = test1({
  prop: "foo",
  nested: {
    nestedProp: "bar",
  },
});

declare function test2<const T>(obj: {
  readonly [K in keyof T]: T[K];
}): [T, typeof obj];

const result2 = test2({
  prop: "foo",
  nested: {
    nestedProp: "bar",
  },
});

declare function test3<const T>(obj: {
  -readonly [K in keyof T]: T[K];
}): [T, typeof obj];

const result3 = test3({
  prop: "foo",
  nested: {
    nestedProp: "bar",
  },
});

declare function test4<const T extends readonly unknown[]>(arr: {
  [K in keyof T]: T[K];
}): T;

const result4 = test4(["1", 2]);

declare function test5<const T extends readonly unknown[]>(
  ...args: {
    [K in keyof T]: T[K];
  }
): T;

const result5 = test5({ a: "foo" });
