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
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`const { a } = o;
a;
export function f({ a }) {
    a;
}`,
});
