/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0;
////}
////function g(a, b, c) { return a; }
////{
////    let a, b;
////}
////for (let i = 0, j = 0; ;) {}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`function f() {
}
function g(a) { return a; }
{
}
for (; ;) {}`,
});
