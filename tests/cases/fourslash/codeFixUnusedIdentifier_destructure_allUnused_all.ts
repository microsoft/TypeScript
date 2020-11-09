/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////const { x, y } = o;
////const { a, b } = o;
////a;
////export function f({ a, b }, { x, y }) {
////    a;
////}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`const { a } = o;
a;
export function f({ a }, {  }) {
    a;
}`,
});
