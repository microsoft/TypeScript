//// [protectedClassPropertyAccessibleWithinNestedSubclass1.ts]
class Base {
    protected x: string;
    method() {
        class A {
            methoda() {
                var b: Base;
                var d1: Derived1;
                var d2: Derived2;
                var d3: Derived3;
                var d4: Derived4;

                b.x;            // OK, accessed within their declaring class
                d1.x;           // OK, accessed within their declaring class
                d2.x;           // OK, accessed within their declaring class
                d3.x;           // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x;           // OK, accessed within their declaring class
            }
        }
    }
}

class Derived1 extends Base {
    method1() {
        class B {
            method1b() {
                var b: Base;
                var d1: Derived1;
                var d2: Derived2;
                var d3: Derived3;
                var d4: Derived4;

                b.x;            // Error, isn't accessed through an instance of the enclosing class
                d1.x;           // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d2.x;           // Error, isn't accessed through an instance of the enclosing class
                d3.x;           // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x;           // Error, isn't accessed through an instance of the enclosing class
            }
        }
    }
}

class Derived2 extends Base {
    method2() {
        class C {
            method2c() {
                var b: Base;
                var d1: Derived1;
                var d2: Derived2;
                var d3: Derived3;
                var d4: Derived4;

                b.x;            // Error, isn't accessed through an instance of the enclosing class
                d1.x;           // Error, isn't accessed through an instance of the enclosing class
                d2.x;           // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d3.x;           // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x;           // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class or one of its subclasses
            }
        }
    }
}

class Derived3 extends Derived1 {
    protected x: string;
    method3() {
        class D {
            method3d() {
                var b: Base;
                var d1: Derived1;
                var d2: Derived2;
                var d3: Derived3;
                var d4: Derived4;

                b.x;            // Error, isn't accessed through an instance of the enclosing class
                d1.x;           // Error, isn't accessed through an instance of the enclosing class
                d2.x;           // Error, isn't accessed through an instance of the enclosing class
                d3.x;           // OK, accessed within their declaring class
                d4.x;           // Error, isn't accessed through an instance of the enclosing class
            }
        }
    }
}

class Derived4 extends Derived2 {
    method4() {
        class E {
            method4e() {
                var b: Base;
                var d1: Derived1;
                var d2: Derived2;
                var d3: Derived3;
                var d4: Derived4;

                b.x;            // Error, isn't accessed through an instance of the enclosing class
                d1.x;           // Error, isn't accessed through an instance of the enclosing class
                d2.x;           // Error, isn't accessed through an instance of the enclosing class
                d3.x;           // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x;           // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
            }
        }
    }
}


var b: Base;
var d1: Derived1;
var d2: Derived2;
var d3: Derived3;
var d4: Derived4;

b.x;                    // Error, neither within their declaring class nor classes derived from their declaring class
d1.x;                   // Error, neither within their declaring class nor classes derived from their declaring class
d2.x;                   // Error, neither within their declaring class nor classes derived from their declaring class
d3.x;                   // Error, neither within their declaring class nor classes derived from their declaring class
d4.x;                   // Error, neither within their declaring class nor classes derived from their declaring class

//// [protectedClassPropertyAccessibleWithinNestedSubclass1.js]
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
    Base.prototype.method = function () {
        var A = /** @class */ (function () {
            function A() {
            }
            A.prototype.methoda = function () {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // OK, accessed within their declaring class
                d1.x; // OK, accessed within their declaring class
                d2.x; // OK, accessed within their declaring class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within their declaring class
            };
            return A;
        }());
    };
    return Base;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.prototype.method1 = function () {
        var B = /** @class */ (function () {
            function B() {
            }
            B.prototype.method1b = function () {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // Error, isn't accessed through an instance of the enclosing class
            };
            return B;
        }());
    };
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived2.prototype.method2 = function () {
        var C = /** @class */ (function () {
            function C() {
            }
            C.prototype.method2c = function () {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class or one of its subclasses
            };
            return C;
        }());
    };
    return Derived2;
}(Base));
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived3.prototype.method3 = function () {
        var D = /** @class */ (function () {
            function D() {
            }
            D.prototype.method3d = function () {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // OK, accessed within their declaring class
                d4.x; // Error, isn't accessed through an instance of the enclosing class
            };
            return D;
        }());
    };
    return Derived3;
}(Derived1));
var Derived4 = /** @class */ (function (_super) {
    __extends(Derived4, _super);
    function Derived4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived4.prototype.method4 = function () {
        var E = /** @class */ (function () {
            function E() {
            }
            E.prototype.method4e = function () {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
            };
            return E;
        }());
    };
    return Derived4;
}(Derived2));
var b;
var d1;
var d2;
var d3;
var d4;
b.x; // Error, neither within their declaring class nor classes derived from their declaring class
d1.x; // Error, neither within their declaring class nor classes derived from their declaring class
d2.x; // Error, neither within their declaring class nor classes derived from their declaring class
d3.x; // Error, neither within their declaring class nor classes derived from their declaring class
d4.x; // Error, neither within their declaring class nor classes derived from their declaring class
