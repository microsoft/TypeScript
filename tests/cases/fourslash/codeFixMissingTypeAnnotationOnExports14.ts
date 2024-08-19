/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() {
////     return { x: 1, y: 1};
//// }
//// export const { x, y = 0} = foo(), z= 42;

verify.codeFix({
    description: ts.Diagnostics.Extract_binding_expressions_to_variable.message,
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: 1};
}
const dest = foo();
export const x: number = dest.x;
const temp = dest.y;
export const y: number = temp === undefined ? 0 : dest.y;
export const z = 42;`});
