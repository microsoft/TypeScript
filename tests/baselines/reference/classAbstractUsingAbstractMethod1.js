//// [classAbstractUsingAbstractMethod1.ts]
abstract class A {
    abstract foo() : number;
}

class B extends A {
    foo() { return 1; }
}

abstract class C extends A  {
    abstract foo() : number;
}

var a = new B;
a.foo();

a = new C; // error, cannot instantiate abstract class.
a.foo();

//// [classAbstractUsingAbstractMethod1.js]
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
    B.prototype.foo = function () { return 1; };
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
var a = new B;
a.foo();
a = new C; // error, cannot instantiate abstract class.
a.foo();
