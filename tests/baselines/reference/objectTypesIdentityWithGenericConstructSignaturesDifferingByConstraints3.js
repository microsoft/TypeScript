//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericConstructSignaturesDifferingByConstraints3.ts] ////

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByConstraints3.ts]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.

class One { foo: string }
class Two { foo: string }
interface Three { foo: string }
interface Four<T> { foo: T }
interface Five<T> extends Four<T> { }
interface Six<T, U> {
    foo: T;
}

class B<T extends U, U extends Two> {
    constructor(x: T, y: U) { return null; }
}

class C<T extends U, U extends Three> {
    constructor(x: T, y: U) { return null; }
}

class D<T extends U, U extends Four<string>> {
    constructor(x: T, y: U) { return null; }
}

interface I<T extends U, U extends Five<string>> {
    new(x: T, y: U): string;
}

interface I2 {
    new<T extends U, U extends Six<string, string>>(x: T, y: U): string;
}

var a: { new<T extends U, U extends One>(x: T, y: U): string }
var b = { new<T extends U, U extends Two>(x: T, y: U) { return ''; } }; // not a construct signature, function called new

function foo1b(x: B<Two, Two>);
function foo1b(x: B<Two, Two>); // error
function foo1b(x: any) { }

function foo1c(x: C<Three, Three>);
function foo1c(x: C<Three, Three>); // error
function foo1c(x: any) { }

function foo2(x: I<Five<string>, Five<string>>);
function foo2(x: I<Five<string>, Five<string>>); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: typeof b);
function foo4(x: typeof b); // error
function foo4(x: any) { }

function foo5c(x: C<Three, Three>);
function foo5c(x: D<Four<string>, Four<string>>); // error
function foo5c(x: any) { }

function foo6c(x: C<Three, Three>);
function foo6c(x: D<Four<string>, Four<string>>); // error
function foo6c(x: any) { }

function foo8(x: B<Two, Two>);
function foo8(x: I<Five<string>, Five<string>>); // error
function foo8(x: any) { }

function foo9(x: B<Two, Two>);
function foo9(x: C<Three, Three>); // error
function foo9(x: any) { }

function foo10(x: B<Two, Two>);
function foo10(x: typeof a); // ok
function foo10(x: any) { }

function foo11(x: B<Two, Two>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<Five<string>, Five<string>>);
function foo12(x: C<Three, Three>); // ok
function foo12(x: any) { }

function foo12b(x: I2);
function foo12b(x: C<Three, Three>); // ok
function foo12b(x: any) { }

function foo13(x: I<Five<string>, Five<string>>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<Five<string>, Five<string>>);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingByConstraints3.js]
// Two call or construct signatures are considered identical when they have the same number of type parameters and, considering those 
// parameters pairwise identical, have identical type parameter constraints, identical number of parameters with identical kind(required, 
// optional or rest) and types, and identical return types.
var One = /** @class */ (function () {
    function One() {
    }
    return One;
}());
var Two = /** @class */ (function () {
    function Two() {
    }
    return Two;
}());
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
var D = /** @class */ (function () {
    function D(x, y) {
        return null;
    }
    return D;
}());
var a;
var b = { new: function (x, y) { return ''; } }; // not a construct signature, function called new
function foo1b(x) { }
function foo1c(x) { }
function foo2(x) { }
function foo3(x) { }
function foo4(x) { }
function foo5c(x) { }
function foo6c(x) { }
function foo8(x) { }
function foo9(x) { }
function foo10(x) { }
function foo11(x) { }
function foo12(x) { }
function foo12b(x) { }
function foo13(x) { }
function foo14(x) { }
