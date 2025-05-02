//// [tests/cases/compiler/castTest.ts] ////

//// [castTest.ts]
var x : any = 0;
var z = <number> x;
var y = x + z;

var a = <any>0;
var b = <boolean>true;
var s = <string>"";

var ar = <any[]>null;

var f = <(res : number) => void>null;

declare class Point
{
    x: number;
    y: number;
    add(dx: number, dy: number): Point;
    mult(p: Point): Point;
    constructor(x: number, y: number);
}

var p_cast = <Point> ({
    x: 0,
    y: 0,
    add: function(dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    },
    mult: function(p) { return p; }
})



//// [castTest.js]
var x = 0;
var z = x;
var y = x + z;
var a = 0;
var b = true;
var s = "";
var ar = null;
var f = null;
var p_cast = ({
    x: 0,
    y: 0,
    add: function (dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    },
    mult: function (p) { return p; }
});
