//// [tests/cases/compiler/genericTypeAssertions4.ts] ////

//// [genericTypeAssertions4.ts]
class A {
    foo() { return ""; }
}

class B extends A {
    bar() { return 1; }
}

class C extends A {
    baz() { return 1; }
}

var a: A;
var b: B;
var c: C;

function foo2<T extends A>(x: T) {
    var y = x;
    y = a; // error: cannot convert A to T
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
    y = <T>a;
    y = <T>b; // error: cannot convert B to T
    y = <T>c; // error: cannot convert C to T
}

//// [genericTypeAssertions4.js]
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
    A.prototype.foo = function () { return ""; };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () { return 1; };
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.baz = function () { return 1; };
    return C;
}(A));
var a;
var b;
var c;
function foo2(x) {
    var y = x;
    y = a; // error: cannot convert A to T
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
    y = a;
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
}
