/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x, y } = o;
////const { a, b } = o;
////a;

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`export {};
const { a, } = o;
a;`,
});
