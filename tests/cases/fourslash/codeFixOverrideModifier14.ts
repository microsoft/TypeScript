/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////class A {
////    protected async foo() {}
////}
////
////class B extends A {
////    [|protected async foo() {}|]
////}

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "protected override async foo() {}",
    index: 0
})
