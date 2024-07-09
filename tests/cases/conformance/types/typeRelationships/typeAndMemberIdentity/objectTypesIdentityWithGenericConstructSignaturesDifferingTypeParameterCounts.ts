// object types are identical structurally

class B<U, V> {
    constructor(x: U) { return null; }
}

class C<V, W, X> {
    constructor(x: V) { return null; }
}

interface I<X, Y, Z, A> {
    new(x: X): B<X,Y>;
}

interface I2 {
    new <Y, Z, A, B>(x: Y): C<Y, Z, A>;
}

var a: { new <Z, A, B, CC, D>(x: Z): C<Z, A, B>; }
var b = { new<A, B, C, D, E, F>(x: A) { return x; } };

function foo1b(x: B<string, string>);
function foo1b(x: B<string, string>); // error
function foo1b(x: any) { }

function foo1c(x: C<string, number, boolean>);
function foo1c(x: C<string, number, boolean>); // error
function foo1c(x: any) { }

function foo2(x: I<string, boolean, number, string>);
function foo2(x: I<string, boolean, number, string>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo8(x: B<string, string>);
function foo8(x: I<string, string, boolean, Date>); // BUG 832086
function foo8(x: any) { }

function foo9(x: B<string, number>);
function foo9(x: C<string, number, B<string, string>>); // error
function foo9(x: any) { }

function foo10(x: B<string, boolean>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<string, boolean>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<B<string, number>, number, Date, string>);
function foo12(x: C<B<string, number>, number, Date>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<string, string, boolean>); // BUG 832086
function foo12b(x: any) { }

function foo13(x: I<string, Date, RegExp, Date>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<string, Date, RegExp, boolean>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }