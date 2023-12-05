//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesIndexersWithAssignmentCompatibility.ts] ////

//// [derivedClassOverridesIndexersWithAssignmentCompatibility.ts]
class Base {
    [x: string]: Object;
}

// ok, use assignment compatibility
class Derived extends Base {
    [x: string]: any;
}

class Base2 {
    [x: number]: Object;
}

// ok, use assignment compatibility
class Derived2 extends Base2 {
    [x: number]: any;
}

//// [derivedClassOverridesIndexersWithAssignmentCompatibility.js]
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
// ok, use assignment compatibility
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    return Base2;
}());
// ok, use assignment compatibility
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base2));
