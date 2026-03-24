// @target: es2015
namespace A {

    interface Point {
        x: number;
        y: number;
    }

    export interface points {

        [idx: number]: Point;
        [idx: string]: Point;
    }
}

