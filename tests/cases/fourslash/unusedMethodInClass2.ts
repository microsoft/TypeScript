/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    public function2() {
////    }
////    private function1() {
////    }
////}

verify.codeFix({
    description: `Remove unused declaration for: 'function1'`,
    newFileContent: `class greeter {
    public function2() {
    }
}`,
});
