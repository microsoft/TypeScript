//// [protectedStaticClassPropertyAccessibleWithinSubclass2.ts]
class Base {
    protected static x: string;
    static staticMethod() {
        this.x;         // OK, accessed within their declaring class
    }
}

class Derived1 extends Base {
    static staticMethod1() {
        this.x;         // OK, accessed within a class derived from their declaring class
        super.x;        // Error, x is not public
    }
}

class Derived2 extends Derived1 {
    protected static x: string;
    static staticMethod3() {
        this.x;         // OK, accessed within a class derived from their declaring class
        super.x;        // Error, x is not public
    }
}

//// [protectedStaticClassPropertyAccessibleWithinSubclass2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base() {
    }
    Base.staticMethod = function () {
        this.x; // OK, accessed within their declaring class
    };
    return Base;
}());
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.staticMethod1 = function () {
        this.x; // OK, accessed within a class derived from their declaring class
        _super.x; // Error, x is not public
    };
    return Derived1;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived2.staticMethod3 = function () {
        this.x; // OK, accessed within a class derived from their declaring class
        _super.x; // Error, x is not public
    };
    return Derived2;
}(Derived1));
