//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IncompleteMemberVariables/parserErrorRecovery_IncompleteMemberVariable1.ts] ////

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
var Shapes;
(function (Shapes) {
    class Point {
        x;
        y;
        con;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        static origin = new Point(0, 0);
    }
    Shapes.Point = Point;
})(Shapes || (Shapes = {}));
var p = new Shapes.Point(3, 4);
var dist = p.getDist();
