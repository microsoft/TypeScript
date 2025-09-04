module A.B.C {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A {
    export module B {
        export class C { // Error
            name: string;
        }
    }
}

module M2.X {
    export class Point {
        x: number; y: number;
    }
}

namespace M2 {
    export module X {
        export var Point: number; // Error
    }
}


