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

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        export namespace Z {
            // expected error
            export class Line {
                name: string;
            }
        }
    }
}
