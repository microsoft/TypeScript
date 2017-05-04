//// [classAbstractInstantiations1.ts]
//
// Calling new with (non)abstract classes.
//

abstract class A {}

class B extends A {}

abstract class C extends B {}

new A;
new A(1); // should report 1 error
new B;
new C;

var a : A;
var b : B;
var c : C;

a = new B;
b = new B;
c = new B;


//// [classAbstractInstantiations1.js]
//
// Calling new with (non)abstract classes.
//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
new A;
new A(1); // should report 1 error
new B;
new C;
var a;
var b;
var c;
a = new B;
b = new B;
c = new B;
