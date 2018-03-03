/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return <T>(x:number) => {x}|]
//// }

verify.codeFix({
    description: "Remove declaration for: 'T'",
    newRangeContent: "return(x:number) => {x}",
});
