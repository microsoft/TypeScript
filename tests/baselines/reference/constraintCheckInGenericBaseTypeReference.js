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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// No errors
var Constraint = (function () {
    function Constraint() {
    }
    Constraint.prototype.method = function () { };
    return Constraint;
}());
var GenericBase = (function () {
    function GenericBase() {
    }
    return GenericBase;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
}(GenericBase));
var TypeArg = (function () {
    function TypeArg() {
    }
    TypeArg.prototype.method = function () {
        Container.People.items;
    };
    return TypeArg;
}());
var Container = (function () {
    function Container() {
    }
    return Container;
}());
