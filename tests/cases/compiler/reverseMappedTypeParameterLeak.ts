// @strict: true
// Test for type parameter leak in reverse mapped types
// Issue: T shouldn't leak into obj's type

declare function testReverseMapped<T extends Record<string, unknown>>(obj: {
  [K in keyof T]: () => T[K];
}): T;

const obj = testReverseMapped({
  //   ^? const obj: { a: number; b: number }
  a() {
    return 0;
  },
  b() {
    return this.a();
  },
});

// obj should be { a: number; b: number }, not { a: number; b: T[string] }
const a: number = obj.a;
const b: number = obj.b;

