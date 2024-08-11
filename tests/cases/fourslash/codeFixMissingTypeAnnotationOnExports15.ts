/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() {
////     return { x: 1, y: 1 } as const;
//// }
//// export const { x, y = 0 } = foo();

verify.codeFix({
    description: ts.Diagnostics.Extract_binding_expressions_to_variable.message,
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: 1 } as const;
}
const dest = foo();
export const x: 1 = dest.x;
const temp = dest.y;
export const y: 1 | 0 = temp === undefined ? 0 : dest.y;`
});
