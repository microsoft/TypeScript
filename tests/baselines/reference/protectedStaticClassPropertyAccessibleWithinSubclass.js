//// [protectedStaticClassPropertyAccessibleWithinSubclass.ts]
class Base {
    protected static x: string;
    static staticMethod() {
        Base.x;         // OK, accessed within their declaring class
        Derived1.x;     // OK, accessed within their declaring class
        Derived2.x;     // OK, accessed within their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived1 extends Base {
    static staticMethod1() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived2 extends Base {
    static staticMethod2() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived3 extends Derived1 {
    protected static x: string;
    static staticMethod3() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // OK, accessed within their declaring class
    }
}


Base.x;         // Error, neither within their declaring class nor classes derived from their declaring class
Derived1.x;     // Error, neither within their declaring class nor classes derived from their declaring class
Derived2.x;     // Error, neither within their declaring class nor classes derived from their declaring class
Derived3.x;     // Error, neither within their declaring class nor classes derived from their declaring class

//// [protectedStaticClassPropertyAccessibleWithinSubclass.js]
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
    Base.staticMethod = function () {
        Base.x; // OK, accessed within their declaring class
        Derived1.x; // OK, accessed within their declaring class
        Derived2.x; // OK, accessed within their declaring class
        Derived3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    };
    return Base;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.staticMethod1 = function () {
        Base.x; // OK, accessed within a class derived from their declaring class
        Derived1.x; // OK, accessed within a class derived from their declaring class
        Derived2.x; // OK, accessed within a class derived from their declaring class
        Derived3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    };
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived2.staticMethod2 = function () {
        Base.x; // OK, accessed within a class derived from their declaring class
        Derived1.x; // OK, accessed within a class derived from their declaring class
        Derived2.x; // OK, accessed within a class derived from their declaring class
        Derived3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    };
    return Derived2;
}(Base));
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived3.staticMethod3 = function () {
        Base.x; // OK, accessed within a class derived from their declaring class
        Derived1.x; // OK, accessed within a class derived from their declaring class
        Derived2.x; // OK, accessed within a class derived from their declaring class
        Derived3.x; // OK, accessed within their declaring class
    };
    return Derived3;
}(Derived1));
Base.x; // Error, neither within their declaring class nor classes derived from their declaring class
Derived1.x; // Error, neither within their declaring class nor classes derived from their declaring class
Derived2.x; // Error, neither within their declaring class nor classes derived from their declaring class
Derived3.x; // Error, neither within their declaring class nor classes derived from their declaring class
