//// [tests/cases/conformance/expressions/unaryOperators/incrementOperator/incrementOperatorWithAnyOtherTypeInvalidOperations.ts] ////

//// [incrementOperatorWithAnyOtherTypeInvalidOperations.ts]
// ++ operator on any type
var ANY1: any;
var ANY2: any[] = [1, 2];

var obj: () => {}
var obj1 = { x: "", y: () => { } };
function foo(): any {
    var a;
    return a;
}
class A {
    public a: any;
    static foo(): any {
        var a;
        return a;
    }
}
module M {
    export var n: any;
}
var objA = new A();

// any type var
var ResultIsNumber1 = ++ANY2;
var ResultIsNumber2 = ++A;
var ResultIsNumber3 = ++M;
var ResultIsNumber4 = ++obj;
var ResultIsNumber5 = ++obj1;

var ResultIsNumber6 = ANY2++;
var ResultIsNumber7 = A++;
var ResultIsNumber8 = M++;
var ResultIsNumber9 = obj++;
var ResultIsNumber10 = obj1++;

// any type literal
var ResultIsNumber11 = ++{};
var ResultIsNumber12 = ++null;
var ResultIsNumber13 = ++undefined;

var ResultIsNumber14 = null++;
var ResultIsNumber15 = {}++;
var ResultIsNumber16 = undefined++;

// any type expressions
var ResultIsNumber17 = ++foo();
var ResultIsNumber18 = ++A.foo();
var ResultIsNumber19 = ++(null + undefined);
var ResultIsNumber20 = ++(null + null);
var ResultIsNumber21 = ++(undefined + undefined);
var ResultIsNumber22 = ++obj1.x;
var ResultIsNumber23 = ++obj1.y;

var ResultIsNumber24 = foo()++;
var ResultIsNumber25 = A.foo()++;
var ResultIsNumber26 = (null + undefined)++;
var ResultIsNumber27 = (null + null)++;
var ResultIsNumber28 = (undefined + undefined)++;
var ResultIsNumber29 = obj1.x++;
var ResultIsNumber30 = obj1.y++;

// miss assignment operators
++ANY2;

ANY2++;

++ANY1++;
++ANY2++;
++ANY2[0]++;

//// [incrementOperatorWithAnyOtherTypeInvalidOperations.js]
// ++ operator on any type
var ANY1;
var ANY2 = [1, 2];
var obj;
var obj1 = { x: "", y: function () { } };
function foo() {
    var a;
    return a;
}
var A = /** @class */ (function () {
    function A() {
    }
    A.foo = function () {
        var a;
        return a;
    };
    return A;
}());
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
// any type var
var ResultIsNumber1 = ++ANY2;
var ResultIsNumber2 = ++A;
var ResultIsNumber3 = ++M;
var ResultIsNumber4 = ++obj;
var ResultIsNumber5 = ++obj1;
var ResultIsNumber6 = ANY2++;
var ResultIsNumber7 = A++;
var ResultIsNumber8 = M++;
var ResultIsNumber9 = obj++;
var ResultIsNumber10 = obj1++;
// any type literal
var ResultIsNumber11 = ++{};
var ResultIsNumber12 = ++null;
var ResultIsNumber13 = ++undefined;
var ResultIsNumber14 = null++;
var ResultIsNumber15 = {}++;
var ResultIsNumber16 = undefined++;
// any type expressions
var ResultIsNumber17 = ++foo();
var ResultIsNumber18 = ++A.foo();
var ResultIsNumber19 = ++(null + undefined);
var ResultIsNumber20 = ++(null + null);
var ResultIsNumber21 = ++(undefined + undefined);
var ResultIsNumber22 = ++obj1.x;
var ResultIsNumber23 = ++obj1.y;
var ResultIsNumber24 = foo()++;
var ResultIsNumber25 = A.foo()++;
var ResultIsNumber26 = (null + undefined)++;
var ResultIsNumber27 = (null + null)++;
var ResultIsNumber28 = (undefined + undefined)++;
var ResultIsNumber29 = obj1.x++;
var ResultIsNumber30 = obj1.y++;
// miss assignment operators
++ANY2;
ANY2++;
++ANY1;
++;
++ANY2;
++;
++ANY2[0];
++;
