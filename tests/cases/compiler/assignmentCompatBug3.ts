function makePoint(x: number, y: number) {
    return {
        get x() { return x;}, // shouldn't be "void"
        get y() { return y;}, // shouldn't be "void"
        //x: "yo",
        //y: "boo",
        dist: function () {
			return Math.sqrt(x*x+y*y); // shouldn't be picking up "x" and "y" from the object lit
		}
	}
}

class C {
    get x() {
        return 0;
    }
}

function foo(test: string) { }

var x: any;
var y: any;

foo(x);
foo(x + y);