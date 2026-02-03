//// [tests/cases/conformance/expressions/unaryOperators/deleteOperator/deleteOperatorWithAnyOtherType.ts] ////

//// [deleteOperatorWithAnyOtherType.ts]
// delete  operator on any type

var ANY: any;
var ANY1;
var ANY2: any[] = ["", ""];
var obj: () => {};
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
var ResultIsBoolean1 = delete ANY1;
var ResultIsBoolean2 = delete ANY2;
var ResultIsBoolean3 = delete A;
var ResultIsBoolean4 = delete M;
var ResultIsBoolean5 = delete obj;
var ResultIsBoolean6 = delete obj1;

// any type literal
var ResultIsBoolean7 = delete undefined;
var ResultIsBoolean8 = delete null;

// any type expressions
var ResultIsBoolean9 = delete ANY2[0];
var ResultIsBoolean10 = delete obj1.x;
var ResultIsBoolean11 = delete obj1.y;
var ResultIsBoolean12 = delete objA.a;
var ResultIsBoolean13 = delete M.n;
var ResultIsBoolean14 = delete foo();
var ResultIsBoolean15 = delete A.foo();
var ResultIsBoolean16 = delete (ANY + ANY1);
var ResultIsBoolean17 = delete (null + undefined);
var ResultIsBoolean18 = delete (null + null);
var ResultIsBoolean19 = delete (undefined + undefined);

// multiple delete  operators
var ResultIsBoolean20 = delete delete ANY;
var ResultIsBoolean21 = delete delete delete (ANY + ANY1);

// miss assignment operators
delete ANY;
delete ANY1;
delete ANY2[0];
delete ANY, ANY1;
delete obj1.x;
delete obj1.y;
delete objA.a;
delete M.n;

//// [deleteOperatorWithAnyOtherType.js]
// delete  operator on any type
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
var ResultIsBoolean1 = delete ANY1;
var ResultIsBoolean2 = delete ANY2;
var ResultIsBoolean3 = delete A;
var ResultIsBoolean4 = delete M;
var ResultIsBoolean5 = delete obj;
var ResultIsBoolean6 = delete obj1;
// any type literal
var ResultIsBoolean7 = delete undefined;
var ResultIsBoolean8 = delete null;
// any type expressions
var ResultIsBoolean9 = delete ANY2[0];
var ResultIsBoolean10 = delete obj1.x;
var ResultIsBoolean11 = delete obj1.y;
var ResultIsBoolean12 = delete objA.a;
var ResultIsBoolean13 = delete M.n;
var ResultIsBoolean14 = delete foo();
var ResultIsBoolean15 = delete A.foo();
var ResultIsBoolean16 = delete (ANY + ANY1);
var ResultIsBoolean17 = delete (null + undefined);
var ResultIsBoolean18 = delete (null + null);
var ResultIsBoolean19 = delete (undefined + undefined);
// multiple delete  operators
var ResultIsBoolean20 = delete delete ANY;
var ResultIsBoolean21 = delete delete delete (ANY + ANY1);
// miss assignment operators
delete ANY;
delete ANY1;
delete ANY2[0];
delete ANY, ANY1;
delete obj1.x;
delete obj1.y;
delete objA.a;
delete M.n;
