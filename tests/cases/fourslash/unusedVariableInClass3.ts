/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {[|
////    private X = function() {};
////|]}

verify.codeFix({
    description: "Remove declaration for: 'X'",
    newRangeContent: "\n",
});
