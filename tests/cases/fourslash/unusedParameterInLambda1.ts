/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return (x:number) => {}|]
//// }

verify.codeFix({
    description: "Remove declaration for: 'x'.",
    index: 0,
    newRangeContent: "return () => {}",
});
