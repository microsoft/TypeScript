/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0;
////}

verify.codeFixAll({
    actionId: "unusedIdentifier_delete",
    newFileContent:
`function f() {
}`,
});
