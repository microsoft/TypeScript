// expect no errors here

namespace A {

    export var x = 'hello world'
    export class Point {
        constructor(public x: number, public y: number) { }
    }
    export namespace B {
        export interface Id {
            name: string;
        }
    }
}

namespace C {
    export import a = A;
}

var a: string = C.a.x;
var b: { x: number; y: number; } = new C.a.Point(0, 0);
var c: { name: string };
var c: C.a.B.Id;

namespace X {
    export function Y() {
        return 42;
    }

    export namespace Y {
        export class Point {
            constructor(public x: number, public y: number) { }
        }
    }
}

namespace Z {

    // 'y' should be a fundule here
    export import y = X.Y;
}

var m: number = Z.y();
var n: { x: number; y: number; } = new Z.y.Point(0, 0);

namespace K {
    export class L {
        constructor(public name: string) { }
    }

    export namespace L {
        export var y = 12;
        export interface Point {
            x: number;
            y: number;
        }
    }
}

namespace M {
    export import D = K.L;
}

var o: { name: string };
var o = new M.D('Hello');

var p: { x: number; y: number; }
var p: M.D.Point;