//// [typeOfThisInStaticMembers9.ts]
class C {
    static f = 1
}

class D extends C {
    static arrowFunctionBoundary = () => super.f + 1;
    static functionExprBoundary = function () { return super.f + 2 };
    static classExprBoundary = class { a = super.f + 3 };
    static functionAndClassDeclBoundary = (() => {
        function foo () {
            return super.f + 4
        }
        class C {
            a = super.f + 5
            method () {
                return super.f +6
            }
        }
    })();
}


//// [typeOfThisInStaticMembers9.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    C.f = 1;
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.arrowFunctionBoundary = function () { return _super.f + 1; };
    D.functionExprBoundary = function () { return _super.f + 2; };
    D.classExprBoundary = /** @class */ (function () {
        function class_1() {
            this.a = _super.prototype.f + 3;
        }
        return class_1;
    }());
    D.functionAndClassDeclBoundary = (function () {
        function foo() {
            return _super.f + 4;
        }
        var C = /** @class */ (function () {
            function C() {
                this.a = _super.prototype.f + 5;
            }
            C.prototype.method = function () {
                return _super.prototype.f + 6;
            };
            return C;
        }());
    })();
    return D;
}(C));
