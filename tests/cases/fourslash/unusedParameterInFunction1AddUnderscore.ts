/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter( x) |] {
////}

verify.codeFix({
    description: "Prefix 'x' with an underscore.",
    index: 1,
    newRangeContent: "greeter( _x)",
});
