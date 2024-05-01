
/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() {
////     return { x: 1, y: {42: {dd: "45"}, b: 2} };
//// }
//// function foo3(): "42" {
////     return "42";
//// }
//// export const { x: a , y: { [foo3()]: {dd: e} } } = foo();

verify.codeFix({
    description: ts.Diagnostics.Extract_binding_expressions_to_variable.message,
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: {42: {dd: "45"}, b: 2} };
}
function foo3(): "42" {
    return "42";
}
const dest = foo();
export const a: number = dest.x;
const _a = foo3();
export const e: string = (dest.y)[_a].dd;`
});
