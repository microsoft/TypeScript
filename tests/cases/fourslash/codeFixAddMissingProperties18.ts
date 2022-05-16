/// <reference path='fourslash.ts' />

////interface Bar {
////    a: number;
////}
////
////interface Foo<T, U> {
////    foo(a: T): U;
////}
////[|const x: Foo<string, Bar> = {};|]

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent: `const x: Foo<string, Bar> = {
    foo: function(a: string): Bar {
        throw new Error("Function not implemented.");
    }
};`,
});
