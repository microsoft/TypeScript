namespace A {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A{
    // expected error
    export class Point {
        origin: number;
        angle: number;
    }
}

module X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export module Y {
        export module Z {
            // expected error
            export class Line {
                name: string;
            }
        }
    }
}
