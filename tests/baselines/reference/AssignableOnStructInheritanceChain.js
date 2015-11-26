//// [AssignableOnStructInheritanceChain.ts]
// doc 8
// A subtype struct can be assigned to a supertype struct.

struct Point2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y
	}
}

struct Point3 extends Point2{
	z: number;
	constructor(x: number, y: number, z: number) {
		super(x, y);
		this.z = z;
	}
}

var p2: Point2;
var p3: Point3;
var p21 = new Point2(1,1);
var p31 = new Point3(1,1,1);

p2 = p21; // ok
p2 = p31; // ok
p3 = p21; // error
p3 = p31; // ok



//// [AssignableOnStructInheritanceChain.js]
// doc 8
// A subtype struct can be assigned to a supertype struct.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point2 = (function () {
    var _Point2 = new TypedObject.StructType({
        x: TypedObject.float64,
        y: TypedObject.float64,
    });
    function _ctor(x, y) {
        this.x = x;
        this.y = y;
    }
    function Point2(x, y) {
        var obj = new _Point2();
        _ctor.call(obj ,);
        return obj;
    }
    Point2._TO = _Point2;
    return Point2;
})();
var Point3 = (function () {
    var _Point3 = new TypedObject.StructType({
        z: TypedObject.float64,
    });
    function _ctor(x, y, z) {
        _super.call(this, x, y);
        this.z = z;
    }
    function Point3(x, y, z) {
        var obj = new _Point3();
        _ctor.call(obj ,);
        return obj;
    }
    Point3._TO = _Point3;
    return Point3;
})();
var p2;
var p3;
var p21 = new Point2(1, 1);
var p31 = new Point3(1, 1, 1);
p2 = p21; // ok
p2 = p31; // ok
p3 = p21; // error
p3 = p31; // ok
