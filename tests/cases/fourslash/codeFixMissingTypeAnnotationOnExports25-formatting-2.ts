/// <reference path='fourslash.ts'/>
// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

/////**
//// * Docs
//// */
////export const bar = () => 
////    10;
////// Trivia


verify.codeFixAvailable([
    { description: "Add return type 'number'" }
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`/**
 * Docs
 */
export const bar = (): number => 
    10;
// Trivia`

});