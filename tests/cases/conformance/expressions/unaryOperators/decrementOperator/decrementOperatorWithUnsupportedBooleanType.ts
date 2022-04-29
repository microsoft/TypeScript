// -- operator on boolean type
var BOOLEAN: boolean;

function foo(): boolean { return true; }

class A {
    public a: boolean;
    static foo() { return true; }
}
module M {
    export var n: boolean;
}

var objA = new A();

// boolean type var
var ResultIsNumber1 = --BOOLEAN;

var ResultIsNumber2 = BOOLEAN--;

// boolean type literal
var ResultIsNumber3 = --true;
var ResultIsNumber4 = --{ x: true, y: false };
var ResultIsNumber5 = --{ x: true, y: (n: boolean) => { return n; } };

var ResultIsNumber6 = true--;
var ResultIsNumber7 = { x: true, y: false }--;
var ResultIsNumber8 = { x: true, y: (n: boolean) => { return n; } }--;

// boolean type expressions
var ResultIsNumber9 = --objA.a;
var ResultIsNumber10 = --M.n;
var ResultIsNumber11 = --foo();
var ResultIsNumber12 = --A.foo();

var ResultIsNumber13 = foo()--;
var ResultIsNumber14 = A.foo()--;
var ResultIsNumber15 = objA.a--;
var ResultIsNumber16 = M.n--;

// miss assignment operators
--true;
--BOOLEAN;
--foo();
--objA.a;
--M.n;
--objA.a, M.n;

true--;
BOOLEAN--;
foo()--;
objA.a--;
M.n--;
objA.a--, M.n--;