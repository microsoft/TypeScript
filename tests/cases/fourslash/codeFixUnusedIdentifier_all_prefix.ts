/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0; // Can't be prefixed, ignored
////}

verify.codeFixAll({
    groupId: "unusedIdentifier_prefix",
    newFileContent:
`function f(_a, _b) {
    const x = 0; // Can't be prefixed, ignored
}`,
});
