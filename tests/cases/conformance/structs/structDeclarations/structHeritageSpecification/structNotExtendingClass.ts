class C {
	foo: string;
	thing() { }
    static other() { }
}

struct D extends C { // error, struct can only extend struct
	bar: string;
}
