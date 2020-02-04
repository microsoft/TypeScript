/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace A {
////    namespace B {
////    }
////}

verify.codeFix({
    description: "Remove unused declaration for: 'B'",
    newFileContent: `namespace A {
}`,
});
