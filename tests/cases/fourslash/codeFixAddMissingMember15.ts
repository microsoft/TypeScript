/// <reference path='fourslash.ts' />

////interface Foo {}
////class Foo {}
////Foo.test;

verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Declare_static_property_0),
    index: 0,
    newFileContent:
`interface Foo {}
class Foo {
    static test: any;
}
Foo.test;`
});
