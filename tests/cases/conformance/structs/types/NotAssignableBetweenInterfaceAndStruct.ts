// doc 8
// A struct cannot be assigned to interface and vice versa, even if their type shapes are similar.
interface P {
	x: number;
	y: number;
}
var ip: P;

struct Point2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y
	}
}
var sp: Point2 = new Point2(2,2);

ip = sp; // error
ip = <P>sp; // error
sp = ip; // error
sp = <Point2>ip; // error
