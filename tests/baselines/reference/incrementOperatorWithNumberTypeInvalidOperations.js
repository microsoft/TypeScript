//// [tests/cases/conformance/expressions/unaryOperators/incrementOperator/incrementOperatorWithNumberTypeInvalidOperations.ts] ////

//// [incrementOperatorWithNumberTypeInvalidOperations.ts]
// ++ operator on number type
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

//number type var
var ResultIsNumber1 = ++NUMBER1;
var ResultIsNumber2 = NUMBER1++;

// number type literal
var ResultIsNumber3 = ++1;
var ResultIsNumber4 = ++{ x: 1, y: 2};
var ResultIsNumber5 = ++{ x: 1, y: (n: number) => { return n; } };

var ResultIsNumber6 = 1++;
var ResultIsNumber7 = { x: 1, y: 2 }++;
var ResultIsNumber8 = { x: 1, y: (n: number) => { return n; } }++;

// number type expressions
var ResultIsNumber9 = ++foo();
var ResultIsNumber10 = ++A.foo();
var ResultIsNumber11 = ++(NUMBER + NUMBER);

var ResultIsNumber12 = foo()++;
var ResultIsNumber13 = A.foo()++;
var ResultIsNumber14 = (NUMBER + NUMBER)++;

// miss assignment operator
++1;
++NUMBER1;
++foo();

1++;
NUMBER1++;
foo()++;

//// [incrementOperatorWithNumberTypeInvalidOperations.js]
// ++ operator on number type
var NUMBER;
var NUMBER1 = [1, 2];
function foo() { return 1; }
var A = /** @class */ (function () {
    function A() {
    }
    A.foo = function () { return 1; };
    return A;
}());
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
//number type var
var ResultIsNumber1 = ++NUMBER1;
var ResultIsNumber2 = NUMBER1++;
// number type literal
var ResultIsNumber3 = ++1;
var ResultIsNumber4 = ++{ x: 1, y: 2 };
var ResultIsNumber5 = ++{ x: 1, y: function (n) { return n; } };
var ResultIsNumber6 = 1++;
var ResultIsNumber7 = { x: 1, y: 2 }++;
var ResultIsNumber8 = { x: 1, y: function (n) { return n; } }++;
// number type expressions
var ResultIsNumber9 = ++foo();
var ResultIsNumber10 = ++A.foo();
var ResultIsNumber11 = ++(NUMBER + NUMBER);
var ResultIsNumber12 = foo()++;
var ResultIsNumber13 = A.foo()++;
var ResultIsNumber14 = (NUMBER + NUMBER)++;
// miss assignment operator
++1;
++NUMBER1;
++foo();
1++;
NUMBER1++;
foo()++;
