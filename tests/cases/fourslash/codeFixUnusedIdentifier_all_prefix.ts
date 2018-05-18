/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0; // Can't be prefixed, ignored
////}

verify.codeFixAll({
    fixId: "unusedIdentifier_prefix",
    fixAllDescription: "Prefix all unused declarations with '_' where possible",
    newFileContent:
`function f(_a, _b) {
    const x = 0; // Can't be prefixed, ignored
}`,
});
