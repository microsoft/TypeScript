// doc 8
// A struct cannot be assigned or cast to class and vice versa, even if their type shapes are similar.

class Point {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y
	}
}
var cp: Point = new Point(1,1);

struct Point2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y
	}
}
var sp: Point2 = new Point2(2,2);

cp = sp; // error
cp = <Point>sp; // error
sp = cp; // error
sp = <Point2>cp; // error

