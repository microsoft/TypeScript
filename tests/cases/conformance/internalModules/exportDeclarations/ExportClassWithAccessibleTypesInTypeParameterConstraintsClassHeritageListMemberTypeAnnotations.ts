module A {

    export class Point {
        x: number;
        y: number;
    }

    export var Origin: Point = { x: 0, y: 0 };

    export class Point3d extends Point {
        z: number;
    }

    export var Origin3d: Point3d = { x: 0, y: 0, z: 0 };

    export class Line<TPoint extends Point>{
        constructor(public start: TPoint, public end: TPoint) { }
    }
}
