/// <reference path="fourslash.ts" />
// @strict: true

//// type MyType = {
////   foo: string;
//// };

//// function fakeTest(cb: () => MyType | Promise<MyType>) {}

//// fakeTest(() => {
////   return {
////     /*a*/
////   };
//// });


verify.completions(
  {
    marker: ['a'],
    exact: [
      { name: 'foo', kind: 'property' },
    ]
  }
);