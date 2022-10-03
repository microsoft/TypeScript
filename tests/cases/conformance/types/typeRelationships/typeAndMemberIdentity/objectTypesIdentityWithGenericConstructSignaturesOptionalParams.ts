// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class B<T> {
    constructor(x: T, y?: T) { return null; }
}

class C<T> {
    constructor(x: T, y?: T) { return null; }
}

interface I<T> {
    new(x: T, y?: T): B<T>;
}

interface I2 {
    new<T>(x: T, y?: T): C<T>;
}

var a: { new<T>(x: T, y?: T): B<T> }
var b = { new<T>(x: T, y?: T) { return new C<T>(x, y); } }; // not a construct signature, function called new

function foo1b(x: B<string>);
function foo1b(x: B<string>); // error
function foo1b(x: any) { }

function foo1c(x: C<string>);
function foo1c(x: C<string>); // error
function foo1c(x: any) { }

function foo2(x: I<string>);
function foo2(x: I<string>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo8(x: B<string>): string;
function foo8(x: I<string>): number; // BUG 832086
function foo8(x: any): any { }

function foo9(x: B<string>);
function foo9(x: C<string>); // error, differ only by return type
function foo9(x: any) { }

function foo10(x: B<string>);
function foo10(x: typeof a); // BUG 832086
function foo10(x: any) { }

function foo11(x: B<string>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<string>);
function foo12(x: C<string>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<string>); // BUG 832086
function foo12b(x: any) { }

function foo13(x: I<string>);
function foo13(x: typeof a); // BUG 832086
function foo13(x: any) { }

function foo14(x: I<string>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }