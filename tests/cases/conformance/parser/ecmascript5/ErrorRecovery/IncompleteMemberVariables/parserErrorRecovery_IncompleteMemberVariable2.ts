// Interface
interface IPoint {
    getDist(): number;
}

// Module
namespace Shapes {

    // Class
    export class Point implements IPoint {

        public con:C "hello";
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
