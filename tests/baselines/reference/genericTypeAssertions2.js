//// [tests/cases/compiler/genericTypeAssertions2.ts] ////

//// [genericTypeAssertions2.ts]
class A<T> { foo(x: T) { } }
class B<T> extends A<T> {
    bar(): T {
        return null;
    }
}

var foo = new A<number>();
var r: A<string> = <B<string>>new B();
var r2: A<number> = <B<string>>new B(); // error
var r3: B<number> = <A<number>>new B(); // error
var r4: A<number> = <A<number>>new A();
var r5: A<number> = <A<number>>[]; // error

//// [genericTypeAssertions2.js]
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
    A.prototype.foo = function (x) { };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () {
        return null;
    };
    return B;
}(A));
var foo = new A();
var r = new B();
var r2 = new B(); // error
var r3 = new B(); // error
var r4 = new A();
var r5 = []; // error
