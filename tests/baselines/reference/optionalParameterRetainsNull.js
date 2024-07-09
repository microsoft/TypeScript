//// [tests/cases/compiler/optionalParameterRetainsNull.ts] ////

//// [optionalParameterRetainsNull.ts]
interface Bar {  bar: number; foo: object | null;  }

let a = {
  test<K extends keyof Bar> (a: K,  b?: Bar[K]  |  null)  { }
};
a.test("bar", null); // ok, null is assignable to number | null | undefined


//// [optionalParameterRetainsNull.js]
var a = {
    test: function (a, b) { }
};
a.test("bar", null); // ok, null is assignable to number | null | undefined
