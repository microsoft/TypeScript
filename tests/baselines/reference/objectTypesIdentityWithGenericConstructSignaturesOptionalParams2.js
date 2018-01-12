//// [objectTypesIdentityWithGenericConstructSignaturesOptionalParams2.ts]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class B<T, U> {
    constructor(x: T, y?: U) { return null; }
}

class C<T, U> {
    constructor(x: T, y?: U) { return null; }
}

interface I<T, U> {
    new (x: T, y?: U): B<T, U>;
}

interface I2 {
    new <T, U>(x: T, y?: U): C<T, U>;
}

var a: { new<T, U>(x: T, y?: U): B<T,U> }
var b = { new<T, U>(x: T, y?: U) { return new C<T, U>(x, y); } }; // not a construct signature, function called new

function foo1b(x: B<string, number>);
function foo1b(x: B<string, number>); // error
function foo1b(x: any) { }

function foo1c(x: C<string, number>);
function foo1c(x: C<string, number>); // error
function foo1c(x: any) { }

function foo2(x: I<string, number>);
function foo2(x: I<string, number>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo8(x: B<string, number>);
function foo8(x: I<string, number>); // BUG 832086
function foo8(x: any) { }

function foo9(x: B<string, number>);
function foo9(x: C<string, number>); // error
function foo9(x: any) { }

function foo10(x: B<string, number>);
function foo10(x: typeof a); // BUG 832086
function foo10(x: any) { }

function foo11(x: B<string, number>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<string, number>);
function foo12(x: C<string, number>); // BUG 832086
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<string, number>); // ok
function foo12b(x: any) { }

function foo13(x: I<string, number>);
function foo13(x: typeof a); // BUG 832086
function foo13(x: any) { }

function foo14(x: I<string, number>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

//// [objectTypesIdentityWithGenericConstructSignaturesOptionalParams2.js]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.
var B = /** @class */ (function () {
    function B(x, y) {
        return null;
    }
    return B;
}());
var C = /** @class */ (function () {
    function C(x, y) {
        return null;
    }
    return C;
}());
var a;
var b = { "new": function (x, y) { return new C(x, y); } }; // not a construct signature, function called new
function foo1b(x) { }
function foo1c(x) { }
function foo2(x) { }
function foo3(x) { }
function foo4(x) { }
function foo8(x) { }
function foo9(x) { }
function foo10(x) { }
function foo11(x) { }
function foo12(x) { }
function foo12b(x) { }
function foo13(x) { }
function foo14(x) { }
