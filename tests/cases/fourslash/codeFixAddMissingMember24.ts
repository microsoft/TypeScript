/// <reference path='fourslash.ts' />

////[|type Foo = {};|]
////function f(foo: Foo) {
////    foo.test(1, 1, "");
////}

verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "test"],
    index: 0,
    newRangeContent:
`type Foo = {
    test(arg0: number, arg1: number, arg2: string): unknown;
};`
});
