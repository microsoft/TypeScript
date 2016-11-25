//// [optionalConstructorArgInSuper.ts]
class Base {
    constructor(opt?) { }
    foo(other?) { }
}
class Derived extends Base {
}
var d = new Derived(); // bug caused an error here, couldn't select overload
var d2: Derived;
d2.foo(); 


//// [optionalConstructorArgInSuper.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(opt) {
    }
    Base.prototype.foo = function (other) { };
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var d = new Derived(); // bug caused an error here, couldn't select overload
var d2;
d2.foo();
