module enumdule {

    export class Point {
        constructor(public x: number, public y: number) { }
    }
}

enum enumdule {
    Red, Blue
}

var x: enumdule;
var x = enumdule.Red;

var y: { x: number; y: number };
var y = new enumdule.Point(0, 0);