//// [classAbstractExtends.ts]

class A {
    foo() {}
}

abstract class B extends A {
    abstract bar();
}

class C extends B { }

abstract class D extends B {}

class E extends B {
    bar() {}
}

//// [classAbstractExtends.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return C;
}(B));
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return D;
}(B));
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    E.prototype.bar = function () { };
    return E;
}(B));
