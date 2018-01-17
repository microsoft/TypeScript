/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////[|/*~a*/(/*~b*/x/*~c*/,/*~d*/y/*~e*/)/*~f*/ => /*~g*/x/*~h*/|]

// In a perfect world, /*~c*/ would probably be retained, rather than /*~e*/.
verify.codeFix({
    description: "Remove declaration for: 'y'",
    index: 0,
    newRangeContent: "/*~a*/(/*~b*/x/*~e*/)/*~f*/ => /*~g*/x/*~h*/",
});
