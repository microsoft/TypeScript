//// [tests/cases/conformance/expressions/unaryOperators/logicalNotOperator/logicalNotOperatorWithBooleanType.ts] ////

//// [logicalNotOperatorWithBooleanType.ts]
// ! operator on boolean type
var BOOLEAN: boolean;

function foo(): boolean { return true; }

class A {
    public a: boolean;
    static foo() { return false; }
}
module M {
    export var n: boolean;
}

var objA = new A();

// boolean type var
var ResultIsBoolean1 = !BOOLEAN;

// boolean type literal
var ResultIsBoolean2 = !true;
var ResultIsBoolean3 = !{ x: true, y: false };

// boolean type expressions
var ResultIsBoolean4 = !objA.a;
var ResultIsBoolean5 = !M.n;
var ResultIsBoolean6 = !foo();
var ResultIsBoolean7 = !A.foo();

// multiple ! operators
var ResultIsBoolean = !!BOOLEAN;

// miss assignment operators
!true;
!BOOLEAN;
!foo();
!true, false;
!objA.a;
!M.n;

//// [logicalNotOperatorWithBooleanType.js]
// ! operator on boolean type
var BOOLEAN;
function foo() { return true; }
var A = /** @class */ (function () {
    function A() {
    }
    A.foo = function () { return false; };
    return A;
}());
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
// boolean type var
var ResultIsBoolean1 = !BOOLEAN;
// boolean type literal
var ResultIsBoolean2 = !true;
var ResultIsBoolean3 = !{ x: true, y: false };
// boolean type expressions
var ResultIsBoolean4 = !objA.a;
var ResultIsBoolean5 = !M.n;
var ResultIsBoolean6 = !foo();
var ResultIsBoolean7 = !A.foo();
// multiple ! operators
var ResultIsBoolean = !!BOOLEAN;
// miss assignment operators
!true;
!BOOLEAN;
!foo();
!true, false;
!objA.a;
!M.n;
