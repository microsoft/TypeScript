/// <reference path='fourslash.ts' />

// @noImplicitAny: true

////interface IFoo {}
////const foo: IFoo = {}
////foo.bar()

verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "bar"],
    index: 0,
    newFileContent:
`interface IFoo {
    bar(): unknown;
}
const foo: IFoo = {}
foo.bar()`,
});
