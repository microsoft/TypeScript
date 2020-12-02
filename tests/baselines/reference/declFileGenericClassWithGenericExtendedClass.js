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
var Baz = /** @class */ (function () {
    function Baz() {
    }
    return Baz;
}());


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
