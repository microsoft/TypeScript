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