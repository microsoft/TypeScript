/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////function f() {
////    this;
////}

verify.codeFix({
    description: "Add 'this' parameter.",
    index: 0,
    newFileContent:
`function f(this: any) {
    this;
}`,
});
