/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() {
////     return { x: 1, y: 1 };
//// }
//// export const { x: abcd, y: defg } = foo();

verify.codeFix({
    description: ts.Diagnostics.Extract_binding_expressions_to_variable.message,
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: 1 };
}
const dest = foo();
export const abcd: number = dest.x;
export const defg: number = dest.y;`
});
