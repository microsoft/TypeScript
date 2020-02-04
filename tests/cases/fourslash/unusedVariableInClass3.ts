/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {[|
////    private X = function() {};
////|]}

verify.codeFix({
    description: "Remove unused declaration for: 'X'",
    newRangeContent: "\n",
});
