/// <reference path='fourslash.ts' />

// @pedanticOverride: true
//// class C {
////     [|override foo(v: string) {}|]
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    newRangeContent: "foo(v: string) {}",
    index: 0
})

