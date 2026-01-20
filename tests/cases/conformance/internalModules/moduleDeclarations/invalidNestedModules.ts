namespace A.B.C {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A {
    export namespace B {
        export class C { // Error
            name: string;
        }
    }
}

namespace M2.X {
    export class Point {
        x: number; y: number;
    }
}

namespace M2 {
    export namespace X {
        export var Point: number; // Error
    }
}


