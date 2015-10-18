//// [classExtendsItselfIndirectly.ts]
class C extends E { foo: string; } // error

class D extends C { bar: string; }

class E extends D { baz: number; }

class C2<T> extends E2<T> { foo: T; } // error

class D2<T> extends C2<T> { bar: T; }

class E2<T> extends D2<T> { baz: T; }

//// [classExtendsItselfIndirectly.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(E); // error
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    return E;
})(D);
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(E2); // error
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(C2);
var E2 = (function (_super) {
    __extends(E2, _super);
    function E2() {
        _super.apply(this, arguments);
    }
    return E2;
})(D2);
