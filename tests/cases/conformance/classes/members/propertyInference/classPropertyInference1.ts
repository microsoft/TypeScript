class Alpha {
	constructor() {
		this.sizingThing = 'big';
		if(true) {
			this.weight = 42;
		}
		this.sizingThing = 42;
	}
}

var a = new Alpha();

var s = a.sizingThing; // Should be OK
s.substr(0);    // Should be OK
s.substr('wat'); // Should error

var w = a.weight; // Should be OK
w.toFixed();      // Should be OK
w.toFixed('nop');      // Should error

var e = a.wait; // Should error

class Beta {
	hasMember = true;
	constructor() {
		this.size = 42;
		if(true) {
			this.weight = 'heavy';
		}
	}
}
