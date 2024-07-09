module A {

    interface Point {
        x: number;
        y: number;

        fromOrigin(p: Point): number;
    }

    export class Point2d implements Point {
        constructor(public x: number, public y: number) { }

        fromOrigin(p: Point) {
            return 1;
        }
    }
}

