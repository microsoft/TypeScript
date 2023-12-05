//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericCallSignaturesDifferingTypeParameterCounts2.ts] ////

//// [objectTypesIdentityWithGenericCallSignaturesDifferingTypeParameterCounts2.ts]
// object types are identical structurally


interface I<X, Y, Z, A> {
    (x: X): X;
}

interface I2 {
    <Y, Z, A, B>(x: Y): Y;
}

var a: { <Z, A, B, C, D>(x: Z): Z }

function foo1(x: I<string, boolean, number, string>);
function foo1(x: I<string, boolean, number, string>); // error
function foo1(x: any) { }

function foo2(x: I2);
function foo2(x: I2); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo13(x: I<boolean, string, number, Date>);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I<boolean, string, number, Date>);
function foo14(x: I2); // error
function foo14(x: any) { }

function foo14b(x: typeof a);
function foo14b(x: I2); // ok
function foo14b(x: any) { }

function foo15(x: I<boolean, string, number, Date>);
function foo15(x: I2); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithGenericCallSignaturesDifferingTypeParameterCounts2.js]
// object types are identical structurally
var a;
function foo1(x) { }
function foo2(x) { }
function foo3(x) { }
function foo13(x) { }
function foo14(x) { }
function foo14b(x) { }
function foo15(x) { }
