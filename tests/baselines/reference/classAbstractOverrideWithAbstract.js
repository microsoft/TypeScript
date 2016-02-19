//// [classAbstractOverrideWithAbstract.ts]
class A {
    foo() {}
}

abstract class B extends A {
    abstract foo();
}

abstract class AA {
    foo() {}
    abstract bar();
}

abstract class BB extends AA {
    abstract foo();
    bar () {}
}

class CC extends BB {} // error

class DD extends BB {
    foo() {}
}

//// [classAbstractOverrideWithAbstract.js]
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
        _super.apply(this, arguments);
    }
    return B;
}(A));
var AA = (function () {
    function AA() {
    }
    AA.prototype.foo = function () { };
    return AA;
}());
var BB = (function (_super) {
    __extends(BB, _super);
    function BB() {
        _super.apply(this, arguments);
    }
    BB.prototype.bar = function () { };
    return BB;
}(AA));
var CC = (function (_super) {
    __extends(CC, _super);
    function CC() {
        _super.apply(this, arguments);
    }
    return CC;
}(BB)); // error
var DD = (function (_super) {
    __extends(DD, _super);
    function DD() {
        _super.apply(this, arguments);
    }
    DD.prototype.foo = function () { };
    return DD;
}(BB));
