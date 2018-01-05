//// [incrementOperatorWithAnyOtherType.ts]
// ++ operator on any type

var ANY: any;
var ANY1: any;
var ANY2: any[] = ["", ""];
var obj = {x:1,y:null};
class A {
    public a: any;
}
module M {
    export var n: any;
}
var objA = new A();

// any type var
var ResultIsNumber1 = ++ANY;
var ResultIsNumber2 = ++ANY1;

var ResultIsNumber3 = ANY1++;
var ResultIsNumber4 = ANY1++;

// expressions
var ResultIsNumber5 = ++ANY2[0];
var ResultIsNumber6 = ++obj.x;
var ResultIsNumber7 = ++obj.y;
var ResultIsNumber8 = ++objA.a;
var ResultIsNumber = ++M.n;

var ResultIsNumber9 = ANY2[0]++;
var ResultIsNumber10 = obj.x++;
var ResultIsNumber11 = obj.y++;
var ResultIsNumber12 = objA.a++;
var ResultIsNumber13 = M.n++;

// miss assignment opertors
++ANY;
++ANY1;
++ANY2[0];
++ANY, ++ANY1;
++objA.a;
++M.n;

ANY++;
ANY1++;
ANY2[0]++;
ANY++, ANY1++;
objA.a++;
M.n++;

//// [incrementOperatorWithAnyOtherType.js]
// ++ operator on any type
var ANY;
var ANY1;
var ANY2 = ["", ""];
var obj = { x: 1, y: null };
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
// any type var
var ResultIsNumber1 = ++ANY;
var ResultIsNumber2 = ++ANY1;
var ResultIsNumber3 = ANY1++;
var ResultIsNumber4 = ANY1++;
// expressions
var ResultIsNumber5 = ++ANY2[0];
var ResultIsNumber6 = ++obj.x;
var ResultIsNumber7 = ++obj.y;
var ResultIsNumber8 = ++objA.a;
var ResultIsNumber = ++M.n;
var ResultIsNumber9 = ANY2[0]++;
var ResultIsNumber10 = obj.x++;
var ResultIsNumber11 = obj.y++;
var ResultIsNumber12 = objA.a++;
var ResultIsNumber13 = M.n++;
// miss assignment opertors
++ANY;
++ANY1;
++ANY2[0];
++ANY, ++ANY1;
++objA.a;
++M.n;
ANY++;
ANY1++;
ANY2[0]++;
ANY++, ANY1++;
objA.a++;
M.n++;
