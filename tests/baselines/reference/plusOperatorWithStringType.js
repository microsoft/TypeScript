//// [plusOperatorWithStringType.ts]
// + operator on string type
var STRING: string;
var STRING1: string[] = ["", "abc"];

function foo(): string { return "abc"; }

class A {
    public a: string;
    static foo() { return ""; }
}
module M {
    export var n: string;
}

var objA = new A();

// string type var
var ResultIsNumber1 = +STRING;
var ResultIsNumber2 = +STRING1;

// string type literal
var ResultIsNumber3 = +"";
var ResultIsNumber4 = +{ x: "", y: "" };
var ResultIsNumber5 = +{ x: "", y: (s: string) => { return s; } };

// string type expressions
var ResultIsNumber6 = +objA.a;
var ResultIsNumber7 = +M.n;
var ResultIsNumber8 = +STRING1[0];
var ResultIsNumber9 = +foo();
var ResultIsNumber10 = +A.foo();
var ResultIsNumber11 = +(STRING + STRING);
var ResultIsNumber12 = +STRING.charAt(0);

// miss assignment operators
+"";
+STRING;
+STRING1;
+foo();
+objA.a,M.n;

//// [plusOperatorWithStringType.js]
// + operator on string type
var STRING;
var STRING1 = ["", "abc"];
function foo() { return "abc"; }
var A = /** @class */ (function () {
    function A() {
    }
    A.foo = function () { return ""; };
    return A;
}());
var M;
(function (M) {
})(M || (M = {}));
var objA = new A();
// string type var
var ResultIsNumber1 = +STRING;
var ResultIsNumber2 = +STRING1;
// string type literal
var ResultIsNumber3 = +"";
var ResultIsNumber4 = +{ x: "", y: "" };
var ResultIsNumber5 = +{ x: "", y: function (s) { return s; } };
// string type expressions
var ResultIsNumber6 = +objA.a;
var ResultIsNumber7 = +M.n;
var ResultIsNumber8 = +STRING1[0];
var ResultIsNumber9 = +foo();
var ResultIsNumber10 = +A.foo();
var ResultIsNumber11 = +(STRING + STRING);
var ResultIsNumber12 = +STRING.charAt(0);
// miss assignment operators
+"";
+STRING;
+STRING1;
+foo();
+objA.a, M.n;
