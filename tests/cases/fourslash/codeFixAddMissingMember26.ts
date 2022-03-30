/// <reference path='fourslash.ts' />

////[|type Foo = {};|]
////function f(foo: Foo) {
////    foo.x = 1;
////}

verify.codeFix({
    description: [ts.Diagnostics.Add_index_signature_for_property_0.message, "x"],
    index: 1,
    newRangeContent:
`type Foo = {
    [x: string]: number;
};`
});
