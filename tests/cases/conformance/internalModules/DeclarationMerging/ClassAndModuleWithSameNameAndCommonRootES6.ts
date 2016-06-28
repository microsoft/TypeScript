// @target: ES6
// @filename: class.ts
module X.Y {
    export class Point {
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        x: number;
        y: number;
    }
}

// @filename: module.ts
module X.Y {
    export module Point {
        export var Origin = new Point(0, 0);
    }
}

// @filename: test.ts
//var cl: { x: number; y: number; }
var cl = new X.Y.Point(1,1);
var cl = X.Y.Point.Origin; // error not expected here same as bug 83996 ?


// @filename: simple.ts
class A {
    id: string;
}

module A {
    export var Instance = new A();
}

// ensure merging works as expected
var a = A.Instance;
var a = new A();
var a: { id: string };
