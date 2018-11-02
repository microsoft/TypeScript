/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////const { x, y } = [{}];
////const { a, b } = [{}];
////a;
////export function f({ a, b }, { x, y }) {
////    a;
////}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`const { a } = [{}];
a;
export function f({ a }) {
    a;
}`,
});
