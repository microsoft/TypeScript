/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////[|/*~a*/x/*~b*/ /*~c*/=>/*~d*/ {/*~e*/}/*~f*/|]

// In a perfect world, /*~c*/ and /*~e*/ would probably be retained.
verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "/*~a*/() => /*~d*/ { }/*~f*/",
});
