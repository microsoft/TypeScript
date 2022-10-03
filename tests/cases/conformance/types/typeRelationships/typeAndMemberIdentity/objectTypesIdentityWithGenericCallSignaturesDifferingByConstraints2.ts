// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class A {
    foo<T extends U, U extends Date>(x: T, y: U): string { return null; }
}

class B<T extends U, U extends Array<number>> {
    foo(x: T, y: U): string { return null; }
}

class C<T extends U, U extends String> {
    foo(x: T, y: U): string { return null; }
}

class D<T extends U, U extends Number> {
    foo(x: T, y: U): string { return null; }
}

interface I<T extends U, U extends Number> {
    foo(x: T, y: U): string;
}

interface I2 {
    foo<T extends U, U extends Boolean>(x: T, y: U): string;
}

var a: { foo<T extends U, U extends Array<string>>(x: T, y: U): string }
var b = { foo<T extends U, U extends RegExp>(x: T, y: U) { return ''; } };

function foo1(x: A);
function foo1(x: A); // error
function foo1(x: any) { }

function foo1b(x: B<Array<number>, Array<number>>);
function foo1b(x: B<Array<number>, Array<number>>); // error
function foo1b(x: any) { }

function foo1c(x: C<String, String>);
function foo1c(x: C<String, String>); // error
function foo1c(x: any) { }

function foo2(x: I<Number, Number>);
function foo2(x: I<Number, Number>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo5(x: A);
function foo5(x: B<Array<number>, Array<number>>); // ok
function foo5(x: any) { }

function foo5b(x: A);
function foo5b(x: C<String, String>); // ok
function foo5b(x: any) { }

function foo5c(x: C<String, String>);
function foo5c(x: D<Number, Number>); // ok
function foo5c(x: any) { }

function foo6c(x: C<String, String>);
function foo6c(x: D<any, Number>); // error, "any" does not satisfy the constraint
function foo6c(x: any) { }

function foo6(x: A);
function foo6(x: I<Number, Number>); // ok
function foo6(x: any) { }

function foo7(x: A);
function foo7(x: typeof a); // ok
function foo7(x: any) { }

function foo8(x: B<Array<number>, Array<number>>);
function foo8(x: I<Number, Number>); // ok
function foo8(x: any) { }

function foo9(x: B<Array<number>, Array<number>>);
function foo9(x: C<String, String>); // ok
function foo9(x: any) { }

function foo10(x: B<Array<number>, Array<number>>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<Array<number>, Array<number>>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<Number, Number>);
function foo12(x: C<String, String>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<String, String>); // ok
function foo12b(x: any) { }

function foo13(x: I<Number, Number>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<Number, Number>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2);
function foo15(x: C<String, String>); // ok
function foo15(x: any) { }