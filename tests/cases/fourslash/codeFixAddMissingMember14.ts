/// <reference path='fourslash.ts' />

////interface Foo {}
////class Foo {}
////Foo.test();

verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Declare_static_method_0),
    index: 0,
    newFileContent:
`interface Foo {}
class Foo {
    static test() {
        throw new Error("Method not implemented.");
    }
}
Foo.test();`
});
