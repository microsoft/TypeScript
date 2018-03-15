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
    fixAllDescription: "Fix all like: Ignore this error message",
    newFileContent:
`let x = "";
// @ts-ignore
x = 1; x = true;
// @ts-ignore
x = [];`,
});
