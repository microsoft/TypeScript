/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true
// @noEmit: true

// @Filename: a.js
////let x = "";
////x = 1; x = true;
////x = [];

verify.codeFixAll({
    fixId: "disableJsDiagnostics",
    fixAllDescription: "Add '@ts-ignore' to all error messages",
    newFileContent:
`let x = "";
// @ts-ignore
x = 1; x = true;
// @ts-ignore
x = [];`,
});
