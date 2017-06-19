//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.ts]
interface A {
    prop();
}
class B {
    public prop() { }
}
class C {
    public static prop() { }
}

var a: A = new B();
a = new C(); // error prop is missing
a = B; // error prop is missing
a = C;

var b: B = new C(); // error prop is missing
b = B; // error prop is missing
b = C;
b = a;

var c: C = new B();
c = B;
c = C;
c = a;


//// [staticMemberOfClassAndPublicMemberOfAnotherClassAssignment.js]
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.prop = function () { };
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prop = function () { };
    return C;
}());
var a = new B();
a = new C(); // error prop is missing
a = B; // error prop is missing
a = C;
var b = new C(); // error prop is missing
b = B; // error prop is missing
b = C;
b = a;
var c = new B();
c = B;
c = C;
c = a;
