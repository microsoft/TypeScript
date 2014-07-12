module A {

    class Point {
        constructor(public x: number, public y: number) { }
    }

    export var Origin: Point = { x: 0, y: 0 };

    export var Unity = { start: new Point(0, 0), end: new Point(1, 0) };
}
