/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    private function1 = function() {
////    }
////}

verify.codeFix({
    description: `Remove declaration for: 'function1'`,
    newFileContent: "class greeter {\n}",
});
