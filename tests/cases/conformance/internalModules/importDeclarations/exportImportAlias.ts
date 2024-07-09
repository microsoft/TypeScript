// expect no errors here

module A {

    export var x = 'hello world'
    export class Point {
        constructor(public x: number, public y: number) { }
    }
    export module B {
        export interface Id {
            name: string;
        }
    }
}

module C {
    export import a = A;
}

var a: string = C.a.x;
var b: { x: number; y: number; } = new C.a.Point(0, 0);
var c: { name: string };
var c: C.a.B.Id;

module X {
    export function Y() {
        return 42;
    }

    export module Y {
        export class Point {
            constructor(public x: number, public y: number) { }
        }
    }
}

module Z {

    // 'y' should be a fundule here
    export import y = X.Y;
}

var m: number = Z.y();
var n: { x: number; y: number; } = new Z.y.Point(0, 0);

module K {
    export class L {
        constructor(public name: string) { }
    }

    export module L {
        export var y = 12;
        export interface Point {
            x: number;
            y: number;
        }
    }
}

module M {
    export import D = K.L;
}

var o: { name: string };
var o = new M.D('Hello');

var p: { x: number; y: number; }
var p: M.D.Point;