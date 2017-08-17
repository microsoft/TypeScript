//// [typeofOperatorWithAnyOtherType.ts]
// typeof  operator on any type

var ANY: any;
var ANY1;
var ANY2: any[] = ["", ""];
var obj: () => {}
var obj1 = { x: "a", y: () => { }};

function foo(): any {
    var a;
    return a;
}
class A {
    public a: any;
    static foo() {
        var a;
        return a;
    }
}
module M {
    export var n: any;
}
var objA = new A();

// any type var
var ResultIsString1 = typeof ANY1;
var ResultIsString2 = typeof ANY2;
var ResultIsString3 = typeof A;
var ResultIsString4 = typeof M;
var ResultIsString5 = typeof obj;
var ResultIsString6 = typeof obj1;

// any type literal
var ResultIsString7 = typeof undefined;
var ResultIsString8 = typeof null;
var ResultIsString9 = typeof {};

// any type expressions
var ResultIsString10 = typeof ANY2[0];
var ResultIsString11 = typeof objA.a;
var ResultIsString12 = typeof obj1.x;
var ResultIsString13 = typeof M.n;
var ResultIsString14 = typeof foo();
var ResultIsString15 = typeof A.foo();
var ResultIsString16 = typeof (ANY + ANY1);
var ResultIsString17 = typeof (null + undefined);
var ResultIsString18 = typeof (null + null);
var ResultIsString19 = typeof (undefined + undefined);

// multiple typeof  operators
var ResultIsString20 = typeof typeof ANY;
var ResultIsString21 = typeof typeof typeof (ANY + ANY1);

// miss assignment operators
typeof ANY;
typeof ANY1;
typeof ANY2[0];
typeof ANY, ANY1;
typeof obj1;
typeof obj1.x;
typeof objA.a;
typeof M.n;

// use typeof in type query
var z: any;
var x: any[];
var r: () => any;
z: typeof ANY;
x: typeof ANY2;
r: typeof foo;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;
z: typeof obj1.x;

//// [typeofOperatorWithAnyOtherType.js]
// typeof  operator on any type
var ANY;
var ANY1;
var ANY2 = ["", ""];
var obj;
var obj1 = { x: "a", y: function () { } };
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
var ResultIsString1 = typeof ANY1;
var ResultIsString2 = typeof ANY2;
var ResultIsString3 = typeof A;
var ResultIsString4 = typeof M;
var ResultIsString5 = typeof obj;
var ResultIsString6 = typeof obj1;
// any type literal
var ResultIsString7 = typeof undefined;
var ResultIsString8 = typeof null;
var ResultIsString9 = typeof {};
// any type expressions
var ResultIsString10 = typeof ANY2[0];
var ResultIsString11 = typeof objA.a;
var ResultIsString12 = typeof obj1.x;
var ResultIsString13 = typeof M.n;
var ResultIsString14 = typeof foo();
var ResultIsString15 = typeof A.foo();
var ResultIsString16 = typeof (ANY + ANY1);
var ResultIsString17 = typeof (null + undefined);
var ResultIsString18 = typeof (null + null);
var ResultIsString19 = typeof (undefined + undefined);
// multiple typeof  operators
var ResultIsString20 = typeof typeof ANY;
var ResultIsString21 = typeof typeof typeof (ANY + ANY1);
// miss assignment operators
typeof ANY;
typeof ANY1;
typeof ANY2[0];
typeof ANY, ANY1;
typeof obj1;
typeof obj1.x;
typeof objA.a;
typeof M.n;
// use typeof in type query
var z;
var x;
var r;
z: typeof ANY;
x: typeof ANY2;
r: typeof foo;
z: typeof objA.a;
z: typeof A.foo;
z: typeof M.n;
z: typeof obj1.x;
