interface C {
	foo: string;
}

struct D implements C { // error. struct cannot implement interface
	foo: string;
}
