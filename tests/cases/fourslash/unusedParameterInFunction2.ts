/// <reference path='fourslash.ts' />

// @strict: false
// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    use(x);
////}

verify.codeFix({
    description: "Remove unused declaration for: 'y'",
    index: 0,
    newRangeContent: "greeter(x)",
});
