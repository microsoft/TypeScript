/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return /*~a*/(/*~b*/x/*~c*/:/*~d*/number/*~e*/)/*~f*/ => /*~g*/{/*~h*/}/*~i*/|]
//// }

// In a perfect world, /*~f*/ and /*~h*/ would probably be retained.
verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "return /*~a*/() => /*~g*/ { }/*~i*/",
});
