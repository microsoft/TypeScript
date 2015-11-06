struct C {
}

var c: C;
var o: {} = c; // error
c = 1; // error
c = { foo: '' }; // error
c = () => { }; // error
c = new C(); // ok

struct D {
    constructor() {
        return 1; // error
    }
}

var d: D;
var o: {} = d; // error
d = 1; // error
d = { foo: '' }; // error
d = () => { }; // error
d = c; // error, no inheritance

struct E {
	foo: number;
}

var e: E;
e = 1; // error, Type 'number' is not assignable to type 'E'
