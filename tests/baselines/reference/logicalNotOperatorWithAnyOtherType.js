//// [logicalNotOperatorWithAnyOtherType.ts]
// ! operator on any type

var ANY: any;
var ANY1;
var ANY2: any[] = ["", ""];
var obj: () => {}
var obj1 = { x: "", y: () => { }};
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
var ResultIsBoolean1 = !ANY1;
var ResultIsBoolean2 = !ANY2;
var ResultIsBoolean3 = !A;
var ResultIsBoolean4 = !M;
var ResultIsBoolean5 = !obj;
var ResultIsBoolean6 = !obj1;

// any type literal
var ResultIsBoolean7 = !undefined;
var ResultIsBoolean8 = !null;

// any type expressions
var ResultIsBoolean9 = !ANY2[0];
var ResultIsBoolean10 = !obj1.x;
var ResultIsBoolean11 = !obj1.y;
var ResultIsBoolean12 = !objA.a;
var ResultIsBoolean13 = !M.n;
var ResultIsBoolean14 = !foo();
var ResultIsBoolean15 = !A.foo();
var ResultIsBoolean16 = !(ANY + ANY1);
var ResultIsBoolean17 = !(null + undefined);
var ResultIsBoolean18 = !(null + null);
var ResultIsBoolean19 = !(undefined + undefined);

// multiple ! operators
var ResultIsBoolean20 = !!ANY;
var ResultIsBoolean21 = !!!(ANY + ANY1);

// miss assignment operators
!ANY;
!ANY1;
!ANY2[0];
!ANY, ANY1;
!objA.a;
!M.n;

//// [logicalNotOperatorWithAnyOtherType.js]
// ! operator on any type
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
var ResultIsBoolean1 = !ANY1;
var ResultIsBoolean2 = !ANY2;
var ResultIsBoolean3 = !A;
var ResultIsBoolean4 = !M;
var ResultIsBoolean5 = !obj;
var ResultIsBoolean6 = !obj1;
// any type literal
var ResultIsBoolean7 = !undefined;
var ResultIsBoolean8 = !null;
// any type expressions
var ResultIsBoolean9 = !ANY2[0];
var ResultIsBoolean10 = !obj1.x;
var ResultIsBoolean11 = !obj1.y;
var ResultIsBoolean12 = !objA.a;
var ResultIsBoolean13 = !M.n;
var ResultIsBoolean14 = !foo();
var ResultIsBoolean15 = !A.foo();
var ResultIsBoolean16 = !(ANY + ANY1);
var ResultIsBoolean17 = !(null + undefined);
var ResultIsBoolean18 = !(null + null);
var ResultIsBoolean19 = !(undefined + undefined);
// multiple ! operators
var ResultIsBoolean20 = !!ANY;
var ResultIsBoolean21 = !!!(ANY + ANY1);
// miss assignment operators
!ANY;
!ANY1;
!ANY2[0];
!ANY, ANY1;
!objA.a;
!M.n;
