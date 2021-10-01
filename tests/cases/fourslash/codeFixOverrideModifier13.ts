/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////class A {
////    foo() {}
////}
////
////class B extends A {
////    [|public foo() {}|]
////}

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "public override foo() {}",
    index: 0
})
