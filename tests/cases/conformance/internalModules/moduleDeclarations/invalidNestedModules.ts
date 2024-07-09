module A.B.C {
    export class Point {
        x: number;
        y: number;
    }
}

module A {
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

module M2 {
    export module X {
        export var Point: number; // Error
    }
}


