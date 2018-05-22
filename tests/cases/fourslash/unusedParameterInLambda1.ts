/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////[|/*~a*/(/*~b*/x/*~c*/:/*~d*/number/*~e*/)/*~f*/ => /*~g*/{/*~h*/}/*~i*/|]

verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "/*~a*/(/*~e*/)/*~f*/ => /*~g*/{/*~h*/}/*~i*/",
});
