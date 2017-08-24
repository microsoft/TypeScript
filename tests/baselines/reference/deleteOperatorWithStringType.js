//// [deleteOperatorWithStringType.ts]
// delete  operator on string type
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
var ResultIsBoolean1 = delete STRING;
var ResultIsBoolean2 = delete STRING1;

// string type literal
var ResultIsBoolean3 = delete "";
var ResultIsBoolean4 = delete { x: "", y: "" };
var ResultIsBoolean5 = delete { x: "", y: (s: string) => { return s; } };

// string type expressions
var ResultIsBoolean6 = delete objA.a;
var ResultIsBoolean7 = delete M.n;
var ResultIsBoolean8 = delete STRING1[0];
var ResultIsBoolean9 = delete foo();
var ResultIsBoolean10 = delete A.foo();
var ResultIsBoolean11 = delete (STRING + STRING);
var ResultIsBoolean12 = delete STRING.charAt(0);

// multiple delete  operator
var ResultIsBoolean13 = delete delete STRING;
var ResultIsBoolean14 = delete delete delete (STRING + STRING);

// miss assignment operators
delete "";
delete STRING;
delete STRING1;
delete foo();
delete objA.a,M.n;

//// [deleteOperatorWithStringType.js]
// delete  operator on string type
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
var ResultIsBoolean1 = delete STRING;
var ResultIsBoolean2 = delete STRING1;
// string type literal
var ResultIsBoolean3 = delete "";
var ResultIsBoolean4 = delete { x: "", y: "" };
var ResultIsBoolean5 = delete { x: "", y: function (s) { return s; } };
// string type expressions
var ResultIsBoolean6 = delete objA.a;
var ResultIsBoolean7 = delete M.n;
var ResultIsBoolean8 = delete STRING1[0];
var ResultIsBoolean9 = delete foo();
var ResultIsBoolean10 = delete A.foo();
var ResultIsBoolean11 = delete (STRING + STRING);
var ResultIsBoolean12 = delete STRING.charAt(0);
// multiple delete  operator
var ResultIsBoolean13 = delete delete STRING;
var ResultIsBoolean14 = delete delete delete (STRING + STRING);
// miss assignment operators
delete "";
delete STRING;
delete STRING1;
delete foo();
delete objA.a, M.n;
