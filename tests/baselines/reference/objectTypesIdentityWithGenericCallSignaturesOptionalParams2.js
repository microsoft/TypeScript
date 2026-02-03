//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericCallSignaturesOptionalParams2.ts] ////

//// [objectTypesIdentityWithGenericCallSignaturesOptionalParams2.ts]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class A {
    foo<T, U>(x: T, y?: U): T { return null; }
}

class B<T, U> {
    foo(x: T, y?: U): T { return null; }
}

class C<T, U> {
    foo(x: T, y?: U): T { return null; }
}

interface I<T, U> {
    foo(x: T, y?: U): T;
}

interface I2 {
    foo<T, U>(x: T, y?: U): T;
}

var a: { foo<T, U>(x: T, y?: U): T }
var b = { foo<T, U>(x: T, y?: U) { return x; } };

function foo1(x: A);
function foo1(x: A); // error
function foo1(x: any) { }

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

function foo5(x: A);
function foo5(x: B<string, number>); // ok
function foo5(x: any) { }

function foo5b(x: A);
function foo5b(x: C<string, number>); // ok
function foo5b(x: any) { }

function foo6(x: A);
function foo6(x: I<string, number>); // ok
function foo6(x: any) { }

function foo7(x: A);
function foo7(x: typeof a); // no error, bug?
function foo7(x: any) { }

function foo8(x: B<string, number>);
function foo8(x: I<string, number>); // error
function foo8(x: any) { }

function foo9(x: B<string, number>);
function foo9(x: C<string, number>); // error
function foo9(x: any) { }

function foo10(x: B<string, number>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<string, number>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<string, number>);
function foo12(x: C<string, number>); // error
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<string, number>); // ok
function foo12b(x: any) { }

function foo13(x: I<string, number>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<string, number>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2);
function foo15(x: C<string, number>); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithGenericCallSignaturesOptionalParams2.js]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function (x, y) { return null; };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (x, y) { return null; };
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) { return null; };
    return C;
}());
var a;
var b = { foo: function (x, y) { return x; } };
function foo1(x) { }
function foo1b(x) { }
function foo1c(x) { }
function foo2(x) { }
function foo3(x) { }
function foo4(x) { }
function foo5(x) { }
function foo5b(x) { }
function foo6(x) { }
function foo7(x) { }
function foo8(x) { }
function foo9(x) { }
function foo10(x) { }
function foo11(x) { }
function foo12(x) { }
function foo12b(x) { }
function foo13(x) { }
function foo14(x) { }
function foo15(x) { }
