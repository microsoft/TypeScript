//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithObjectMembers.ts] ////

//// [subtypingWithObjectMembers.ts]
class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }

// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
class A {
    foo: Base;
    bar: Base;
}

class B extends A {
    foo: Derived; // ok
    bar: string; // error
}

class A2 {
    1: Base; 
    2.0: Base;
}

class B2 extends A2 {
    1: Derived; // ok
    2: string; // error
}

class A3 {
    '1': Base;
    '2.0': Base;
}

class B3 extends A3 {
    '1': Derived; // ok
    '2.0': string; // error
}

module TwoLevels {
    class A {
        foo: Base;
        bar: Base;
    }

    class B extends A {
        foo: Derived2; // ok
        bar: string; // error
    }

    class A2 {
        1: Base;
        2.0: Base;
    }

    class B2 extends A2 {
        1: Derived2; // ok
        2: string; // error
    }

    class A3 {
        '1': Base;
        '2.0': Base;
    }

    class B3 extends A3 {
        '1': Derived2; // ok
        '2.0': string; // error
    }
}

//// [subtypingWithObjectMembers.js]
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Derived));
// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
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
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var B2 = /** @class */ (function (_super) {
    __extends(B2, _super);
    function B2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B2;
}(A2));
var A3 = /** @class */ (function () {
    function A3() {
    }
    return A3;
}());
var B3 = /** @class */ (function (_super) {
    __extends(B3, _super);
    function B3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B3;
}(A3));
var TwoLevels;
(function (TwoLevels) {
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
    var A2 = /** @class */ (function () {
        function A2() {
        }
        return A2;
    }());
    var B2 = /** @class */ (function (_super) {
        __extends(B2, _super);
        function B2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B2;
    }(A2));
    var A3 = /** @class */ (function () {
        function A3() {
        }
        return A3;
    }());
    var B3 = /** @class */ (function (_super) {
        __extends(B3, _super);
        function B3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B3;
    }(A3));
})(TwoLevels || (TwoLevels = {}));
