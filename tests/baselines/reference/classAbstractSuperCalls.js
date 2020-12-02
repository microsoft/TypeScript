//// [classAbstractSuperCalls.ts]
class A {
    foo() { return 1; }
}

abstract class B extends A {
    abstract foo();
    bar() { super.foo(); }
    baz() { return this.foo; }
}

class C extends B {
    foo() { return 2; }
    qux() { return super.foo() || super.foo; } // 2 errors, foo is abstract
    norf() { return super.bar(); }
}

class AA {
    foo() { return 1; }
    bar() { return this.foo(); }
}

abstract class BB extends AA {
    abstract foo();
    // inherits bar. But BB is abstract, so this is OK.
}


//// [classAbstractSuperCalls.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { return 1; };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_1 = B.prototype;
    proto_1.bar = function () { _super.prototype.foo.call(this); };
    proto_1.baz = function () { return this.foo; };
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_2 = C.prototype;
    proto_2.foo = function () { return 2; };
    proto_2.qux = function () { return _super.prototype.foo.call(this) || _super.prototype.foo; }; // 2 errors, foo is abstract
    proto_2.norf = function () { return _super.prototype.bar.call(this); };
    return C;
}(B));
var AA = /** @class */ (function () {
    function AA() {
    }
    var proto_3 = AA.prototype;
    proto_3.foo = function () { return 1; };
    proto_3.bar = function () { return this.foo(); };
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(AA));
