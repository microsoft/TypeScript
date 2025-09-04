// @filename: module.d.ts
declare namespace A {
    export namespace Point {
        export var Origin: {
            x: number;
            y: number;
        }
    }
}

// @filename: class.d.ts
declare namespace A {
    export class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
    }
}

// @filename: test.ts
var p: { x: number; y: number; }
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000
 