// adding the var makes this an instantiated module

module M {
    export interface Point { x: number; y: number }
    export var Point = 1;
}

// primary expression
var m: typeof M;
var m = M;

var a1: number;
var a1 = M.Point;
var a1 = m.Point;

var p1: { x: number; y: number; }
var p1: M.Point;

// making the point a class instead of an interface 
// makes this an instantiated mmodule
module M2 {
    export class Point {
        x: number;
        y: number;
        static Origin(): Point {
            return { x: 0, y: 0 };
        }
    }
}

var m2: typeof M2;
var m2 = M2;

// static side of the class
var a2: typeof M2.Point;
var a2 = m2.Point;
var a2 = M2.Point;
var o: M2.Point = a2.Origin();

var p2: { x: number; y: number }
var p2: M2.Point;
var p2 = new m2.Point();
var p2 = new M2.Point();

module M3 {
    export enum Color { Blue, Red }
}

var m3: typeof M3;
var m3 = M3;

var a3: typeof M3.Color;
var a3 = m3.Color;
var a3 = M3.Color;
var blue: M3.Color = a3.Blue;

var p3: M3.Color;
var p3 = M3.Color.Red;
var p3 = m3.Color.Blue;
