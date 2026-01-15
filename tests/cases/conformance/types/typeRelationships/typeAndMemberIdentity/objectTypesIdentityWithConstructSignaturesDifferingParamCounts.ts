// object types are identical structurally

class B {
    constructor(x: string, y: string) { return null; }
}

class C<T> {
    constructor(x: T, y: T) { return null; }
}

interface I {
    new(x: string): string;
}

interface I2<T> {
    new(x: T): T;
}

var a: { new(x: string, y: string): string }
var b = { new(x: string) { return ''; } }; // not a construct signature, function called new

function foo1b(x: B);
function foo1b(x: B); // error
function foo1b(x: any) { }

function foo1c(x: C<string>);
function foo1c(x: C<string>); // error
function foo1c(x: any) { }

function foo2(x: I);
function foo2(x: I); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo8(x: B);
function foo8(x: I); // ok
function foo8(x: any) { }

function foo9(x: B);
function foo9(x: C<string>); // error, types are structurally equal
function foo9(x: any) { }

function foo10(x: B);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I);
function foo12(x: C<string>); // ok
function foo12(x: any) { }

function foo12b(x: I2<string>);
function foo12b(x: C<string>); // ok
function foo12b(x: any) { }

function foo13(x: I);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2<string>);
function foo15(x: C<number>); // ok
function foo15(x: any) { }