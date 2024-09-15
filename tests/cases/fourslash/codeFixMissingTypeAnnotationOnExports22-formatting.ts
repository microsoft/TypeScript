/// <reference path='fourslash.ts'/>
// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
/////**
//// * Test
//// */
////export function foo(){}

verify.codeFixAvailable([
    { description:  "Add return type 'void'" }
]);

verify.codeFix({
    description: "Add return type 'void'",
    index: 0,
    newFileContent:
`/**
 * Test
 */
export function foo(): void{}`
});