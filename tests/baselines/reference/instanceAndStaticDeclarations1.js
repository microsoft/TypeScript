//// [tests/cases/compiler/instanceAndStaticDeclarations1.ts] ////

//// [instanceAndStaticDeclarations1.ts]
// from spec

class Point {
    constructor(public x: number, public y: number) { }
    public distance(p: Point) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    static origin = new Point(0, 0);
    static distance(p1: Point, p2: Point) { return p1.distance(p2); }
}

//// [instanceAndStaticDeclarations1.js]
// from spec
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Point.distance = function (p1, p2) { return p1.distance(p2); };
    Point.origin = new Point(0, 0);
    return Point;
}());
