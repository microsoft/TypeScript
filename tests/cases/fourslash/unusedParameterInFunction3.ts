/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    y++;
////}

verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "greeter(y)",
});
