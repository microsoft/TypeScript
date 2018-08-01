/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0; // Can't be prefixed, ignored
////}
////type Length<T> = T extends ArrayLike<infer U> ? number : never;

verify.codeFixAll({
    fixId: "unusedIdentifier_prefix",
    fixAllDescription: "Prefix all unused declarations with '_' where possible",
    newFileContent:
`function f(_a, _b) {
    const x = 0; // Can't be prefixed, ignored
}
type Length<T> = T extends ArrayLike<infer _U> ? number : never;`,
});
