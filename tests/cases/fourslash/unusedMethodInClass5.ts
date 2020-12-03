/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class C {
////    private ["string"] (){}
////}

verify.codeFix({
    description: `Remove unused declaration for: '["string"]'`,
    newFileContent: "class C {\n}",
});
