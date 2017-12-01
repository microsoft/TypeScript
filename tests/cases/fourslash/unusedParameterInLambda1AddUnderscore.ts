/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return (x:number) => {} |]
//// }

verify.codeFix({
    description: "Prefix 'x' with an underscore.",
    index: 1,
    newRangeContent: "return (_x:number) => {}",
});
