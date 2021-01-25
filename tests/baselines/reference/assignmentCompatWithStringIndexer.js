//// [assignmentCompatWithStringIndexer.ts]
// index signatures must be compatible in assignments

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: string]: Base;
}

var a: A;

var b: { [x: string]: Derived; }
a = b; // ok
b = a; // error

var b2: { [x: string]: Derived2; }
a = b2; // ok
b2 = a; // error

module Generics {
    class A<T extends Base> {
        [x: string]: T;
    }

    class B extends A<Base> {
        [x: string]: Derived; // ok
    }

    var b1: { [x: string]: Derived; };
    var a1: A<Base>;
    a1 = b1; // ok
    b1 = a1; // error

    class B2 extends A<Base> {
        [x: string]: Derived2; // ok
    }

    var b2: { [x: string]: Derived2; };
    a1 = b2; // ok
    b2 = a1; // error

    function foo<T extends Base>() {
        var b3: { [x: string]: Derived; };
        var a3: A<T>;
        a3 = b3; // error
        b3 = a3; // error

        var b4: { [x: string]: Derived2; };
        a3 = b4; // error
        b4 = a3; // error
    }
}

//// [assignmentCompatWithStringIndexer.js]
// index signatures must be compatible in assignments
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
var a;
var b;
a = b; // ok
b = a; // error
var b2;
a = b2; // ok
b2 = a; // error
var Generics;
(function (Generics) {
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
    var b1;
    var a1;
    a1 = b1; // ok
    b1 = a1; // error
    var B2 = /** @class */ (function (_super) {
        __extends(B2, _super);
        function B2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B2;
    }(A));
    var b2;
    a1 = b2; // ok
    b2 = a1; // error
    function foo() {
        var b3;
        var a3;
        a3 = b3; // error
        b3 = a3; // error
        var b4;
        a3 = b4; // error
        b4 = a3; // error
    }
})(Generics || (Generics = {}));
