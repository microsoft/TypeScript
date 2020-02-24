/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter( x)|] {
////}

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    index: 0,
    newRangeContent: "greeter()",
});
