//// [negateOperatorWithAnyOtherType.ts]
// - operator on any type

var ANY: any;
var ANY1: any;
var ANY2: any[] = ["", ""];
var obj: () => {}
var obj1 = { x: "", y: () => { }};

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
var ResultIsNumber1 = -ANY1;
var ResultIsNumber2 = -ANY2;
var ResultIsNumber3 = -A;
var ResultIsNumber4 = -M;
var ResultIsNumber5 = -obj;
var ResultIsNumber6 = -obj1;

// any type literal
var ResultIsNumber7 = -undefined;
var ResultIsNumber = -null;

// any type expressions
var ResultIsNumber8 = -ANY2[0];
var ResultIsNumber9 = -obj1.x;
var ResultIsNumber10 = -obj1.y;
var ResultIsNumber11 = -objA.a;
var ResultIsNumber12 = -M.n;
var ResultIsNumber13 = -foo();
var ResultIsNumber14 = -A.foo();
var ResultIsNumber15 = -(ANY - ANY1);

// miss assignment operators
-ANY;
-ANY1;
-ANY2[0];
-ANY, ANY1;
-objA.a;
-M.n;

//// [negateOperatorWithAnyOtherType.js]
// - operator on any type
var ANY;
var ANY1;
var ANY2 = ["", ""];
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
var ResultIsNumber1 = -ANY1;
var ResultIsNumber2 = -ANY2;
var ResultIsNumber3 = -A;
var ResultIsNumber4 = -M;
var ResultIsNumber5 = -obj;
var ResultIsNumber6 = -obj1;
// any type literal
var ResultIsNumber7 = -undefined;
var ResultIsNumber = -null;
// any type expressions
var ResultIsNumber8 = -ANY2[0];
var ResultIsNumber9 = -obj1.x;
var ResultIsNumber10 = -obj1.y;
var ResultIsNumber11 = -objA.a;
var ResultIsNumber12 = -M.n;
var ResultIsNumber13 = -foo();
var ResultIsNumber14 = -A.foo();
var ResultIsNumber15 = -(ANY - ANY1);
// miss assignment operators
-ANY;
-ANY1;
-ANY2[0];
-ANY, ANY1;
-objA.a;
-M.n;
