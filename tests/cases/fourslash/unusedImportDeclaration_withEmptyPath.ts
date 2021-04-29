/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////// leading trivia
////import * as foo from ""; // trailing trivia

verify.codeFix({
    description: "Remove import from ''",
    newFileContent:
`// leading trivia
 // trailing trivia`,
});
