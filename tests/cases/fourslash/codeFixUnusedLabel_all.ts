/// <reference path='fourslash.ts' />

// @noUnusedLocals: true

////label1: while (1) {}
////
////function f() {
////label2:
////    while (1) {}
////}

verify.codeFixAll({
    fixId: "fixUnusedLabel",
    fixAllDescription: "Remove all unused labels",
    newFileContent:
`while (1) {}

function f() {
    while (1) {}
}`,
});
