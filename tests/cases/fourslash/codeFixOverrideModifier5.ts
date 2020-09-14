/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// class C {
////     [|override foo(v: string) {}|]
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    newRangeContent: "foo(v: string) {}",
    index: 0
})

