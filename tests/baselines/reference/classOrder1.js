//// [classOrder1.ts]
class A {
    public foo() {
        /*WScript.Echo("Here!");*/
    }
}

var a = new A();
a.foo();




//// [classOrder1.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () {
        /*WScript.Echo("Here!");*/
    };
    return A;
}());
var a = new A();
a.foo();
