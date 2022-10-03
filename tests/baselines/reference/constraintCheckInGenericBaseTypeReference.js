//// [constraintCheckInGenericBaseTypeReference.ts]
// No errors
class Constraint {
    public method() { }
}
class GenericBase<T extends Constraint> {
    public items: any;
}
class Derived extends GenericBase<TypeArg> {

}
class TypeArg {
    public method() {
        Container.People.items;
    }
}

class Container {
    public static People: Derived
}

//// [constraintCheckInGenericBaseTypeReference.js]
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
// No errors
var Constraint = /** @class */ (function () {
    function Constraint() {
    }
    Constraint.prototype.method = function () { };
    return Constraint;
}());
var GenericBase = /** @class */ (function () {
    function GenericBase() {
    }
    return GenericBase;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(GenericBase));
var TypeArg = /** @class */ (function () {
    function TypeArg() {
    }
    TypeArg.prototype.method = function () {
        Container.People.items;
    };
    return TypeArg;
}());
var Container = /** @class */ (function () {
    function Container() {
    }
    return Container;
}());
