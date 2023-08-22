//// [tests/cases/compiler/classOrder1.ts] ////

//// [classOrder1.ts]
class A {
    public foo() {
        /*WScript.Echo("Here!");*/
    }
}

var a = new A();
a.foo();




//// [classOrder1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () {
        /*WScript.Echo("Here!");*/
    };
    return A;
}());
var a = new A();
a.foo();
