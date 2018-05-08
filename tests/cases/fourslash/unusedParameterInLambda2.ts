/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////[|/*~a*/x/*~b*/ /*~c*/=>/*~d*/ {/*~e*/}/*~f*/|]

verify.codeFix({
    description: "Remove declaration for: 'x'",
    index: 0,
    newRangeContent: "/*~a*/()/*~b*/ /*~c*/=>/*~d*/ {/*~e*/}/*~f*/",
});
