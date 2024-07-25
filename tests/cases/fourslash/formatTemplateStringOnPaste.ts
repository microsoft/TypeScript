/// <reference path="fourslash.ts" />

//// const x = `${0}/*0*/abc/*1*/`;

format.selection("0", "1");
verify.currentFileContentIs("const x = `${0}abc`;");
