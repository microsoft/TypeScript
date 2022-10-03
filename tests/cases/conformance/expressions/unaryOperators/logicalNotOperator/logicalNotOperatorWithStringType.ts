// ! operator on string type
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
var ResultIsBoolean1 = !STRING;
var ResultIsBoolean2 = !STRING1;

// string type literal
var ResultIsBoolean3 = !"";
var ResultIsBoolean4 = !{ x: "", y: "" };
var ResultIsBoolean5 = !{ x: "", y: (s: string) => { return s; } };

// string type expressions
var ResultIsBoolean6 = !objA.a;
var ResultIsBoolean7 = !M.n;
var ResultIsBoolean8 = !STRING1[0];
var ResultIsBoolean9 = !foo();
var ResultIsBoolean10 = !A.foo();
var ResultIsBoolean11 = !(STRING + STRING);
var ResultIsBoolean12 = !STRING.charAt(0);

// multiple ! operator
var ResultIsBoolean13 = !!STRING;
var ResultIsBoolean14 = !!!(STRING + STRING);

// miss assignment operators
!"";
!STRING;
!STRING1;
!foo();
!objA.a,M.n;