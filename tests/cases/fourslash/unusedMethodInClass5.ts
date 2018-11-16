/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class C {
////    private ["string"] (){}
////}

verify.codeFix({
    description: `Remove declaration for: '["string"]'`,
    newFileContent: "class C {\n}",
});
