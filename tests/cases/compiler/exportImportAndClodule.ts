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