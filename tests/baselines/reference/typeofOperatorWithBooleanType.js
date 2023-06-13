//// [tests/cases/conformance/expressions/unaryOperators/typeofOperator/typeofOperatorWithBooleanType.ts] ////

//// [typeofOperatorWithBooleanType.ts]
// typeof  operator on boolean type
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
var ResultIsString1 = typeof BOOLEAN;

// boolean type literal
var ResultIsString2 = typeof true;
var ResultIsString3 = typeof { x: true, y: false };

// boolean type expressions
var ResultIsString4 = typeof objA.a;
var ResultIsString5 = typeof M.n;
var ResultIsString6 = typeof foo();
var ResultIsString7 = typeof A.foo();

// multiple typeof  operator
var ResultIsString8 = typeof typeof BOOLEAN;

// miss assignment operators
typeof true;
typeof BOOLEAN;
typeof foo();
typeof true, false;
typeof objA.a;
typeof M.n;

// use typeof in type query
var z: boolean;
var x: boolean[];
var r: () => boolean;
z: typeof BOOLEAN;
r: typeof foo;
var y = { a: true, b: false};
z: typeof y.a;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;

//// [typeofOperatorWithBooleanType.js]
// typeof  operator on boolean type
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
var ResultIsString1 = typeof BOOLEAN;
// boolean type literal
var ResultIsString2 = typeof true;
var ResultIsString3 = typeof { x: true, y: false };
// boolean type expressions
var ResultIsString4 = typeof objA.a;
var ResultIsString5 = typeof M.n;
var ResultIsString6 = typeof foo();
var ResultIsString7 = typeof A.foo();
// multiple typeof  operator
var ResultIsString8 = typeof typeof BOOLEAN;
// miss assignment operators
typeof true;
typeof BOOLEAN;
typeof foo();
typeof true, false;
typeof objA.a;
typeof M.n;
// use typeof in type query
var z;
var x;
var r;
z: typeof BOOLEAN;
r: typeof foo;
var y = { a: true, b: false };
z: typeof y.a;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;
