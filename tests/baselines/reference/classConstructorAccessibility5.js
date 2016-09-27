//// [classConstructorAccessibility5.ts]
class Base {
    protected constructor() { }
}
class Derived extends Base {
    static make() { new Base() } // ok
}

class Unrelated {
    static fake() { new Base() } // error
}


//// [classConstructorAccessibility5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super.apply(this, arguments) || this;
    }
    Derived.make = function () { new Base(); }; // ok
    return Derived;
}(Base));
var Unrelated = (function () {
    function Unrelated() {
    }
    Unrelated.fake = function () { new Base(); }; // error
    return Unrelated;
}());
