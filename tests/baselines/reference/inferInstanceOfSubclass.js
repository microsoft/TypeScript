//// [inferInstanceOfSubclass.ts]
function create<T>(ctor: { new(): T }) {
    return new ctor();
}
class C<U> { c: U }
class D<V> extends C<V> { d: V }
let d = create(D);

class A { a: number }
class B<T> extends A { b: T }
let b = create(B);



//// [inferInstanceOfSubclass.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function create(ctor) {
    return new ctor();
}
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
}(C));
var d = create(D);
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
var b = create(B);
