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

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message },
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
    index: 0,
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
