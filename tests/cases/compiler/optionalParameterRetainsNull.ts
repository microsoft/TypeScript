// @strictNullChecks: true
interface Bar {  bar: number; foo: object | null;  }

let a = {
  test<K extends keyof Bar> (a: K,  b?: Bar[K]  |  null)  { }
};
a.test("bar", null); // ok, null is assignable to number | null | undefined
