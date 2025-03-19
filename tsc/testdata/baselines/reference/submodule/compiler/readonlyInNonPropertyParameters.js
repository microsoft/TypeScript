//// [tests/cases/compiler/readonlyInNonPropertyParameters.ts] ////

//// [readonlyInNonPropertyParameters.ts]
// `readonly` won't work outside of property parameters
class X {
	method(readonly x: number) {}
	set x(readonly value: number) {}
}
(readonly x) => 0;
// OK to use `readonly` as a name
(readonly) => 0;

//// [readonlyInNonPropertyParameters.js]
// `readonly` won't work outside of property parameters
class X {
    method(x) { }
    set x(value) { }
}
(x) => 0;
// OK to use `readonly` as a name
(readonly) => 0;
