// @target: es2015
namespace A {

    class Point {
        x: number;
        y: number;
    }

    export class points {

        [idx: number]: Point;
        [idx: string]: Point;
    }
}

