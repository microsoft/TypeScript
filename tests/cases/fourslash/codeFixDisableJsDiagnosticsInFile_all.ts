/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true
// @noEmit: true

// @Filename: a.js
////let x = "";
////x = 1;
////x = true;

verify.codeFixAll({
    groupId: "disableJsDiagnostics",
    newFileContent:
`let x = "";
// @ts-ignore\r
x = 1;
// @ts-ignore\r
x = true;`,
});
