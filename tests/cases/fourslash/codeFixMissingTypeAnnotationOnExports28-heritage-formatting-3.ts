/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function mixin<T extends new (...a: any) => any>(ctor: T): T {
////    return ctor;
////}
////class Point2D { x = 0; y = 0; }
////export class Point3D3 extends mixin(Point2D) /* DD*/ {
////    z = 0; 
////}

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
const Point3D3Base: typeof Point2D = mixin(Point2D) /* DD*/;
export class Point3D3 extends Point3D3Base {
    z = 0; 
}`
});
