//// [narrowTypeWithAssignment.ts]
class A {
    isA(): this is A { return true; }
    doA() { }
}
  
class B {
    isA(): this is A { return false; }
}

type AorB = A | B;

declare function f(): AorB;

let aorb: AorB

if ((aorb = f()).isA()) {
    aorb.doA();
}

//// [narrowTypeWithAssignment.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.isA = function () { return true; };
    A.prototype.doA = function () { };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.isA = function () { return false; };
    return B;
}());
var aorb;
if ((aorb = f()).isA()) {
    aorb.doA();
}
