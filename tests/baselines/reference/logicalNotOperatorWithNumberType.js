//// [tests/cases/conformance/expressions/unaryOperators/logicalNotOperator/logicalNotOperatorWithNumberType.ts] ////

//// [logicalNotOperatorWithNumberType.ts]
// ! operator on number type
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
var ResultIsBoolean1 = !NUMBER;
var ResultIsBoolean2 = !NUMBER1;

// number type literal
var ResultIsBoolean3 = !1;
var ResultIsBoolean4 = !{ x: 1, y: 2};
var ResultIsBoolean5 = !{ x: 1, y: (n: number) => { return n; } };

// number type expressions
var ResultIsBoolean6 = !objA.a;
var ResultIsBoolean7 = !M.n;
var ResultIsBoolean8 = !NUMBER1[0];
var ResultIsBoolean9 = !foo();
var ResultIsBoolean10 = !A.foo();
var ResultIsBoolean11 = !(NUMBER + NUMBER);

// multiple ! operator
var ResultIsBoolean12 = !!NUMBER;
var ResultIsBoolean13 = !!!(NUMBER + NUMBER);

// miss assignment operators
!1;
!NUMBER;
!NUMBER1;
!foo();
!objA.a;
!M.n;
!objA.a, M.n;

//// [logicalNotOperatorWithNumberType.js]
// ! operator on number type
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
var ResultIsBoolean1 = !NUMBER;
var ResultIsBoolean2 = !NUMBER1;
// number type literal
var ResultIsBoolean3 = !1;
var ResultIsBoolean4 = !{ x: 1, y: 2 };
var ResultIsBoolean5 = !{ x: 1, y: (n) => { return n; } };
// number type expressions
var ResultIsBoolean6 = !objA.a;
var ResultIsBoolean7 = !M.n;
var ResultIsBoolean8 = !NUMBER1[0];
var ResultIsBoolean9 = !foo();
var ResultIsBoolean10 = !A.foo();
var ResultIsBoolean11 = !(NUMBER + NUMBER);
// multiple ! operator
var ResultIsBoolean12 = !!NUMBER;
var ResultIsBoolean13 = !!!(NUMBER + NUMBER);
// miss assignment operators
!1;
!NUMBER;
!NUMBER1;
!foo();
!objA.a;
!M.n;
!objA.a, M.n;
