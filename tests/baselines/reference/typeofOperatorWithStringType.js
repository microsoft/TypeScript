//// [typeofOperatorWithStringType.ts]
// typeof  operator on string type
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
var ResultIsString1 = typeof STRING;
var ResultIsString2 = typeof STRING1;

// string type literal
var ResultIsString3 = typeof "";
var ResultIsString4 = typeof { x: "", y: "" };
var ResultIsString5 = typeof { x: "", y: (s: string) => { return s; } };

// string type expressions
var ResultIsString6 = typeof objA.a;
var ResultIsString7 = typeof M.n;
var ResultIsString8 = typeof STRING1[0];
var ResultIsString9 = typeof foo();
var ResultIsString10 = typeof A.foo();
var ResultIsString11 = typeof (STRING + STRING);
var ResultIsString12 = typeof STRING.charAt(0);

// multiple typeof  operators
var ResultIsString13 = typeof typeof STRING;
var ResultIsString14 = typeof typeof typeof (STRING + STRING);

// miss assignment operators
typeof "";
typeof STRING;
typeof STRING1;
typeof foo();
typeof objA.a, M.n;

// use typeof in type query
var z: string;
var x: string[];
var r: () => string;
z: typeof STRING;
x: typeof STRING1;
r: typeof foo;
var y = { a: "", b: "" };
z: typeof y.a;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;

//// [typeofOperatorWithStringType.js]
// typeof  operator on string type
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
var ResultIsString1 = typeof STRING;
var ResultIsString2 = typeof STRING1;
// string type literal
var ResultIsString3 = typeof "";
var ResultIsString4 = typeof { x: "", y: "" };
var ResultIsString5 = typeof { x: "", y: function (s) { return s; } };
// string type expressions
var ResultIsString6 = typeof objA.a;
var ResultIsString7 = typeof M.n;
var ResultIsString8 = typeof STRING1[0];
var ResultIsString9 = typeof foo();
var ResultIsString10 = typeof A.foo();
var ResultIsString11 = typeof (STRING + STRING);
var ResultIsString12 = typeof STRING.charAt(0);
// multiple typeof  operators
var ResultIsString13 = typeof typeof STRING;
var ResultIsString14 = typeof typeof typeof (STRING + STRING);
// miss assignment operators
typeof "";
typeof STRING;
typeof STRING1;
typeof foo();
typeof objA.a, M.n;
// use typeof in type query
var z;
var x;
var r;
z: typeof STRING;
x: typeof STRING1;
r: typeof foo;
var y = { a: "", b: "" };
z: typeof y.a;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;
