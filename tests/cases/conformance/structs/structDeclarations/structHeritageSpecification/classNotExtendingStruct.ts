struct S {
	bar: string;
}

class C extends S { // error, class may only extend class
	foo: string;
}
