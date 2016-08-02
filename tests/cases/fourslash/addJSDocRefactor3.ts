/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/function f1(x: number, y: string, z:boolean){}/*1*/


verify.codeRefactor({
    description: "Add JSDoc Comments to Function",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 * @param x
 * @param y
 * @param z
 */
function f1(x: number, y: string, z:boolean) {}
`
}]});