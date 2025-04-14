//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType2.ts] ////

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType2.ts]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class B<T extends Date> {
    constructor(x: T) { return null; }
}

class C<T extends Date> {
    constructor(x: T) { return null; }
}

interface I<T extends Date> {
    new(x: T): Date;
}

interface I2 {
    new<T extends Date>(x: T): RegExp;
}

var a: { new<T extends Date>(x: T): T }
var b = { new<T extends Date>(x: T) { return null; } }; // not a construct signature, function called new

function foo1b(x: B<Date>);
function foo1b(x: B<Date>); // error
function foo1b(x: any) { }

function foo1c(x: C<Date>);
function foo1c(x: C<Date>); // error
function foo1c(x: any) { }

function foo2(x: I<Date>);
function foo2(x: I<Date>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo8(x: B<Date>);
function foo8(x: I<Date>); // ok
function foo8(x: any) { }

function foo9(x: B<Date>);
function foo9(x: C<Date>); // error since types are structurally equal
function foo9(x: any) { }

function foo10(x: B<Date>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<Date>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<Date>);
function foo12(x: C<Date>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<Date>); // ok
function foo12b(x: any) { }

function foo13(x: I<Date>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<Date>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2);
function foo15(x: C<Date>); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType2.js]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.
var B = /** @class */ (function () {
    function B(x) {
        return null;
    }
    return B;
}());
var C = /** @class */ (function () {
    function C(x) {
        return null;
    }
    return C;
}());
var a;
var b = { new: function (x) { return null; } }; // not a construct signature, function called new
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
function foo15(x) { }
