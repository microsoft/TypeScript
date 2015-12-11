//// [chainedAssignment3.ts]
class A {
    id: number;
}

class B extends A {
    value: string;
}

var a: A;
var b: B;
a = b = null;
a = b = new B();
b = a = new B();

a.id = b.value = null;

// error cases
b = a = new A();
a = b = new A();




//// [chainedAssignment3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
}(A));
var a;
var b;
a = b = null;
a = b = new B();
b = a = new B();
a.id = b.value = null;
// error cases
b = a = new A();
a = b = new A();
