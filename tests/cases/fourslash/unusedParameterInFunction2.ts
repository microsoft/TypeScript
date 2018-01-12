/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    use(x);
////}

verify.codeFix({
    description: "Remove declaration for: 'y'",
    index: 0,
    newRangeContent: "greeter(x)",
});
