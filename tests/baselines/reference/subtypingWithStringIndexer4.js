//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithStringIndexer4.ts] ////

//// [subtypingWithStringIndexer4.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: string]: Derived;
}

class B extends A {
    [x: string]: string; // error
}

module Generics {
    class A<T extends Derived> {
        [x: string]: T;
    }

    class B extends A<Base> {
        [x: string]: string; // error
    }

    class B3<T extends Derived> extends A<T> {
        [x: string]: string; // error
    }
}

//// [subtypingWithStringIndexer4.js]
// Derived type indexer must be subtype of base type indexer
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
    var B3 = /** @class */ (function (_super) {
        __extends(B3, _super);
        function B3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B3;
    }(A));
})(Generics || (Generics = {}));
