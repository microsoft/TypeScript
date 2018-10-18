//// [objectTypesIdentityWithCallSignaturesWithOverloads.ts]
// object types are identical structurally

class A {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: any): any { return null; }
}

class B {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: any): any { return null; }
}

class C<T> {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: T): T;
    foo(x: any): any { return null; }
}

interface I {
    foo(x: number): number;
    foo(x: string): string;    
}

interface I2<T> {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: T): T;
}

var a: {
    foo(x: number): number
    foo(x: string): string
}

var b = {
    foo(x: any) { return <any>''; }
};

function foo1(x: A);
function foo1(x: A); // error
function foo1(x: any) { }

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

function foo5(x: A);
function foo5(x: B); // error
function foo5(x: any) { }

function foo5b(x: A);
function foo5b(x: C<string>); // ok
function foo5b(x: any) { }

function foo6(x: A);
function foo6(x: I); // BUG 831930
function foo6(x: any) { }

function foo7(x: A);
function foo7(x: typeof a); // BUG 831930
function foo7(x: any) { }

function foo8(x: B);
function foo8(x: I); // BUG 831930
function foo8(x: any) { }

function foo9(x: B);
function foo9(x: C<string>); // ok
function foo9(x: any) { }

function foo10(x: B);
function foo10(x: typeof a); // BUG 831930
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
function foo13(x: typeof a);  // error
function foo13(x: any) { }

function foo14(x: I);
function foo14(x: typeof b); // ok
function foo14(x: any) { }

function foo15(x: I2<string>);
function foo15(x: C<number>); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithCallSignaturesWithOverloads.js]
// object types are identical structurally
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function (x) { return null; };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (x) { return null; };
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) { return null; };
    return C;
}());
var a;
var b = {
    foo: function (x) { return ''; }
};
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
