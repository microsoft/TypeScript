/// <reference path='fourslash.ts' />

////[|type Foo = {
////    y: number;
////};|]
////function f(foo: Foo) {
////    foo.x = 1;
////}

verify.codeFix({
    description: [ts.Diagnostics.Declare_property_0.message, "x"],
    index: 0,
    newRangeContent:
`type Foo = {
    x: number;
    y: number;
};`
});
