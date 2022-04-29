// @filename: module.d.ts
declare module A {
    export module Point {
        export var Origin: {
            x: number;
            y: number;
        }
    }
}

// @filename: classPoint.ts
module A {
    export class Point {
        constructor(public x: number, public y: number) { }
    }
}

// @filename: test.ts
var p: { x: number; y: number; }
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000