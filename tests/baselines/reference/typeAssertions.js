//// [tests/cases/conformance/expressions/typeAssertions/typeAssertions.ts] ////

//// [typeAssertions.ts]
// Function call whose argument is a 1 arg generic function call with explicit type arguments
function fn1<T>(t: T) { }
function fn2(t: any) { }

fn1(fn2<string>(4)); // Error

var a: any;
var s: string;

// Type assertion of non - unary expression
var a = <any>"" + 4;
var s = "" + <any>4;

class SomeBase {
    private p;
}
class SomeDerived extends SomeBase {
    private x;
}
class SomeOther {
    private q;
}

// Type assertion should check for assignability in either direction
var someBase = new SomeBase();
var someDerived = new SomeDerived();
var someOther = new SomeOther();

someBase = <SomeBase>someDerived;
someBase = <SomeBase>someBase;
someBase = <SomeBase>someOther; // Error

someDerived = <SomeDerived>someDerived;
someDerived = <SomeDerived>someBase;
someDerived = <SomeDerived>someOther; // Error

someOther = <SomeOther>someDerived; // Error
someOther = <SomeOther>someBase; // Error
someOther = <SomeOther>someOther;

// Type assertion cannot be a type-predicate type
var numOrStr: number | string;
var str: string;
if(<numOrStr is string>(numOrStr === undefined)) { // Error
	str = numOrStr; // Error, no narrowing occurred
}

if((numOrStr === undefined) as numOrStr is string) { // Error
}



//// [typeAssertions.js]
// Function call whose argument is a 1 arg generic function call with explicit type arguments
function fn1(t) { }
function fn2(t) { }
fn1(fn2(4)); // Error
var a;
var s;
// Type assertion of non - unary expression
var a = "" + 4;
var s = "" + 4;
class SomeBase {
    p;
}
class SomeDerived extends SomeBase {
    x;
}
class SomeOther {
    q;
}
// Type assertion should check for assignability in either direction
var someBase = new SomeBase();
var someDerived = new SomeDerived();
var someOther = new SomeOther();
someBase = someDerived;
someBase = someBase;
someBase = someOther; // Error
someDerived = someDerived;
someDerived = someBase;
someDerived = someOther; // Error
someOther = someDerived; // Error
someOther = someBase; // Error
someOther = someOther;
// Type assertion cannot be a type-predicate type
var numOrStr;
var str;
if (is)
    string > (numOrStr === undefined);
{ // Error
    str = numOrStr; // Error, no narrowing occurred
}
if ((numOrStr === undefined))
    is;
string;
{ // Error
}
