/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: /a.ts
////import a, { b } from "mod";

verify.codeFix({
    description: "Remove declaration for: 'mod'",
    newFileContent: "",
});
