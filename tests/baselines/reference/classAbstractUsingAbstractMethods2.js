//// [classAbstractUsingAbstractMethods2.ts]
class A {
    abstract foo();
}

class B extends A  {}

abstract class C extends A {}

class D extends A {
    foo() {}
}

abstract class E extends A {
    foo() {}
}

abstract class AA {
    abstract foo();
}

class BB extends AA  {}

abstract class CC extends AA {}

class DD extends AA {
    foo() {}
}

//// [classAbstractUsingAbstractMethods2.js]
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
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
}(A));
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.foo = function () { };
    return D;
}(A));
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    E.prototype.foo = function () { };
    return E;
}(A));
var AA = (function () {
    function AA() {
    }
    return AA;
}());
var BB = (function (_super) {
    __extends(BB, _super);
    function BB() {
        _super.apply(this, arguments);
    }
    return BB;
}(AA));
var CC = (function (_super) {
    __extends(CC, _super);
    function CC() {
        _super.apply(this, arguments);
    }
    return CC;
}(AA));
var DD = (function (_super) {
    __extends(DD, _super);
    function DD() {
        _super.apply(this, arguments);
    }
    DD.prototype.foo = function () { };
    return DD;
}(AA));
