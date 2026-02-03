//// [tests/cases/compiler/autolift4.ts] ////

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getDist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.origin = new Point(0, 0);
    return Point;
}());
var Point3D = /** @class */ (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z, m) {
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    Point3D.prototype.getDist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.m);
    };
    return Point3D;
}(Point));
