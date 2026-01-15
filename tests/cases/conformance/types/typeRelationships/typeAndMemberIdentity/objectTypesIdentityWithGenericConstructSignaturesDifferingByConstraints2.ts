// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class B<T extends U, U extends Array<number>> {
    constructor(x: T, y: U) { return null; }
}

class C<T extends U, U extends String> {
    constructor(x: T, y: U) { return null; }
}

class D<T extends U, U extends Number> {
    constructor(x: T, y: U) { return null; }
}

interface I<T extends U, U extends Number> {
    new(x: T, y: U): string;
}

interface I2 {
    new<T extends U, U extends Boolean>(x: T, y: U): string;
}

var a: { new<T extends U, U extends Array<string>>(x: T, y: U): string }
var b = { new<T extends U, U extends RegExp>(x: T, y: U) { return ''; } }; // not a construct signature, function called new

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

function foo5c(x: C<String, String>);
function foo5c(x: D<Number, Number>); // ok
function foo5c(x: any) { }

function foo6c(x: C<String, String>);
function foo6c(x: D<any, Number>); // ok
function foo6c(x: any) { }

function foo8(x: B<Array<number>, Array<number>>);
function foo8(x: I<Number, Number>); // ok
function foo8(x: any) { }

function foo9(x: B<Array<number>, Array<number>>);
function foo9(x: C<String, String>); // error, types are structurally equal
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