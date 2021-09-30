/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: number;
////    c: () => void;
////}
////function f(foo: Foo) {}
////[|f({ a: 10 })|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`f({
    a: 10,
    b: 0,
    c: function(): void {
        throw new Error("Function not implemented.");
    }
})`
});
