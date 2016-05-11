//@target: ES5

// `readonly` won't work outside of property parameters
class X {
	method(readonly x: number) {}
	set x(readonly value: number) {}
}
(readonly x) => 0;