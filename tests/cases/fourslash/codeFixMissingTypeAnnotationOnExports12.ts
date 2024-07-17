/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() {
////     return { x: 1, y: 1 };
//// }
//// export const { x, y } = foo();

verify.codeFix({
    description: ts.Diagnostics.Extract_binding_expressions_to_variable.message,
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: 1 };
}
const dest = foo();
export const x: number = dest.x;
export const y: number = dest.y;`
});
