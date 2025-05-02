/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

/////**
//// * Test
//// */
////export function foo(): number { return 0; }
/////**
////* Docs
////*/
////export const bar = (a = foo()) =>
////   a;
////// Trivia


verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    applyChanges: true,
    newFileContent:
`/**
 * Test
 */
export function foo(): number { return 0; }
/**
* Docs
*/
export const bar = (a = foo()): number =>
   a;
// Trivia`
});


verify.codeFix({
    description: "Add annotation of type 'number'",
    index: 0,
    applyChanges: true,
    newFileContent:
`/**
 * Test
 */
export function foo(): number { return 0; }
/**
* Docs
*/
export const bar = (a: number = foo()): number =>
   a;
// Trivia`
});
