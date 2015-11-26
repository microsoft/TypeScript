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

