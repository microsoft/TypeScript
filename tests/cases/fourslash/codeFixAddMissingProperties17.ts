/// <reference path='fourslash.ts' />

////interface Foo<T> {
////    foo(): T;
////}
////[|const x: Foo<string> = {};|]

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent: `const x: Foo<string> = {
    foo: function(): string {
        throw new Error("Function not implemented.");
    }
};`,
});
