//// [autolift4.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
