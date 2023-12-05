//// [tests/cases/conformance/expressions/unaryOperators/voidOperator/voidOperatorWithNumberType.ts] ////

//// [voidOperatorWithNumberType.ts]
// void  operator on number type
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
var ResultIsAny1 = void NUMBER;
var ResultIsAny2 = void NUMBER1;

// number type literal
var ResultIsAny3 = void 1;
var ResultIsAny4 = void { x: 1, y: 2};
var ResultIsAny5 = void { x: 1, y: (n: number) => { return n; } };

// number type expressions
var ResultIsAny6 = void objA.a;
var ResultIsAny7 = void M.n;
var ResultIsAny8 = void NUMBER1[0];
var ResultIsAny9 = void foo();
var ResultIsAny10 = void A.foo();
var ResultIsAny11 = void (NUMBER + NUMBER);

// multiple void  operators
var ResultIsAny12 = void void NUMBER;
var ResultIsAny13 = void void void (NUMBER + NUMBER);

// miss assignment operators
void 1;
void NUMBER;
void NUMBER1;
void foo();
void objA.a;
void M.n;
void objA.a, M.n;

//// [voidOperatorWithNumberType.js]
// void  operator on number type
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
var ResultIsAny1 = void NUMBER;
var ResultIsAny2 = void NUMBER1;
// number type literal
var ResultIsAny3 = void 1;
var ResultIsAny4 = void { x: 1, y: 2 };
var ResultIsAny5 = void { x: 1, y: function (n) { return n; } };
// number type expressions
var ResultIsAny6 = void objA.a;
var ResultIsAny7 = void M.n;
var ResultIsAny8 = void NUMBER1[0];
var ResultIsAny9 = void foo();
var ResultIsAny10 = void A.foo();
var ResultIsAny11 = void (NUMBER + NUMBER);
// multiple void  operators
var ResultIsAny12 = void void NUMBER;
var ResultIsAny13 = void void void (NUMBER + NUMBER);
// miss assignment operators
void 1;
void NUMBER;
void NUMBER1;
void foo();
void objA.a;
void M.n;
void objA.a, M.n;
