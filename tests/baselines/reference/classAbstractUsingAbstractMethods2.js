//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractUsingAbstractMethods2.ts] ////

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.foo = function () { };
    return D;
}(A));
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.foo = function () { };
    return E;
}(A));
var AA = /** @class */ (function () {
    function AA() {
    }
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(AA));
var CC = /** @class */ (function (_super) {
    __extends(CC, _super);
    function CC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CC;
}(AA));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DD.prototype.foo = function () { };
    return DD;
}(AA));
