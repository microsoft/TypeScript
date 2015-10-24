//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.ts]
interface A {
    beep();
}
class B {
    public beep() { }
}
class C {
    public static beep() { }
}

var a: A = new B();
a = new C(); // error beep is missing
a = B; // error beep is missing
a = C;

var b: B = new C(); // error name is missing
b = B; // error beep is missing
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
    B.prototype.beep = function () { };
    return B;
})();
var C = (function () {
    function C() {
    }
    C.beep = function () { };
    return C;
})();
var a = new B();
a = new C(); // error beep is missing
a = B; // error beep is missing
a = C;
var b = new C(); // error name is missing
b = B; // error beep is missing
b = C;
b = a;
var c = new B();
c = B;
c = C;
c = a;
