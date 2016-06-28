//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.ts]
interface A {
    name();
}
class B {
    public name() { }
}
class C {
    public static name() { }
}

var a: A = new B();
a = new C(); // error name is missing
a = B; // error name is missing
a = C;

var b: B = new C(); // error name is missing
b = B; // error name is missing
b = C;
b = a;

var c: C = new B();
c = B;
c = C;
c = a;


//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.js]
var B = (function () {
    function B() {
    }
    B.prototype.name = function () { };
    return B;
}());
var C = (function () {
    function C() {
    }
    C.name = function () { };
    return C;
}());
var a = new B();
a = new C(); // error name is missing
a = B; // error name is missing
a = C;
var b = new C(); // error name is missing
b = B; // error name is missing
b = C;
b = a;
var c = new B();
c = B;
c = C;
c = a;
