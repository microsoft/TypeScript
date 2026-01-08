//@filename: part1.ts
namespace A {
    export interface Point {
        x: number;
        y: number;
    }

    export namespace Utils {
        export function mirror<T extends Point>(p: T) {
            return { x: p.y, y: p.x };
        }
    }
}

//@filename: part2.ts
namespace A {
    export var Origin: Point = { x: 0, y: 0 };

    export namespace Utils {
        export class Plane {
            constructor(public tl: Point, public br: Point) { }
        }
    }
}

//@filename: part3.ts
// test the merging actually worked

var o: { x: number; y: number };
var o: A.Point;
var o = A.Origin;
var o = A.Utils.mirror(o);

var p: { tl: A.Point; br: A.Point };
var p: A.Utils.Plane;
var p = new A.Utils.Plane(o, { x: 1, y: 1 });

