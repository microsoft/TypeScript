function mixin<T extends new (...a: any) => any>(ctor: T): T {
    return ctor;
}
class Point2D {
    x = 0;
    y = 0;
}
const Point3DBase: typeof Point2D = (mixin(Point2D));
export class Point3D extends Point3DBase {
    z = 0;
}
