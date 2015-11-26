// doc 3.3
// If a struct omits a constructor declaration, an automatic constructor is provided.

struct C {
    x = 1
    y = 'hello';
}

var c = new C();
var c2 = new C(null); // error, Supplied parameters do not match any signature of call target

/* struct D<T extends Date> {
    x = 2
    y: T = null;
}

var d = new D();
var d2 = new D(null); // error, Supplied parameters do not match any signature of call target
	*/