//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericConstructSignaturesDifferingTypeParameterNames.ts] ////

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingTypeParameterNames.ts]
// object types are identical structurally

class B<U> {
    constructor(x: U) { return null; }
}

class C<V> {
    constructor(x: V) { return null; }
}

interface I<X> {
    new(x: X): B<X>;
}

interface I2 {
    new<Y>(x: Y): C<Y>;
}

var a: { new<Z>(x: Z): B<Z> }
var b = { new<A>(x: A) { return new C<A>(x); } };

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

function foo8(x: B<string>);
function foo8(x: I<string>); // BUG 832086
function foo8(x: any) { }

function foo9(x: B<string>);
function foo9(x: C<string>); // error
function foo9(x: any) { }

function foo10(x: B<string>);
function foo10(x: typeof a); // BUG 832086
function foo10(x: any) { }

function foo11(x: B<string>);
function foo11(x: typeof b); // ok
function foo11(x: any) { }

function foo12(x: I<string>);
function foo12(x: C<string>); // error
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

//// [objectTypesIdentityWithGenericConstructSignaturesDifferingTypeParameterNames.js]
// object types are identical structurally
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
var b = { new: function (x) { return new C(x); } };
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
