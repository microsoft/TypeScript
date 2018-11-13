/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////function f(x: number) {
////    this;
////}

verify.codeFix({
    description: "Add 'this' parameter.",
    index: 0,
    newFileContent:
`function f(this: any, x: number) {
    this;
}`,
});
