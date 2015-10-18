//// [declFileGenericClassWithGenericExtendedClass.ts]
interface IFoo {
    baz: Baz;
}
class Base<T> { }
class Derived<T> extends Base<T> { }
interface IBar<T> {
    derived: Derived<T>;
}
class Baz implements IBar<Baz> {
    derived: Derived<Baz>;
}


//// [declFileGenericClassWithGenericExtendedClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var Baz = (function () {
    function Baz() {
    }
    return Baz;
})();


//// [declFileGenericClassWithGenericExtendedClass.d.ts]
interface IFoo {
    baz: Baz;
}
declare class Base<T> {
}
declare class Derived<T> extends Base<T> {
}
interface IBar<T> {
    derived: Derived<T>;
}
declare class Baz implements IBar<Baz> {
    derived: Derived<Baz>;
}
