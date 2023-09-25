
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

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message },
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
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
