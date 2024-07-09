module A {

    export class Point {
        constructor(public x: number, public y: number) { }
    }

    export module B {
        export var Origin: Point = new Point(0, 0);

        export class Line {
            constructor(start: Point, end: Point) {

            }

            static fromOrigin(p: Point) {
                return new Line({ x: 0, y: 0 }, p);
            }
        }
    }
}