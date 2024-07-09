//// [tests/cases/compiler/constraints0.ts] ////

//// [constraints0.ts]
interface A {
	a: number;
}

interface B {
	b: string;
}

interface C<T extends A> {
    x: T;
}

var v1: C<A>; // should work
var v2: C<B>; // should not work

var y = v1.x.a; // 'a' should be of type 'number'

//// [constraints0.js]
var v1; // should work
var v2; // should not work
var y = v1.x.a; // 'a' should be of type 'number'
