/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    private function1() {
////    }
////}

verify.codeFix({
    description: `Remove unused declaration for: 'function1'`,
    newFileContent: "class greeter {\n}",
});
