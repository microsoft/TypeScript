namespace A {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A {
    class Point {
        fromCarthesian(p: A.Point) {
            return { x: p.x, y: p.y };
        }
    }
}

// ensure merges as expected
var p: { x: number; y: number; };
var p: A.Point;

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        export namespace Z {
            class Line {
                name: string;
            }
        }
    }
}

// ensure merges as expected
var l: { length: number; }
var l: X.Y.Z.Line;

