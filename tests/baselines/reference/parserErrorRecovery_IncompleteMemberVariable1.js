//// [parserErrorRecovery_IncompleteMemberVariable1.ts]
// Interface
interface IPoint {
    getDist(): number;
}

// Module
module Shapes {

    // Class
    export class Point implements IPoint {

        public con: "hello";
        // Constructor
        constructor (public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        // Static member
        static origin = new Point(0, 0);
    }

}

// Local variables
var p: IPoint = new Shapes.Point(3, 4);
var dist = p.getDist();


//// [parserErrorRecovery_IncompleteMemberVariable1.js]
// Module
var Shapes;
(function (Shapes) {
    // Class
    var Point = /** @class */ (function () {
        // Constructor
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        // Instance member
        Point.prototype.getDist = function () { return Math.sqrt(this.x * this.x + this.y * this.y); };
        // Static member
        Point.origin = new Point(0, 0);
        return Point;
    }());
    Shapes.Point = Point;
})(Shapes || (Shapes = {}));
// Local variables
var p = new Shapes.Point(3, 4);
var dist = p.getDist();
