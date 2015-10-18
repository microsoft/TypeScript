//// [autolift4.ts]
class Point {

    constructor(public x: number, public y: number) {

    }
    getDist() { 
        return Math.sqrt(this.x*this.x + this.y*this.y); 
    }
    static origin = new Point(0,0);
}

class Point3D extends Point {

    constructor(x: number, y: number, public z: number, m:number) {
        super(x, y);
    }
    
    getDist() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.m);
    }        
}



//// [autolift4.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getDist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.origin = new Point(0, 0);
    return Point;
})();
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z, m) {
        _super.call(this, x, y);
        this.z = z;
    }
    Point3D.prototype.getDist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.m);
    };
    return Point3D;
})(Point);
