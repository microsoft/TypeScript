//// [classConstructorAccessibility4.ts]
class A {
    private constructor() { }

    method() {
        class B {
            method() {
                new A(); // OK
            }
        }

        class C extends A { // OK
        }
    }
}

class D {
    protected constructor() { }

    method() {
        class E {
            method() {
                new D(); // OK
            }
        }

        class F extends D { // OK
        }
    }
}

//// [classConstructorAccessibility4.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () {
        var B = /** @class */ (function () {
            function B() {
            }
            B.prototype.method = function () {
                new A(); // OK
            };
            return B;
        }());
        var C = /** @class */ (function (_super) {
            __extends(C, _super);
            function C() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return C;
        }(A));
    };
    return A;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.method = function () {
        var E = /** @class */ (function () {
            function E() {
            }
            E.prototype.method = function () {
                new D(); // OK
            };
            return E;
        }());
        var F = /** @class */ (function (_super) {
            __extends(F, _super);
            function F() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return F;
        }(D));
    };
    return D;
}());


//// [classConstructorAccessibility4.d.ts]
declare class A {
    private constructor();
    method(): void;
}
declare class D {
    protected constructor();
    method(): void;
}
