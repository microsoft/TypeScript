/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////[|/*~a*/(/*~b*/x/*~c*/:/*~d*/number/*~e*/)/*~f*/ => /*~g*/{/*~h*/}/*~i*/|]

// In a perfect world, /*~f*/ and /*~h*/ would probably be retained.
verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "/*~a*/() => /*~g*/ { }/*~i*/",
});
