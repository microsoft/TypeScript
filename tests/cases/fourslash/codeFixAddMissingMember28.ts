/// <reference path='fourslash.ts' />

// @noImplicitAny: true

////interface IFoo {
////    b(): void;
////}
////const foo: IFoo = {}
////foo.a()

verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "a"],
    index: 1,
    newFileContent:
`interface IFoo {
    a(): unknown;
    b(): void;
}
const foo: IFoo = {}
foo.a()`,
});
