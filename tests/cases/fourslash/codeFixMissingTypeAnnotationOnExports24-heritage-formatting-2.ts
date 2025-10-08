/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function mixin<T extends new (...a: any) => any>(ctor: T): T {
////    return ctor;
////}
////class Point2D { x = 0; y = 0; }
////export class Point3D2 extends mixin(Point2D) {
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
const Point3D2Base: typeof Point2D = mixin(Point2D);
export class Point3D2 extends Point3D2Base {
    z = 0;
}`
});
