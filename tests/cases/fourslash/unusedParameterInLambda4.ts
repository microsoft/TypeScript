/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return /*~a*/(/*~b*/x/*~c*/,/*~d*/y/*~e*/)/*~f*/ => /*~g*/y/*~h*/|]
//// }

verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "return /*~a*/(/*~d*/y/*~e*/)/*~f*/ => /*~g*/y/*~h*/",
});
