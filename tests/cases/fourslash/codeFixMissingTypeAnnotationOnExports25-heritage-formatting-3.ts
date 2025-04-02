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
    { description: ts.Diagnostics.Extract_base_class_to_variable.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Extract_base_class_to_variable.message,
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
