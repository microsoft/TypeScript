/// <reference path='fourslash.ts' />

////interface Bar {
////    a: number;
////}
////
////interface Foo<T, U> {
////    foo(a: T): U;
////}
////[|const x = {} satisfies Foo<string, Bar>;|]

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`const x = {
    foo: function(a: string): Bar {
        throw new Error("Function not implemented.");
    }
} satisfies Foo<string, Bar>;`,
});
