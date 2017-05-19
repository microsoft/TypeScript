//// [fluentClasses.ts]
class A {
    foo() {
        return this;
    }
}
class B extends A {
    bar() {
        return this;
    }
}
class C extends B {
    baz() {
        return this;
    }
}
var c: C;
var z = c.foo().bar().baz();  // Fluent pattern


//// [fluentClasses.js]
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
    A.prototype.foo = function () {
        return this;
    };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () {
        return this;
    };
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.baz = function () {
        return this;
    };
    return C;
}(B));
var c;
var z = c.foo().bar().baz(); // Fluent pattern
