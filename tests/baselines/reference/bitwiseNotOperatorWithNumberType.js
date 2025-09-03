//// [tests/cases/conformance/expressions/unaryOperators/bitwiseNotOperator/bitwiseNotOperatorWithNumberType.ts] ////

//// [bitwiseNotOperatorWithNumberType.ts]
// ~ operator on number type
var NUMBER: number;
var NUMBER1: number[] = [1, 2];

function foo(): number { return 1; }

class A {
    public a: number;
    static foo() { return 1; }
}
module M {
    export var n: number;
}

var objA = new A();

// number type var
var ResultIsNumber1 = ~NUMBER;
var ResultIsNumber2 = ~NUMBER1;

// number type literal
var ResultIsNumber3 = ~1;
var ResultIsNumber4 = ~{ x: 1, y: 2};
var ResultIsNumber5 = ~{ x: 1, y: (n: number) => { return n; } };

// number type expressions
var ResultIsNumber6 = ~objA.a;
var ResultIsNumber7 = ~M.n;
var ResultIsNumber8 = ~NUMBER1[0];
var ResultIsNumber9 = ~foo();
var ResultIsNumber10 = ~A.foo();
var ResultIsNumber11 = ~(NUMBER + NUMBER);

// multiple ~ operators
var ResultIsNumber12 = ~~NUMBER;
var ResultIsNumber13 = ~~~(NUMBER + NUMBER);

// miss assignment operators
~NUMBER;
~NUMBER1;
~foo();
~objA.a;
~M.n;
~objA.a, M.n;

//// [bitwiseNotOperatorWithNumberType.js]
// ~ operator on number type
var NUMBER;
var NUMBER1 = [1, 2];
function foo() { return 1; }
class A {
    a;
    static foo() { return 1; }
}
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
// number type var
var ResultIsNumber1 = ~NUMBER;
var ResultIsNumber2 = ~NUMBER1;
// number type literal
var ResultIsNumber3 = ~1;
var ResultIsNumber4 = ~{ x: 1, y: 2 };
var ResultIsNumber5 = ~{ x: 1, y: (n) => { return n; } };
// number type expressions
var ResultIsNumber6 = ~objA.a;
var ResultIsNumber7 = ~M.n;
var ResultIsNumber8 = ~NUMBER1[0];
var ResultIsNumber9 = ~foo();
var ResultIsNumber10 = ~A.foo();
var ResultIsNumber11 = ~(NUMBER + NUMBER);
// multiple ~ operators
var ResultIsNumber12 = ~~NUMBER;
var ResultIsNumber13 = ~~~(NUMBER + NUMBER);
// miss assignment operators
~NUMBER;
~NUMBER1;
~foo();
~objA.a;
~M.n;
~objA.a, M.n;
