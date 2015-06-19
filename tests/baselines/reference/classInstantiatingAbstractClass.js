//// [classInstantiatingAbstractClass.ts]

abstract class A {}

class B extends A {}

abstract class C extends B {}

new A;
new B;
new C;

var a : A;
var b : B;
var c : C;

a = new B;
b = new B;
c = new B;

module M {
    export abstract class A {}
}

import myA = M.A;

var aa = new myA;


//// [classInstantiatingAbstractClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(B);
new A;
new B;
new C;
var a;
var b;
var c;
a = new B;
b = new B;
c = new B;
var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    M.A = A;
})(M || (M = {}));
var myA = M.A;
var aa = new myA;
