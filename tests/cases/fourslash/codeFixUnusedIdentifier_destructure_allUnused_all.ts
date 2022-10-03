/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

//// const { x, y } = o;
//// const { a, b } = o;
//// a;
//// export function f({ fa, fb }, { fx, fy }) {
////     fb;
//// }
//// export function g([ ga, gb ], [ gary, gygax ]) {
////     ga;
//// }

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`const { x, y } = o;
const { a } = o;
a;
export function f({ fb }) {
    fb;
}
export function g([ ga ],) {
    ga;
}`,
});
