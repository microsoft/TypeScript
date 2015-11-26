// doc 3.1
// derived struct cannot override inherited member variables from base struct

struct Base {
    constructor(public x: number) { }
}

struct Derived extends Base {
	constructor(public x: number) { // cannot overrides inherited member variables
        super(x);
        this.x; // OK
    }
}

struct Derived1 extends Base {
	constructor(public y: number) { // ok
		super(y);
		this.x; // OK
		this.y; // OK
	}
}

var d: Derived1;
d.x;  // public, OK