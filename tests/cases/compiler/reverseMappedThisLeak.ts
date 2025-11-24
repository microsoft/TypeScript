// @strict: true

declare function test<T extends Record<string, unknown>>(obj:{
  [K in keyof T]: () => T[K];
}): T;

const obj = test({
  a() {
    return 1;
  },
  b() {
    return this.a();
    // Expected: number
    // Actual: T[string] (bug)
  }
});

obj.b(); // should be `number`, but currently inferred as `T[string]`