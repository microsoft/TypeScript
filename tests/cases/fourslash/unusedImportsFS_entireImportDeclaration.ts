/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: /a.ts
////// leading trivia
////import a, { b } from "mod"; // trailing trivia

verify.codeFix({
    description: "Remove import from 'mod'",
    newFileContent: " // trailing trivia",
});
