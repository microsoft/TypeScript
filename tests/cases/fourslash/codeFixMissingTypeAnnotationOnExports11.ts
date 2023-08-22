/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function mixin<T extends new (...a: any) => any>(ctor: T): T {
////     return ctor;
//// }
//// class Point2D { x = 0; y = 0; }
//// export class Point3D extends mixin(Point2D) {  z = 0; }

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
    index: 0,
    newFileContent:
`function mixin<T extends new (...a: any) => any>(ctor: T): T {
    return ctor;
}
class Point2D { x = 0; y = 0; }
const Point3DBase: typeof Point2D = (mixin(Point2D));
export class Point3D extends Point3DBase {
    z = 0;
}`
});
