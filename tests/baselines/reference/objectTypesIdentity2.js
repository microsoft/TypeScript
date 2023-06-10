//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentity2.ts] ////

//// [objectTypesIdentity2.ts]
// object types are identical structurally

class A {
    foo: number;
}

class B {
    foo: boolean;
}

class C<T> {
    foo: T;
}

interface I {
    foo: Date;
}

var a: { foo: RegExp; }
enum E { A }
var b = { foo: E.A };

function foo5(x: A);
function foo5(x: B); // ok
function foo5(x: any) { }

function foo5b(x: A);
function foo5b(x: C<string>); // ok
function foo5b(x: any) { }

function foo6(x: A);
function foo6(x: I); // ok
function foo6(x: any) { }

function foo7(x: A);
function foo7(x: typeof a); // ok
function foo7(x: any) { }

function foo8(x: B);
function foo8(x: I); // ok
function foo8(x: any) { }

function foo9(x: B);
function foo9(x: C<string>); // ok
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

function foo13(x: I);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

//// [objectTypesIdentity2.js]
// object types are identical structurally
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var b = { foo: E.A };
function foo5(x) { }
function foo5b(x) { }
function foo6(x) { }
function foo7(x) { }
function foo8(x) { }
function foo9(x) { }
function foo10(x) { }
function foo11(x) { }
function foo12(x) { }
function foo13(x) { }
function foo14(x) { }
