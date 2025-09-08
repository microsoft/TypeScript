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