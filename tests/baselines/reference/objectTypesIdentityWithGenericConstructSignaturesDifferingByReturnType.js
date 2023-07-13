//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType.ts] ////

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType.ts]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class B<T> {
    constructor(x: T) { return null; }
}

class C<T> {
    constructor(x: T) { return null; }
}

interface I<T> {
    new(x: T): Date;
}

interface I2 {
    new<T>(x: T): RegExp;
}

var a: { new<T>(x: T): T }
var b = { new<T>(x: T): T { return null; } }; // not a construct signature, function called new

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

function foo5(x: typeof a): number;
function foo5(x: typeof b): string; // ok
function foo5(x: any): any { }

function foo8(x: B<string>);
function foo8(x: I<string>); // ok
function foo8(x: any) { }

function foo9(x: B<string>);
function foo9(x: C<string>); // error since types are structurally equal
function foo9(x: any) { }

function foo10(x: B<string>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<string>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<string>);
function foo12(x: C<string>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<string>); // ok
function foo12b(x: any) { }

function foo13(x: I<string>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<string>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2);
function foo15(x: C<number>); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByReturnType.js]
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
function foo5(x) { }
function foo8(x) { }
function foo9(x) { }
function foo10(x) { }
function foo11(x) { }
function foo12(x) { }
function foo12b(x) { }
function foo13(x) { }
function foo14(x) { }
function foo15(x) { }
