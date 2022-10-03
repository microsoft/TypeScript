module M {
    export interface Point { x: number; y: number }
    export var a = 1;
}

// primary expression
var m : typeof M;
var m = M;

var a1: number;
var a1 = M.a;

var a2: number;
var a2 = m.a;

module M2 {
    export module Point {
        export function Origin(): Point {
            return { x: 0, y: 0 };
        }
    }

    export interface Point {
        x: number;
        y: number;
    }
}

var p: { x: number; y: number; };
var p: M2.Point;

var p2: { Origin() : { x: number; y: number; } };
var p2: typeof M2.Point;

module M3 {
    export module Utils {
        export interface Point {
            x: number; y: number;
        }
    }

    export class Utils {
        name: string;
    }
}