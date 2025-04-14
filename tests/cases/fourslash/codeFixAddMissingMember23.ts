/// <reference path='fourslash.ts' />

////[|type Foo = {};|]
////function f(foo: Foo) {
////    foo.y = 1;
////}

verify.codeFix({
    description: [ts.Diagnostics.Declare_property_0.message, "y"],
    index: 0,
    newRangeContent:
`type Foo = {
    y: number;
};`
});
