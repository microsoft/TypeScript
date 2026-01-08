namespace A.B.C {
    export interface Point {
        x: number;
        y: number;
    }
}

namespace A {
    export namespace B {
        var Point: C.Point = { x: 0, y: 0 }; // bug 832088: could not find module 'C'
    }
}

namespace M2.X {
    export interface Point {
        x: number; y: number;
    }
}

namespace M2 {
    export namespace X {
        export var Point: number;
    }
}

var m = M2.X;
var point: number;
var point = m.Point;

var p: { x: number; y: number; }
var p: M2.X.Point;
