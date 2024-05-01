/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function mixin<T extends new (...a: any) => any>(ctor: T): T {
////    return ctor;
////}
////class Point2D { x = 0; y = 0; }
////interface I{}
////export class Point3D extends
////    /** Base class */
////    mixin(Point2D)
////    // Test
////    implements I
////    {
////              z = 0;
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
interface I{}
const Point3DBase: typeof Point2D =
    /** Base class */
    mixin(Point2D);
export class Point3D extends Point3DBase
    // Test
    implements I
    {
              z = 0;
}`
});
