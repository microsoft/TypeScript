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