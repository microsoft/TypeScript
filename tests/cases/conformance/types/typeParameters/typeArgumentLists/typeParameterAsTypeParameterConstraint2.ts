// using a type parameter as a constraint for a type parameter is invalid
// these should be errors unless otherwise noted

function foo<T, U extends T>(x: T, y: U): U { return y; } // this is now an error

foo(1, '');
foo(1, {});

interface NumberVariant extends Number {
    x: number;
}
var n: NumberVariant;
var r3 = foo(1, n);

function foo2<T, U extends { length: T }>(x: T, y: U) { return y; } // this is now an error
foo2(1, { length: '' });
foo2(1, { length: {} });
foo2([], ['']);