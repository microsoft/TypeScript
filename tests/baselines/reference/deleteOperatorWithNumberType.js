//// [tests/cases/conformance/expressions/unaryOperators/deleteOperator/deleteOperatorWithNumberType.ts] ////

//// [deleteOperatorWithNumberType.ts]
// delete  operator on number type
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
var ResultIsBoolean1 = delete NUMBER;
var ResultIsBoolean2 = delete NUMBER1;

// number type literal
var ResultIsBoolean3 = delete 1;
var ResultIsBoolean4 = delete { x: 1, y: 2};
var ResultIsBoolean5 = delete { x: 1, y: (n: number) => { return n; } };

// number type expressions
var ResultIsBoolean6 = delete objA.a;
var ResultIsBoolean7 = delete M.n;
var ResultIsBoolean8 = delete NUMBER1[0];
var ResultIsBoolean9 = delete foo();
var ResultIsBoolean10 = delete A.foo();
var ResultIsBoolean11 = delete (NUMBER + NUMBER);

// multiple delete  operator
var ResultIsBoolean12 = delete delete NUMBER;
var ResultIsBoolean13 = delete delete delete (NUMBER + NUMBER);

// miss assignment operators
delete 1;
delete NUMBER;
delete NUMBER1;
delete foo();
delete objA.a;
delete M.n;
delete objA.a, M.n;

//// [deleteOperatorWithNumberType.js]
// delete  operator on number type
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
// number type var
var ResultIsBoolean1 = delete NUMBER;
var ResultIsBoolean2 = delete NUMBER1;
// number type literal
var ResultIsBoolean3 = delete 1;
var ResultIsBoolean4 = delete { x: 1, y: 2 };
var ResultIsBoolean5 = delete { x: 1, y: function (n) { return n; } };
// number type expressions
var ResultIsBoolean6 = delete objA.a;
var ResultIsBoolean7 = delete M.n;
var ResultIsBoolean8 = delete NUMBER1[0];
var ResultIsBoolean9 = delete foo();
var ResultIsBoolean10 = delete A.foo();
var ResultIsBoolean11 = delete (NUMBER + NUMBER);
// multiple delete  operator
var ResultIsBoolean12 = delete delete NUMBER;
var ResultIsBoolean13 = delete delete delete (NUMBER + NUMBER);
// miss assignment operators
delete 1;
delete NUMBER;
delete NUMBER1;
delete foo();
delete objA.a;
delete M.n;
delete objA.a, M.n;
